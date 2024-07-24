import { getFile, IFileData } from '@/scripts/get-file';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import Link from 'next/link';
import { formatSize } from '@/scripts/format-size';

interface IDownloadFileProps {
  params: { folder: string };
}

const DownloadFile: FC<IDownloadFileProps> = ({ params }) => {
  const file: IFileData | null = getFile(params.folder);

  if (!file) {
    notFound();
  }
  const size: string = formatSize(file.size);

  return (
    <main className='flex flex-col items-center gap-4'>
      <Typography variant='h4' component='h1' fontWeight={700} color='primary' textAlign='center'>
        Download Files
      </Typography>

      <Box>
        <Typography variant='h5' component='h2' color='primary' textAlign='center'>
          File info
        </Typography>
        <List className='flex flex-col gap-1'>
          <ListItem disablePadding>
            <Typography color='secondary'>
              <span className='font-bold'>File name:</span> {file.name}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color='secondary'>
              <span className='font-bold'>File size:</span> {size}
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Button component={Link} href={`/api/file-bucket/${params.folder}`} download variant='contained' size='large'>
        Click to download files
      </Button>
    </main>
  );
};

export default DownloadFile;
