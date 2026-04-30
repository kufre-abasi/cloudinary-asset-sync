import * as vscode from 'vscode';
import { startWatcher } from '../core/watcher';
import { upload } from '../core/uploader';

export function registerWatch(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand('cloudinary.watch', async () => {
    const config = vscode.workspace.getConfiguration('cloudinarySync');

    const assetPath = config.get('assetPath') as string;

    startWatcher(assetPath, async (file: string, url: string) => {
      vscode.window.showInformationMessage(`Uploaded: ${file}`);
    });

    vscode.window.showInformationMessage('Watch mode enabled 👀');
  });
}
