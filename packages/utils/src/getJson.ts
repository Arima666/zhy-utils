import { readFileSync } from 'fs';
import { resolve } from 'path';
import log from './logger';

export default function getJson<T>(filePath: string | string[]): T {
  const targetPath =
    typeof filePath === 'string' ? filePath : resolve(...filePath);

  try {
    const JsonObj = JSON.parse(readFileSync(targetPath, 'utf-8'));
    return JsonObj;
  } catch (err) {
    log.error(`读取Json发生错误，目标文件路径：${targetPath}`);
    process.exit();
  }
}
