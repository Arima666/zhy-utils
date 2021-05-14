#!/usr/bin/env node
import { ITYPES } from './getUploadPrompt';
export declare type Options = {
    fileType: ITYPES;
    source?: string;
    target?: string;
    exclude?: string;
};
