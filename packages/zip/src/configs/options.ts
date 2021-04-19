import commander from 'commander';
import { ZipOptions } from '..';
import { ENCRYPTIONMETHOD, COMPRESS_LEVEL } from './index';

const Options: {
  [key in keyof ZipOptions]: commander.Option;
} = {
  path: new commander.Option('-p, --path [path]', '压缩目标相对路径'),
  encrypt: new commander.Option('-e, --encrypt', '是否加密'),
  encryptionMethod: new commander.Option(
    '-m, --encryption-method',
    '加密格式'
  ).choices(ENCRYPTIONMETHOD),
  compressLevel: new commander.Option(
    '-l, --compress-level [level]',
    '压缩的等级'
  ).choices(COMPRESS_LEVEL),
  name: new commander.Option('-n, --name [name]', '压缩文件名字'),
  firstDirName: new commander.Option(
    '-f, --first-dir-name [dir]',
    '压缩文件首层文件夹名字'
  ),
  password: new commander.Option('-p, --password [password]', '压缩密码')
};

export default Options;
