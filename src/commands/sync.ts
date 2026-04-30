import * as vscode from 'vscode';
import { scanAssets } from '../core/scanner';
import { upload } from '../core/uploader';
import { generateRegistry } from '../core/registry';
import { replaceImports } from '../core/codemod';

export function registerSync(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand('cloudinary.sync', async () => {
    const config = vscode.workspace.getConfiguration('cloudinarySync');

    const assetPath = config.get('assetPath') as string;
    const mode = config.get('mode') as string;

    const files = scanAssets(assetPath);

    const map: Record<string, string> = {};

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Uploading assets to Cloudinary...',
        cancellable: false
      },
      async (progress) => {
        let i = 0;

        for (const file of files) {
          const url = await upload(file);
          map[file] = url;

          i++;
          progress.report({
            message: `${i}/${files.length}`
          });
        }
      }
    );

    vscode.workspace.fs.writeFile(
      vscode.Uri.file('asset-map.json'),
      Buffer.from(JSON.stringify(map, null, 2))
    );

    if (mode === 'auto') {
      replaceImports(vscode.workspace.rootPath!, map);
    }

    vscode.window.showInformationMessage('Sync completed 🚀');
  });
}
