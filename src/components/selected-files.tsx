import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';

interface ISelectedFilesProps {
  selectedFiles: Array<File> | undefined;
}

const SelectedFiles: FC<ISelectedFilesProps> = ({ selectedFiles }) => {
  if (!selectedFiles || selectedFiles.length === 0) {
    return <></>;
  }

  return (
    <Box className='flex flex-col mb-2'>
      <Typography component='h3' className='text-center text-lg font-medium' color='primary'>
        Selected files
      </Typography>
      <List className='flex flex-col gap-1'>
        {selectedFiles.map((file: File) => (
          <ListItem key={Math.random()} disablePadding>
            <Typography variant='subtitle1' color='secondary' lineHeight={1.25}>
              {file.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SelectedFiles;
