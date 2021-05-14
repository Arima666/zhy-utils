import { logger } from '@fatyu/utils';
import execa from 'execa';
import { DistinctQuestion, ListQuestion, prompt } from 'inquirer';
import { Options } from '.';

export type ITYPES = 'csv' | 'diff' | 'patch';
export const TYPES: ITYPES[] = ['csv', 'diff', 'patch'];

async function getBranchList(): Promise<{
  BranchList: string[];
  defaultBranch?: string;
}> {
  try {
    let defaultBranch: string;
    const origin = (await execa('git', ['branch', '-r'])).stdout
      .split('\n')
      // 过滤HEAD
      .slice(1)
      .map(item => item.trim());
    const local = (await execa('git', ['branch'])).stdout
      .split('\n')
      .map(item => {
        if (/^\*/.test(item)) {
          const branchName = item.replace(/^\**\s+(\S+)/, '$1');
          defaultBranch = branchName;
          return branchName;
        }

        return item;
      });
    return { BranchList: [...origin, ...local], defaultBranch };
  } catch (err) {
    logger.error('获取git分支失败');
    return { BranchList: [] };
  }
}

async function getTagList(): Promise<string[]> {
  try {
    const tags = (await execa('git', ['tag', '-l'])).stdout.split('\n');
    return tags.reverse();
  } catch (err) {
    logger.error('获取git tag 列表失败');
    return [];
  }
}

const Branch = ['custom'];

const PromptMap: { [key in keyof Options]: DistinctQuestion } = {
  fileType: {
    type: 'list',
    name: 'fileType',
    message: '请选择输出文件类型',
    choices: TYPES,
    default: TYPES[0]
  },
  source: {
    type: 'list',
    name: 'source',
    message: '请输入来源分支、tag、commit',
    choices: Branch,
    default: Branch[0],
    validate(input) {
      return input ? true : '请选择来源分支、tag、commit';
    }
  },
  target: {
    type: 'list',
    name: 'target',
    message: '请输入目标分支、tag、commit',
    choices: Branch,
    default: Branch[0],
    validate(input) {
      return input ? true : '请选择目标分支、tag、commit';
    }
  },
  exclude: {
    type: 'input',
    name: 'exclude',
    message: '请输入需要过滤的文件类型，以 | 分割',
    default: 'png|html|xlsx|ttf|scss|map|md'
  }
};

const OtherPrompts: DistinctQuestion[] = [
  {
    type: 'input',
    name: 'sourceInput',
    when({ source }) {
      return source === Branch[0];
    },
    validate(input) {
      return input ? true : '请输入目标分支、tag、commit';
    }
  },
  {
    type: 'input',
    name: 'targetInput',
    when({ target }) {
      return target === Branch[0];
    },
    validate(input) {
      return input ? true : '请输入目标分支、tag、commit';
    }
  }
];

async function getPromptList(opts: Options): Promise<DistinctQuestion[]> {
  const { BranchList, defaultBranch } = await getBranchList();
  const tags = await getTagList();

  if (defaultBranch) PromptMap.source.default = defaultBranch;
  (PromptMap.source as ListQuestion).choices = [
    ...Branch,
    ...BranchList,
    ...tags
  ];
  (PromptMap.target as ListQuestion).choices = [
    ...Branch,
    ...BranchList,
    ...tags
  ];

  Object.entries(opts).forEach(([key, value]) => {
    const _key = key as keyof Options;
    if (PromptMap[_key]) PromptMap[_key].default = value;
  });

  return [...Object.values(PromptMap), ...OtherPrompts];
}

export default async function getUploadPrompt(
  opts: Options
): Promise<Required<Options>> {
  const PromptList = await getPromptList(opts);
  const options = await prompt<
    Required<Options> & { targetInput?: string; sourceInput?: string }
  >(PromptList);

  if (options.sourceInput) {
    options.source = options.sourceInput;
  }
  if (options.targetInput) {
    options.target = options.targetInput;
  }

  return { ...opts, ...options };
}
