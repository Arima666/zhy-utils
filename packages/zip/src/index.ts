import fs, { promises as fsSync } from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();

const NAME_KEY = '--name';
const prev_index = process.argv.indexOf(NAME_KEY);
const name_input =
  prev_index >= 0 && process.argv[prev_index + 1]
    ? process.argv[prev_index + 1]
    : '';

// 当前路径
const curPath = __dirname;
// 需要压缩的目标文件夹名字
const targetDirName = 'build';
// 压缩包第一层文件夹名字，设置空值则压缩包内第一层文件夹名字与目标文件夹名字相同
const firstLevelDirName = 'admin';
// 压缩包名字，设置空值则与第一层文件夹名字相同
const zipName = name_input ? name_input : '';

// 压缩配置项
const zipOpt: JSZip.JSZipGeneratorOptions<JSZip.OutputType> = {
  type: 'uint8array'
};

async function readFile(_zip, _path) {
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

async function deleteOldZip(oldZipName, path) {
  const oldZipPath = `${path}/${oldZipName}.zip`;
  try {
    const oldZip = fs.existsSync(oldZipPath);

    if (oldZip) {
      const delCallback = await fsSync.unlink(oldZipPath);
      if (delCallback) {
        throw delCallback;
      } else {
        console.log('删除旧版本压缩包成功！');
      }
    }
  } catch (err) {
    throw err;
  }
}

async function startZip() {
  try {
    const _firstName = firstLevelDirName || targetDirName;
    const _zipName = zipName || _firstName;

    const targetDir = path.join(curPath, targetDirName);
    // 寻找旧的压缩包，存在则删除
    await deleteOldZip(_zipName, curPath);
    // 设置压缩包内第一层的文件夹
    const zipFirstDir = zip.folder(_firstName);
    // 读取目标文件夹下所有内容
    await readFile(zipFirstDir, targetDir);

    const content = await zip.generateAsync(zipOpt);

    // 生成压缩包文件
    await fsSync.writeFile(
      `${curPath}/${_zipName}.zip`,
      content as Uint8Array,
      'utf-8'
    );
  } catch (err) {
    throw err;
  }
}

startZip()
  .then(() => {
    console.log('打包压缩包成功！');
  })
  .catch(err => {
    console.warn('打包压缩包失败！\n', err);
  });
