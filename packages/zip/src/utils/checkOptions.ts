import { InvalidOptionArgumentError } from 'commander';
import { ZipOptions } from '..';
import { ENCRYPTIONMETHOD, COMPRESS_LEVEL } from '../configs';

export function throwErr(tips: string) {
  throw new InvalidOptionArgumentError(tips);
}

function checkLevel(val?: string) {
  if (val) {
    if (!COMPRESS_LEVEL.includes(val))
      throwErr('CompressLevel should between 1 to 9');

    return Number(val);
  }
}

function checkName(val?: string) {
  if (val) {
    if (/[?\\/:*<>|"]/g.test(val))
      throwErr('Name is invalid. Should not have ?\\/:*<>|"');
  }
}

function checkFirstDirName(val?: string) {
  if (val) {
    if (/[?\\/:*<>|"]/g.test(val))
      throwErr('FirstDirName is invalid. Should not have ?\\/:*<>|"');
  }
}

function checkEncryptMethod(val?: string) {
  if (val) {
    if (!ENCRYPTIONMETHOD.includes(val))
      throwErr(
        `Compression is invalid. Allowed choices are ${ENCRYPTIONMETHOD.join(
          ', '
        )}.`
      );
  }
}

const checkOptions: {
  [key in keyof ZipOptions]: (val?: any) => void;
} = {
  encryptionMethod: checkEncryptMethod,
  compressLevel: checkLevel,
  name: checkName,
  firstDirName: checkFirstDirName
};

export default checkOptions;
