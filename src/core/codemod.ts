import fs from 'fs';
import path from 'path';
import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import type { NodePath } from '@babel/traverse';
import type { ImportDeclaration } from '@babel/types';

export function replaceImports(workspace: string, map: Record<string, string>) {
  const files = getFiles(workspace);

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf-8');

    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx']
    });

    traverse(ast, {
      ImportDeclaration(pathNode: NodePath<ImportDeclaration>) {
        const source = pathNode.node.source.value;

        if (map[source]) {
          pathNode.node.source.value = map[source];
        }
      }
    });

    const output = generate(ast, {}).code;
    fs.writeFileSync(file, output);
  }
}

function getFiles(dir: string) {
  const fg = require('fast-glob');
  return fg.sync(`${dir}/**/*.{ts,tsx,js,jsx}`);
}
