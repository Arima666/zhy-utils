import { DistinctQuestion, prompt, QuestionCollection } from 'inquirer';
import { Options } from '.';

export type ITYPES = 'csv' | 'diff' | 'patch';
export const TYPES: ITYPES[] = ['csv', 'diff', 'patch'];

const PromptMap: { [key in keyof Options]: DistinctQuestion } = {
  fileType: {
    type: 'list',
    name: 'fileType',
    choices: TYPES,
    default: TYPES[0]
  },
  source: {
    type: 'input',
    name: 'source',
    validate(input) {
      return input ? true : '请输入来源分支、tag、commit';
    }
  },
  target: {
    type: 'input',
    name: 'target',
    validate(input) {
      return input ? true : '请输入目标分支、tag、commit';
    }
  }
};

function getPromptList(opts: Options): QuestionCollection {
  Object.entries(opts).forEach(([key, value]) => {
    const _key = key as keyof Options;
    if (PromptMap[_key]) PromptMap[_key].default = value;
  });

  return Object.values(PromptMap);
}

export default async function getUploadPrompt(opts: Options) {
  const options = await prompt<Required<Options>>(getPromptList(opts));

  return { ...opts, ...options };
}
