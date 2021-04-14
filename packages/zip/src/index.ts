import { existsSync, promises as fsSync } from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { program } from 'commander';
import { name, version } from '../package.json';
import { Configuration } from './configs';
import Options from './configs/options';
import logger from './utils/logger';
import getConfiguration from './utils/getConfiguration';
import checkOptions from './utils/checkOptions';
import deleteOldZip from './utils/deleteOldZip';
import readFile from './utils/readFile';
import getDirNameFromPath from './utils/getDirNameFromPath';

const zip = new JSZip();
// 当前路径
const curPath = process.cwd();

export type ZipOptions = {
  path?: string;
  compression?: 'STORE' | 'DEFLATE';
  compressLevel?: number;
  mimeType?: string;
  platform?: 'DOS' | 'UNIX';
  name?: string;
  firstDirName?: string;
};

async function startZip(options: ZipOptions) {
  logger.info('压缩参数\n', JSON.stringify(options, null, 2));
  const { name, firstDirName, ...rets } = options;

  try {
    const targetPath = path.resolve(process.cwd(), options.path);
    const targetExists = existsSync(targetPath);

    if (targetExists) {
      const targetStatus = await fsSync.stat(targetPath);

      const targetName = getDirNameFromPath(targetPath);

      if (targetStatus.isDirectory()) {
        // 设置压缩包内第一层的文件夹
        const zipFirstDir = zip.folder(firstDirName || targetName);
        // 读取目标文件夹下所有内容
        await readFile(zipFirstDir, targetPath);
      } else if (targetStatus.isFile()) {
        const file = await fsSync.readFile(targetPath);
        if (firstDirName) {
          const zipFirstDir = zip.folder(firstDirName);
          zipFirstDir.file(targetName, file);
        } else {
          zip.file(targetName, file);
        }
      }

      const content = await zip.generateAsync({
        ...rets,
        type: 'uint8array'
      });

      // 生成压缩包文件
      await fsSync.writeFile(`${curPath}/${name}.zip`, content, 'utf-8');
      logger.success('生成压缩包成功');
    } else {
      console.warn('目标文件不存在', targetPath);
    }
  } catch (err) {
    throw err;
  }
}

program.version(version, '-v, --version', `${name} 的版本`);
// 注入命令行参数
Object.values(Options).forEach(item => {
  program.addOption(item);
});
program.parse();

// 合并配置文件和命令行参数
const cfg: ZipOptions = {
  ...getConfiguration(Configuration),
  ...program.opts()
};

checkOptions.path(cfg.path);
// 检查参数合法性
Object.entries(cfg).forEach(([key, val]) => {
  checkOptions[key as keyof ZipOptions]?.(val);
});

startZip(cfg)
  .then(() => {
    logger.success('执行完毕！');
  })
  .catch(err => {
    logger.error('执行失败！', err);
  });
