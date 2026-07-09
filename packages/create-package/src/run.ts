import {VARIANTS, isVariant} from './variants.js';
import {basename, resolve} from 'node:path';
import {create} from './create.js';
import {parseArgs} from 'node:util';
import {usage} from './usage.js';

/**
 * Parse CLI arguments and scaffold a package. Returns the process exit code.
 *
 * There are no interactive prompts: a missing or invalid required argument
 * prints usage to stderr and returns `1`.
 */
export async function run(argv: string[]): Promise<number> {
  let values: {
    variant?: string;
    name?: string;
    description?: string;
    help?: boolean;
  };
  let positionals: string[];
  try {
    ({values, positionals} = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        variant: {type: 'string'},
        name: {type: 'string'},
        description: {type: 'string'},
        help: {type: 'boolean', short: 'h'},
      },
    }));
  } catch (error) {
    process.stderr.write(`${(error as Error).message}\n\n${usage}`);
    return 1;
  }

  if (values.help === true) {
    process.stdout.write(usage);
    return 0;
  }

  const {variant} = values;
  const directory = positionals[0];
  const errors: string[] = [];

  if (variant === undefined) {
    errors.push('Missing required option: --variant');
  } else if (!isVariant(variant)) {
    errors.push(
      `Invalid --variant "${variant}" (expected one of: ${VARIANTS.join(', ')})`,
    );
  }
  if (directory === undefined) {
    errors.push('Missing required argument: <directory>');
  }

  if (variant === undefined || !isVariant(variant) || directory === undefined) {
    process.stderr.write(`${errors.join('\n')}\n\n${usage}`);
    return 1;
  }

  const name = values.name ?? basename(resolve(directory));

  await create({variant, name, directory, description: values.description});
  process.stdout.write(`\nCreated ${name} (${variant}) in ${directory}\n`);
  return 0;
}
