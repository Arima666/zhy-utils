#!/usr/bin/env node

import { getJson, logger } from '@fatyu/utils';
import { program, Option } from 'commander';
import { writeFileSync } from 'fs';
import exec from 'execa';
import getUploadPrompt, { ITYPES, TYPES } from './getUploadPrompt';

const { name, version } = getJson<{ name: string; version: string }>([
  __dirname,
  '../package.json'
]);

export type Options = { fileType: ITYPES; source?: string; target?: string };
program
  .version(version, '-v, --version', `${name} 的版本`)
  .addOption(
    new Option('-f, --file-type [type]', '输出文件类型')
      .choices(TYPES)
      .default('csv')
  )
  .option('-s, --source [source]', '来源分支、tag、commit')
  .option('-t, --target [target]', '目标分支、tag、commit')
  .action(async (options: Options) => {
    const opts = await getUploadPrompt(options);

    try {
      const diff = await (
        await exec('git', [
          'diff',
          opts.source,
          opts.target,
          '--stat-name-width=200',
          '--stat-graph-width=3'
          // '>',
          // 'diff.diff'
        ])
      ).stdout;
      // fs.writeFileSync('./diff.text', diff);
      const diffArr = diff
        .split('\n')
        .filter(item => !/\.(png|html|xlsx|ttf|scss|map)/gi.test(item));

      logger.info(JSON.stringify(diffArr, null, 2));
    } catch (err) {
      logger.error('比较失败', err);
    }
  })
  .parse(process.argv);
