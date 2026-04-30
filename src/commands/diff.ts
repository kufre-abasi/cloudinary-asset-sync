import * as vscode from 'vscode';

export function registerDiff(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand('cloudinary.diff', async () => {
    // Placeholder for diff functionality
    vscode.window.showInformationMessage('Diff command not implemented yet');
  });
}

export function showDiff(before: string, after: string) {
  const left = vscode.Uri.parse('before.js');
  const right = vscode.Uri.parse('after.js');

  vscode.commands.executeCommand(
    'vscode.diff',
    left,
    right,
    'Cloudinary Changes Preview'
  );
}
