import commander from 'commander';
import { ZipOptions } from '..';
import { COMPRESSION, COMPRESS_LEVEL, PLATFORM } from './index';

const Options: {
  [key in keyof ZipOptions]: commander.Option;
} = {
  path: new commander.Option('-p, --path [path]', '压缩目标相对路径'),
  compression: new commander.Option(
    '-c, --compression [type]',
    '压缩类型，STORE（不压缩）、DEFLATE（压缩）'
  ).choices(COMPRESSION),
  compressLevel: new commander.Option(
    '-l, --compress-level [level]',
    '压缩的等级'
  ).choices(COMPRESS_LEVEL),
  mimeType: new commander.Option('-m, --mime-type [zip]', '压缩文件后缀名'),
  platform: new commander.Option(
    '-p, --platform [platform]',
    '使用平台'
  ).choices(PLATFORM),
  name: new commander.Option('-n, --name [name]', '压缩文件名字'),
  firstDirName: new commander.Option(
    '-f, --first-dir-name [dir]',
    '压缩文件首层文件夹名字'
  )
};

export default Options;
