export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | {[key: string]: JsonValue};

export type JsonObject = {[key: string]: JsonValue};

function isJsonObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep-merge a variant `package.json` fragment over a base fragment.
 *
 * - Nested objects (e.g. `scripts`, `devDependencies`) are merged key-by-key
 *   with the variant winning on conflicts.
 * - Arrays (e.g. `files`, `keywords`) are concatenated and de-duplicated.
 * - Everything else is overwritten by the variant.
 */
export function mergePackageJson(
  base: JsonObject,
  overlay: JsonObject,
): JsonObject {
  const result: JsonObject = {...base};

  for (const [key, overlayValue] of Object.entries(overlay)) {
    const baseValue = result[key];

    if (isJsonObject(baseValue) && isJsonObject(overlayValue)) {
      result[key] = mergePackageJson(baseValue, overlayValue);
    } else if (Array.isArray(baseValue) && Array.isArray(overlayValue)) {
      result[key] = [...new Set<JsonValue>([...baseValue, ...overlayValue])];
    } else {
      result[key] = overlayValue;
    }
  }

  return result;
}
