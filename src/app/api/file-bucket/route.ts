import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import { uploadSchema } from '@/scripts/upload-schema';
import archiver from 'archiver';

const hourInMs: number = 1000 * 60 * 60; // 1 hour

export async function POST(req: Request) {
  const formData: FormData = await req.formData();

  // parse the data
  const parsedData = uploadSchema.safeParse({
    files: formData.getAll('files'),
    folderName: formData.get('folderName'),
    expirationTimeInHours: formData.get('expirationTimeInHours'),
  });

  if (!parsedData.success) {
    return new Response(`Invalid data (${parsedData.error.message})`, { status: 403 });
  }

  const files: Array<File> = parsedData.data.files;

  // create new folder for uploaded files
  const folderName: string = crypto.randomUUID();
  const dir = `./file-bucket/${folderName}`;
  fs.mkdir(dir);

  // upload all files to the folder
  try {
    if (files.length === 1) {
      await fs.writeFile(`${dir}/${files[0].name}`, Buffer.from(await files[0].arrayBuffer()));
    } else {
      // create a zip file
      const zipFileName = parsedData.data.folderName || folderName;
      const zipFilePath = `${dir}/${zipFileName}.zip`;
      const output = createWriteStream(zipFilePath);
      const archive = archiver('zip', {
        zlib: { level: 1 },
      });

      archive.on('error', (err) => {
        throw err;
      });

      archive.pipe(output);

      // add files into the archive
      for (const file of files) {
        archive.append(Buffer.from(await file.arrayBuffer()), { name: file.name });
      }

      // finish compression
      archive.finalize();
    }
  } catch (err) {
    console.error('Error writing files:', err);

    fs.rm(dir, { recursive: true });

    return new Response('Error occurred on server', { status: 500 });
  }

  // delete the folder after a certain period of time
  const expirationTime: number = parsedData.data.expirationTimeInHours * hourInMs;
  setTimeout(() => {
    fs.rm(dir, { recursive: true });
  }, expirationTime);

  return new Response(folderName, { status: 200 });
}
