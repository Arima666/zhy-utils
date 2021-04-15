#!/usr/bin/env node

const path = require('path');
const { promises: fsPromise, writeFileSync, readFileSync } = require('fs');

const prettier = require('./_lib/prettier');

const ignoredFiles = [
  'locale',
  'esm',
  'fp',
  'constants',
  'index.ts',
  'test.js',
  'index.js.flow',
  'package.json',
  'types.ts'
];

const srcPath = path.join(process.cwd(), './src/');

function writeFile(relativePath, content) {
  return writeFileSync(path.resolve(srcPath, relativePath), prettier(content));
}

async function listFns() {
  const dir = await fsPromise.opendir(srcPath);

  const res = [];
  for await (const dirent of dir) {
    if (!/^[^._]/.test(dirent.name) || ignoredFiles.includes(dirent.name))
      continue;
    const direntFullPath = path.join(srcPath, dirent.name);
    if (dirent.isDirectory()) {
      for await (const c_dirent of await fsPromise.opendir(direntFullPath)) {
        if (!c_dirent.name.includes('index.ts')) continue;
        res.push({
          name: dirent.name,
          path: `./${dirent.name}`,
          fullPath: path.join(direntFullPath, c_dirent.name)
        });
        break;
      }
    } else {
      const name = dirent.name.replace(/\.(j|t)sx?/, '');
      res.push({
        name,
        path: `./${name}`,
        fullPath: direntFullPath
      });
    }
  }

  return res;
}

const generatedAutomaticallyMessage =
  "// This file is generated automatically by `scripts/build/indices.js`. Please, don't change it.";

function generateIndex(files) {
  const fileLines = files
    .map(fn => {
      const fileText = readFileSync(fn.fullPath, 'utf-8');
      const importPath = fn.path;
      if (/export default/.test(fileText))
        return `export { default as ${fn.name} } from '${importPath}'`;
      else if (/export/.test(fileText)) return `export * from '${importPath}'`;
    })
    .filter(Boolean);

  return [generatedAutomaticallyMessage, '', ...fileLines, ''].join('\n');
}

const main = async () => {
  const files = await listFns();
  writeFile('index.ts', generateIndex(files));
};

main().then(() => {
  console.log('done');
});
