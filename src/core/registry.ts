export type AssetMap = Record<string, string>;

export function generateRegistry(map: AssetMap) {
  return `
export const assets = ${JSON.stringify(map, null, 2)} as const
`;
}
