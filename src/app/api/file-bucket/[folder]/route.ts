import { getFile, IFileData } from '@/scripts/get-file';
import fs from 'fs';

export async function GET(request: Request, { params }: { params: { folder: string } }) {
  const file: IFileData | null = getFile(params.folder);

  if (!file) {
    return new Response('Folder does not exist', { status: 404 });
  }

  let contentType: string;
  switch (file.extName) {
    case '.zip':
      contentType = 'application/zip';
      break;

    default:
      contentType = 'application/octet-stream';
  }

  // create headers
  const headers: Headers = new Headers({
    'Content-Type': contentType,
    'Content-Disposition': `attachment; filename=${file.name}`,
    'Content-Length': file.size.toString(),
  });

  // create file stream to send it in response
  const fileStream: fs.ReadStream = fs.createReadStream(file.path);
  const stream = new ReadableStream({
    start(controller) {
      fileStream.on('data', (chunk) => controller.enqueue(chunk));
      fileStream.on('end', () => controller.close());
      fileStream.on('error', (err) => controller.error(err));
    },
  });

  return new Response(stream, { status: 200, headers });
}
