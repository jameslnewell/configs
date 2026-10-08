export interface SlugifyOptions {
  separator?: string;
}

/**
 * Converts text into a URL friendly slug.
 *
 * @example
 * slugify('Hello, World!'); // 'hello-world'
 */
export function slugify(
  text: string,
  {separator = '-'}: SlugifyOptions = {},
): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 0)
    .join(separator);
}
