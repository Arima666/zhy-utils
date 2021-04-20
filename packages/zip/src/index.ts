import { createWriteStream, existsSync, statSync } from 'fs';
import path from 'path';
import archiver from 'archiver';
import { program } from 'commander';
import { logger, getConfiguration } from '@zhy/utils';
import { Configuration } from './configs';
import Options from './configs/options';
import DefaultCfg from './configs/index.default.json';
import getDirNameFromPath from './utils/getDirNameFromPath';
import checkCfg from './utils/checkCfg';
import getPackageJson from './utils/getPackageJson';

const { name, version } = getPackageJson();

// 当前路径
const curPath = process.cwd();

export type ZipOptions = {
  path?: string;
  encrypt?: boolean;
  encryptionMethod?: 'aes256' | 'zip20';
  compressLevel?: number;
  name?: string;
  firstDirName?: string;
  password?: string;
  destPath?: boolean;
};

program.version(version, '-v, --version', `${name} 的版本`);
// 注入命令行参数
Object.values(Options).forEach(item => {
  program.addOption(item);
});

program.parse(process.argv);

// 合并配置文件和命令行参数
const cfg: ZipOptions = {
  ...(DefaultCfg as ZipOptions),
  ...getConfiguration(name, Configuration),
  ...program.opts()
};

// 检查参数合法性
checkCfg(cfg);

// 检查目标文件是否存在
const targetPath = path.resolve(process.cwd(), cfg.path);
const targetExists = existsSync(targetPath);
if (!targetExists) {
  logger.warning(
    `Compress target is not exists. Please check targetPath: ${targetPath}`
  );
  process.exit();
}

let zipType: 'zip' | 'zip-encrypted' = 'zip';
type ZipOpt = {
  encryptionMethod?: ZipOptions['encryptionMethod'];
  password?: string;
} & archiver.ArchiverOptions;
let zipOpt: ZipOpt = {
  zlib: {
    level: Number(cfg.compressLevel) //压缩等级
  }
};
if (cfg.encrypt) {
  archiver.registerFormat('zip-encrypted', require('archiver-zip-encrypted'));
  zipType = 'zip-encrypted';
  zipOpt.encryptionMethod = cfg.encryptionMethod;
  zipOpt.password = cfg.password;
}

const targetStatus = statSync(targetPath);
const targetName = getDirNameFromPath(targetPath);
const Output = createWriteStream(`${curPath}/${cfg.name || targetName}.zip`);
const archive = archiver.create(zipType, zipOpt);

if (targetStatus.isDirectory()) {
  archive.directory(
    targetPath,
    cfg.destPath ? cfg.firstDirName || cfg.name || targetName : false
  );
} else if (targetStatus.isFile()) {
  archive.file(targetPath, { name: targetName }); //第一个源文件,第二个生成到压缩包的文件
}

archive.pipe(Output); //将打包对象与输出流关联
//监听所有archive数据都写完
Output.on('close', function () {
  logger.success('压缩完成', archive.pointer() / 1024 / 1024 + 'M');
});
archive.on('error', function (err) {
  logger.error('压缩失败!');
  throw err;
});
//打包
archive.finalize();
