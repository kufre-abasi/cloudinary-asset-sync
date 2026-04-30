import fg from 'fast-glob';

export function scanAssets(path: string) {
  return fg.sync(`${path}/**/*.{png,jpg,jpeg,svg,webp}`);
}