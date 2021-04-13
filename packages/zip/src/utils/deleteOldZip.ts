import { existsSync, promises as fsSync } from 'fs';

export default async function deleteOldZip(oldZipName, path) {
  const oldZipPath = `${path}/${oldZipName}.zip`;
  try {
    const oldZip = existsSync(oldZipPath);

    if (oldZip) {
      await fsSync.unlink(oldZipPath);
      console.log('删除旧版本压缩包成功！');
    }
  } catch (err) {
    throw err;
  }
}
