#!/usr/bin/env node

import { getJson, logger } from '@fatyu/utils';
import { program, Option } from 'commander';
import { writeFileSync } from 'fs';
import exec from 'execa';
import shell from 'shelljs';
import getUploadPrompt, { ITYPES, TYPES } from './getUploadPrompt';

const { name, version } = getJson<{ name: string; version: string }>([
  __dirname,
  '../package.json'
]);

export type Options = {
  fileType: ITYPES;
  source?: string;
  target?: string;
  exclude?: string;
};
program
  .version(version, '-v, --version', `${name} 的版本`)
  .addOption(
    new Option('-f, --file-type [type]', '输出文件类型')
      .choices(TYPES)
      .default('csv')
  )
  .option('-s, --source [source]', '来源分支、tag、commit')
  .option('-t, --target [target]', '目标分支、tag、commit')
  .option('-e, --exclude [exclude]', '需要忽略的文件类型，以 | 分割')
  .action(async (options: Options) => {
    const opts = await getUploadPrompt(options);
    const name = Date.now();

    switch (opts.fileType) {
      case 'diff':
      case 'patch':
        shell.exec(
          `git diff ${opts.source} ${opts.target} --stat-name-width=200 --stat-graph-width=3 > ${name}.${opts.fileType}`
        );
        break;
      default:
        try {
          const diff = await (
            await exec('git', [
              'diff',
              opts.source,
              opts.target,
              '--stat-name-width=200',
              '--stat-graph-width=3'
            ])
          ).stdout;
          const patt = new RegExp(`\.${opts.exclude}`, 'gi');
          const diffArr: string[] = diff
            .split('\n')
            .filter(item => {
              if (opts.exclude) {
                return !patt.test(item);
              } else {
                return true;
              }
            })
            .map(item => {
              const arr = item.match(/\s(\S.+\S)\s+\|\s+(\d+).*/);
              if (!arr) return [item];
              return arr.slice(1, 3);
            })
            .map(item => item.join(','));

          const csvArr = [
            `${opts.source},${opts.target},diff`,
            'filePath,editLineNumber',
            ...diffArr
          ];
          writeFileSync(`./${name}.csv`, csvArr.join('\n'), 'utf-8');

          logger.success('git diff 导出 csv 成功');
        } catch (err) {
          logger.error('比较失败', err);
        }
    }
  })
  .parse(process.argv);
