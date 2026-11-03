export function first(values: string[] | undefined): string {
  // @ts-ignore
  const value: any = values![0];
  return String(value);
}
