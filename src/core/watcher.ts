import chokidar from 'chokidar';
import { upload } from './uploader';
import { scanAssets } from './scanner';

export function startWatcher(path: string, onUpdate: Function) {
  const watcher = chokidar.watch(path, {
    ignoreInitial: true
  });

  watcher.on('add', async (file) => {
    const url = await upload(file);
    onUpdate(file, url);
  });

  return watcher;
}
