import {AST_NODE_TYPES, ESLintUtils} from '@typescript-eslint/utils';
import ts from 'typescript';

/**
 * @typedef {import('@typescript-eslint/utils').TSESTree.Node} Node
 * @typedef {import('@typescript-eslint/utils').TSESTree.Parameter} Parameter
 * @typedef {import('@typescript-eslint/utils').TSESTree.FunctionLike
 *   | import('@typescript-eslint/utils').TSESTree.TSMethodSignature
 *   | import('@typescript-eslint/utils').TSESTree.TSFunctionType
 *   | import('@typescript-eslint/utils').TSESTree.TSConstructorType
 *   | import('@typescript-eslint/utils').TSESTree.TSCallSignatureDeclaration
 *   | import('@typescript-eslint/utils').TSESTree.TSConstructSignatureDeclaration} FunctionNode
 */

/**
 * Reports functions, methods and function types declaring more than `max` (default 2) parameters, so callers pass an options object which names each argument.
 *
 * A function whose parameters another API dictates isn't reported e.g. a callback passed to `.reduce()`, a function assigned to a variable typed `ErrorRequestHandler`, or a method overriding a base class's; when that type is yours, it's reported where it's declared instead.
 */
export default ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'suggestion',
    messages: {
      tooManyParams:
        'Take an options object instead of {{count}} parameters, so calls name each argument.',
    },
    schema: [
      {
        type: 'object',
        properties: {max: {type: 'integer', minimum: 0}},
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{max: 2}],
  create(context, [{max}]) {
    // `ESLintUtils.getParserServices()` throws for files the TypeScript parser didn't parse, and JavaScript files
    // usually have no type information, so without it callbacks are recognised by being passed straight to a call
    const services = context.sourceCode.parserServices;
    const checker = services?.program?.getTypeChecker();
    const toTSNode = services?.esTreeNodeToTSNodeMap;

    /** @param {Node} node */
    const isAmbient = (node) => {
      if (/\.d\.[cm]?ts$/.test(context.filename)) return true;
      for (let n = /** @type {Node | undefined} */ (node); n; n = n.parent) {
        if ('declare' in n && n.declare) return true;
      }
      return false;
    };

    /**
     * A type dictates a function's parameters when it has call signatures of its own; `any`, `Function` or a type
     * parameter (like `useCallback()`'s or `debounce()`'s) leave them up to whoever writes the function.
     * @param {ts.Type | undefined} type
     */
    const dictatesParams = (type) => {
      if (!type || !checker) return false;
      const nonNullable = checker.getNonNullableType(type);
      if (
        nonNullable.flags &
        (ts.TypeFlags.Any | ts.TypeFlags.Unknown | ts.TypeFlags.Instantiable)
      ) {
        return false;
      }
      return nonNullable.getCallSignatures().length > 0;
    };

    /**
     * The type a method overrides or implements, from the classes and interfaces its class extends or implements.
     * @param {Node} node
     */
    const inheritedTypeOf = (node) => {
      if (!checker || !toTSNode) return undefined;
      const {parent} = node;
      if (
        parent?.type !== AST_NODE_TYPES.MethodDefinition &&
        parent?.type !== AST_NODE_TYPES.TSAbstractMethodDefinition
      ) {
        return undefined;
      }
      const method = toTSNode.get(parent);
      const name =
        method.name && checker.getSymbolAtLocation(method.name)?.getName();
      if (!name || !ts.isClassLike(method.parent)) return undefined;
      for (const clause of method.parent.heritageClauses ?? []) {
        for (const heritage of clause.types) {
          const property = checker
            .getTypeAtLocation(heritage)
            .getProperty(name);
          if (property)
            return checker.getTypeOfSymbolAtLocation(property, heritage);
        }
      }
      return undefined;
    };

    /**
     * The type that a function expression's context gives it, e.g. from the variable it's assigned to or the parameter it's passed to.
     * @param {Node} node
     */
    const contextualTypeOf = (node) => {
      if (!checker || !toTSNode) return undefined;
      const {parent} = node;
      // object literal methods are declarations, which have no contextual type, so look the method up on the object's
      if (parent?.type === AST_NODE_TYPES.Property && parent.method) {
        const object = toTSNode.get(parent.parent);
        if (!ts.isObjectLiteralExpression(object)) return undefined;
        const objectType = checker.getContextualType(object);
        if (!objectType) return undefined;
        const {key} = parent;
        const name =
          key.type === AST_NODE_TYPES.Identifier
            ? key.name
            : key.type === AST_NODE_TYPES.Literal
              ? String(key.value)
              : undefined;
        const property =
          name === undefined ? undefined : objectType.getProperty(name);
        return property
          ? checker.getTypeOfSymbolAtLocation(property, object)
          : objectType.getStringIndexType();
      }
      const fn = toTSNode.get(node);
      if (!ts.isFunctionExpression(fn) && !ts.isArrowFunction(fn))
        return undefined;
      return checker.getContextualType(fn);
    };

    /** @param {Node} node */
    const isPassedToCall = (node) =>
      (node.parent?.type === AST_NODE_TYPES.CallExpression ||
        node.parent?.type === AST_NODE_TYPES.NewExpression) &&
      node.parent.arguments.some((argument) => argument === node);

    /**
     * Whether a function is passed where the callee declares a type parameter (like `useCallback()`'s), whose
     * contextual type is the constraint, not anything that dictates the parameters.
     * @param {Node} node
     */
    const isPassedAsTypeParameter = (node) => {
      if (!checker || !toTSNode || !node.parent || !isPassedToCall(node)) {
        return false;
      }
      const call = toTSNode.get(node.parent);
      if (!ts.isCallExpression(call) && !ts.isNewExpression(call)) return false;
      const parameters =
        checker.getResolvedSignature(call)?.getDeclaration()?.parameters ?? [];
      const index = (call.arguments ?? []).findIndex(
        (argument) => argument === toTSNode.get(node),
      );
      const parameter = parameters[Math.min(index, parameters.length - 1)];
      return Boolean(
        parameter &&
        checker.getTypeAtLocation(parameter).flags & ts.TypeFlags.TypeParameter,
      );
    };

    /** @param {Node} node */
    const hasDictatedSignature = (node) => {
      if (
        node.type !== AST_NODE_TYPES.FunctionExpression &&
        node.type !== AST_NODE_TYPES.ArrowFunctionExpression &&
        node.type !== AST_NODE_TYPES.TSEmptyBodyFunctionExpression
      ) {
        return false;
      }
      if (!checker) return isPassedToCall(node);
      if (isPassedAsTypeParameter(node)) return false;
      return (
        dictatesParams(inheritedTypeOf(node)) ||
        dictatesParams(contextualTypeOf(node))
      );
    };

    /**
     * An overloaded function's implementation takes whatever its overloads do, and they're reported instead.
     * @param {Node} node
     */
    const isOverloadImplementation = (node) => {
      if (!checker || !toTSNode) return false;
      const declaration =
        node.type === AST_NODE_TYPES.FunctionDeclaration
          ? toTSNode.get(node)
          : node.type === AST_NODE_TYPES.FunctionExpression &&
              node.parent.type === AST_NODE_TYPES.MethodDefinition
            ? toTSNode.get(node.parent)
            : undefined;
      if (!declaration?.name || !declaration.body) return false;
      const symbol = checker.getSymbolAtLocation(declaration.name);
      return (symbol?.declarations ?? []).some(
        (other) =>
          other !== declaration &&
          (ts.isFunctionDeclaration(other) || ts.isMethodDeclaration(other)) &&
          !other.body,
      );
    };

    /** @param {Parameter} param */
    const isThisParam = (param) =>
      param.type === AST_NODE_TYPES.Identifier && param.name === 'this';

    /** @param {FunctionNode} node */
    const check = (node) => {
      const params = node.params.filter((param) => !isThisParam(param));
      const first = params[0];
      const last = params[params.length - 1];
      if (params.length <= max || !first || !last) return;
      // constructor parameter properties (`constructor(private a: A)`) can't come from an options object
      if (
        params.some(
          (param) => param.type === AST_NODE_TYPES.TSParameterProperty,
        )
      ) {
        return;
      }
      if (
        isAmbient(node) ||
        hasDictatedSignature(node) ||
        isOverloadImplementation(node)
      ) {
        return;
      }
      context.report({
        loc: {start: first.loc.start, end: last.loc.end},
        messageId: 'tooManyParams',
        data: {count: params.length},
      });
    };

    return {
      FunctionDeclaration: check,
      FunctionExpression: check,
      ArrowFunctionExpression: check,
      TSDeclareFunction: check,
      TSEmptyBodyFunctionExpression: check,
      TSMethodSignature: check,
      TSFunctionType: check,
      TSConstructorType: check,
      TSCallSignatureDeclaration: check,
      TSConstructSignatureDeclaration: check,
    };
  },
});
