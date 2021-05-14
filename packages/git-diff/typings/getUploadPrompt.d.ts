import { Options } from '.';
export declare type ITYPES = 'csv' | 'diff' | 'patch';
export declare const TYPES: ITYPES[];
export default function getUploadPrompt(opts: Options): Promise<Required<Options>>;
