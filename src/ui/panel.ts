import * as vscode from 'vscode';

export class AssetPanel {
  public static currentPanel: AssetPanel | undefined;
  private readonly panel: vscode.WebviewPanel;

  static createOrShow(context: vscode.ExtensionContext) {
    if (this.currentPanel) {
      this.currentPanel.panel.reveal();
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'cloudinaryPanel',
      'Cloudinary Asset Sync',
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    this.currentPanel = new AssetPanel(panel, context);
  }

  constructor(panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
    this.panel = panel;
    this.panel.webview.html = this.getHtml();
  }

  getHtml() {
    return `
    <html>
      <body style="font-family: sans-serif;">
        <h2>Cloudinary Asset Sync</h2>

        <button onclick="sync()">Run Sync</button>
        <button onclick="watch()">Enable Watch Mode</button>

        <div id="log"></div>

        <script>
          const vscode = acquireVsCodeApi()

          function sync() {
            vscode.postMessage({ command: "sync" })
          }

          function watch() {
            vscode.postMessage({ command: "watch" })
          }
        </script>
      </body>
    </html>
    `;
  }
}
