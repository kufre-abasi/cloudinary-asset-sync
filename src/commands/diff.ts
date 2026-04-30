import { commands, window, Uri } from 'vscode';

export function registerDiff(context: any) {
  return commands.registerCommand('cloudinary.diff', async () => {
    // Placeholder for diff functionality
    window.showInformationMessage('Diff command not implemented yet');
  });
}

export function showDiff(before: string, after: string) {
  const left = Uri.parse('before.js');
  const right = Uri.parse('after.js');

  commands.executeCommand(
    'vscode.diff',
    left,
    right,
    'Cloudinary Changes Preview'
  );
}
