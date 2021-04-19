import { ZipOptions } from '..';
import checkOptions, { throwErr } from './checkOptions';

export default function checkCfg({ path, ...rest }: ZipOptions) {
  if (!path) throwErr('Path is required');

  Object.entries(rest).forEach(([key, val]) => {
    checkOptions[key as keyof ZipOptions](val);
  });

  if (rest.encrypt) {
    if (!rest.password) throwErr('Password is invalid');
  }
}
