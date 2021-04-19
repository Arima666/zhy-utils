import { readFileSync } from 'fs';
import path from 'path';

export default function getPackageJson() {
  const PackageJson = JSON.parse(
    readFileSync(path.resolve(__dirname + '../../../package.json'), 'utf-8')
  );

  return PackageJson;
}
