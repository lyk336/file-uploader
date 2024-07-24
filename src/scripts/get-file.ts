import 'server-only';
import fs from 'fs';
import path from 'path';

export interface IFileData {
  name: string;
  extName: string;
  path: string;
  size: number;
}

export function getFile(folderName: string): IFileData | null {
  const folderPath: string = `./file-bucket/${folderName}`;
  const folderExists: boolean = fs.existsSync(folderPath);

  if (!folderExists) {
    return null;
  }

  // file details
  const name: string = fs.readdirSync(folderPath)[0];
  const extName: string = path.extname(name);
  const filePath: string = `${folderPath}/${name}`;
  const size: number = fs.statSync(filePath).size;

  return {
    name,
    extName,
    path: filePath,
    size,
  };
}
