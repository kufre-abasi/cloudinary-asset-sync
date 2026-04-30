import * as vscode from 'vscode';
import { registerSync } from './commands/sync';
import { registerWatch } from './commands/watch';
import { registerDiff } from './commands/diff';
import { AssetPanel } from './ui/panel';
import { registerInit } from './commands/init';

export function activate(context: vscode.ExtensionContext) {
  console.log('Cloudinary Sync Pro Activated 🚀');
  context.subscriptions.push(registerInit(context));
  context.subscriptions.push(registerSync(context));
  context.subscriptions.push(registerWatch(context));
  context.subscriptions.push(registerDiff(context));

  context.subscriptions.push(
    vscode.commands.registerCommand('cloudinary.openPanel', () => {
      AssetPanel.createOrShow(context);
    })
  );
}
