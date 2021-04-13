import { promises as fsSync } from 'fs';

export default async function readFile(_zip, _path) {
  const files = await fsSync.readdir(_path);

  for (let i = 0; i < files.length; i++) {
    const filePath = `${_path}/${files[i]}`;
    const fileStatus = await fsSync.stat(filePath);

    if (fileStatus.isDirectory()) {
      const dirList = _zip.folder(files[i]);
      await readFile(dirList, filePath);
    } else {
      const file = await fsSync.readFile(filePath);
      _zip.file(files[i], file);
    }
  }
}
