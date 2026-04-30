import * as diff from 'diff';

export function generateDiff(oldCode: string, newCode: string) {
  return diff.createPatch('file', oldCode, newCode);
}
