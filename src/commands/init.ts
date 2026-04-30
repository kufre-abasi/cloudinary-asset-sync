import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

export function registerInit(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand('cloudinary.init', async () => {
    try {
      const workspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

      if (!workspace) {
        vscode.window.showErrorMessage('No workspace found');
        return;
      }

      // 🔹 Ask for asset path
      const assetPath = await vscode.window.showInputBox({
        prompt: 'Enter your asset folder path',
        value: 'src/assets'
      });

      if (!assetPath) return;

      // 🔹 Ask for mode
      const mode = await vscode.window.showQuickPick(['safe', 'auto'], {
        placeHolder: 'Select mode (safe recommended)'
      });

      if (!mode) return;

      // 🔹 Ask Cloudinary credentials
      const cloudName = await vscode.window.showInputBox({
        prompt: 'Cloudinary Cloud Name'
      });

      const apiKey = await vscode.window.showInputBox({
        prompt: 'Cloudinary API Key'
      });

      const apiSecret = await vscode.window.showInputBox({
        prompt: 'Cloudinary API Secret',
        password: true
      });

      if (!cloudName || !apiKey || !apiSecret) {
        vscode.window.showErrorMessage('Cloudinary credentials required');
        return;
      }

      // 📁 Create .env file
      const envPath = path.join(workspace, '.env');

      const envContent = `
CLOUDINARY_CLOUD_NAME=${cloudName}
CLOUDINARY_API_KEY=${apiKey}
CLOUDINARY_API_SECRET=${apiSecret}
`;

      fs.writeFileSync(envPath, envContent.trim());

      // ⚙️ Save VS Code settings
      const config = vscode.workspace.getConfiguration('cloudinarySync');

      await config.update('assetPath', assetPath, true);
      await config.update('mode', mode, true);

      // 📄 Create initial files
      const mapPath = path.join(workspace, 'asset-map.json');
      if (!fs.existsSync(mapPath)) {
        fs.writeFileSync(mapPath, '{}');
      }

      const registryPath = path.join(workspace, 'cloudinary-assets.ts');
      if (!fs.existsSync(registryPath)) {
        fs.writeFileSync(registryPath, `export const assets = {} as const`);
      }

      vscode.window.showInformationMessage(
        'Cloudinary Sync initialized successfully 🚀'
      );
    } catch (err: any) {
      vscode.window.showErrorMessage(err.message);
    }
  });
}
