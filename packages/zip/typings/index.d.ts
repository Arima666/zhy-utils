export declare type ZipOptions = {
    path?: string;
    encrypt?: boolean;
    encryptionMethod?: 'aes256' | 'zip20';
    compressLevel?: number;
    name?: string;
    firstDirName?: string;
    password?: string;
    destPath?: boolean;
};
