'use client';

import { FC, useMemo, useState } from 'react';
import UploadForm from './upload-form';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { SITE_DOMAIN } from '@/global-variables';
import { Link as MuiLink } from '@mui/material';

interface IUploadFilesProps {}

const UploadFiles: FC<IUploadFilesProps> = () => {
  const [uploadedFolderName, setUploadedFolderName] = useState<string>('');

  const downloadURL: string = useMemo<string>(() => {
    const downloadURL: string = `https://${SITE_DOMAIN}/download/${uploadedFolderName}`;
    return downloadURL;
  }, [uploadedFolderName]);

  if (!uploadedFolderName) {
    return <UploadForm setUploadedFolderName={setUploadedFolderName} />;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadURL);
  };

  const handleReset = () => {
    setUploadedFolderName('');
  };

  return (
    <>
      <Typography variant='h4' component='h1' fontWeight={700} color='primary' textAlign='center'>
        Files uploaded successfully!
      </Typography>
      <Box className='flex flex-col gap-4'>
        <Box>
          <Typography variant='h5' component='p' color='primary' lineHeight={1.25} className='text-center mb-1'>
            Link for downloading:
          </Typography>
          <Box className='flex gap-2 items-center max-md:flex-col'>
            <MuiLink
              component={Link}
              href={`/download/${uploadedFolderName}`}
              className='max-md:text-center'
              color='secondary'
              underline='hover'
            >
              {downloadURL}
            </MuiLink>
            <Button variant='contained' endIcon={<LinkIcon />} onClick={handleCopy}>
              Copy
            </Button>
          </Box>
        </Box>
        <Box className='flex justify-center'>
          <Button variant='outlined' size='large' onClick={handleReset}>
            Upload new files
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UploadFiles;
