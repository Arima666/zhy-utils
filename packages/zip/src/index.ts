// import { promises as fsSync } from 'fs';
// import path from 'path';
// import JSZip from 'jszip';
import { program } from 'commander';
import logger from '../../utils/logger';
// import deleteOldZip from './utils/deleteOldZip';
// import readFile from './utils/readFile';

const { name, version } = require('../package.json');

// const zip = new JSZip();

// const NAME_KEY = '--name';
// const prev_index = process.argv.indexOf(NAME_KEY);
// const name_input =
//   prev_index >= 0 && process.argv[prev_index + 1]
//     ? process.argv[prev_index + 1]
//     : '';

// 当前路径
// const curPath = __dirname;
// 需要压缩的目标文件夹名字
// const targetDirName = 'build';
// 压缩包第一层文件夹名字，设置空值则压缩包内第一层文件夹名字与目标文件夹名字相同
// const firstLevelDirName = 'admin';
// 压缩包名字，设置空值则与第一层文件夹名字相同
// const zipName = name_input ? name_input : '';

// 压缩配置项
// const zipOpt: JSZip.JSZipGeneratorOptions<JSZip.OutputType> = {};

export type ZipOptions = {
  path?: string;
  compression?: 'STORE' | 'DEFLATE';
  compressLevel?: number;
  mimeType?: string;
  platform?: 'DOS' | 'UNIX';
};

async function startZip(options: ZipOptions) {
  logger.info(options);

  /* try {
    const _firstName = firstLevelDirName || targetDirName;
    const _zipName = zipName || _firstName;

    const targetDir = path.join(curPath, targetDirName);
    // 寻找旧的压缩包，存在则删除
    await deleteOldZip(_zipName, curPath);
    // 设置压缩包内第一层的文件夹
    const zipFirstDir = zip.folder(_firstName);
    // 读取目标文件夹下所有内容
    await readFile(zipFirstDir, targetDir);

    const content = await zip.generateAsync({
      ...zipOpt,
      type: 'uint8array'
    });

    // 生成压缩包文件
    await fsSync.writeFile(`${curPath}/${_zipName}.zip`, content, 'utf-8');
  } catch (err) {
    throw err;
  } */
}

program
  .version(version, '-v, --version', `${name} 的版本`)
  .option('-p, --path', '压缩目标相对路径')
  .option(
    '-c, --compression',
    '是否压缩，STORE（不压缩，默认）、DEFLATE（压缩）'
  )
  .option('-l, --compress-level', '压缩的等级：1-9')
  .option('-m, --mime-type', '压缩文件后缀名，zip（默认）')
  .option('-p, --platform', '使用平台，DOS（默认）、UNIX')
  .action(startZip)
  .parseAsync(process.argv);
