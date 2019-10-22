import path from 'path';

export const getFileName = (str: string) => path.basename(str, path.extname(str));
