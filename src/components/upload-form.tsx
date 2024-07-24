'use client';

import { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { TUploadForm, uploadSchema } from '@/scripts/upload-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SelectedFiles from './selected-files';
import { Box, TextField, Typography, Button } from '@mui/material';
import ExpirationTimeRadio from './expiration-time-radio';

interface IUploadFormProps {
  setUploadedFolderName: (fileName: string) => void;
}

const UploadForm: FC<IUploadFormProps> = ({ setUploadedFolderName }) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    clearErrors,
    control,
  } = useForm<TUploadForm>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      files: [],
      folderName: '',
      expirationTimeInHours: 1,
    },
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      setValue('files', files);
      setFiles(files);

      if (files.length > 0) {
        clearErrors('files');
      }
    },
  });

  const onSubmit = async (data: TUploadForm) => {
    const formData: FormData = new FormData();
    console.log(data.folderName);

    data.files.forEach((file: File) => {
      formData.append('files', file);
    });
    formData.append('folderName', data.folderName);
    formData.append('expirationTimeInHours', data.expirationTimeInHours.toString());

    const response = await fetch('/api/file-bucket', {
      method: 'POST',
      body: formData,
    });

    const respMessage: string = await response.text();

    if (!response.ok) {
      setError('root', {
        type: 'server',
        message: respMessage,
      });

      return;
    }
    setUploadedFolderName(respMessage);
  };

  return (
    <>
      <Typography variant='h4' component='h1' fontWeight={700} color='primary' textAlign='center'>
        Upload your files
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center'>
        <SelectedFiles selectedFiles={files} />
        <Box className='flex flex-col items-center w-full'>
          {/* dropzone */}
          <div
            {...getRootProps()}
            className='dropzone cursor-pointer select-none min-w-64 max-w-xl w-full rounded min-h-64 p-4 flex flex-col justify-center items-center gap-4 text-center font-medium mb-4'
          >
            <input {...getInputProps()} {...register('files')} />
            {isDragActive ? (
              <p>Drop the files here</p>
            ) : (
              <p>
                Drag and drop some files here,
                <br />
                or click to select files
              </p>
            )}
            <DriveFolderUploadIcon fontSize='large' />
          </div>
          {errors.files && (
            <Typography color='error' className='mb-4'>
              {errors.files.message}
            </Typography>
          )}
        </Box>

        {files.length > 1 && (
          <Box className='flex flex-col items-center w-full'>
            <Controller
              name='folderName'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  helperText={error ? error.message : null}
                  error={Boolean(error)}
                  onChange={onChange}
                  value={value}
                  inputProps={{ maxLength: 40 }}
                  label='Name of folder (optional)'
                  variant='outlined'
                  className='w-full max-w-xl mb-4'
                />
              )}
            />
          </Box>
        )}

        <Box className='flex flex-col items-center w-full'>
          <Controller
            name='expirationTimeInHours'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ExpirationTimeRadio onChange={onChange} value={value} error={error} />
            )}
          />
        </Box>

        <Box className='w-40'>
          <Button variant='contained' disabled={isSubmitting} type='submit' size='large' fullWidth>
            Submit
          </Button>
        </Box>
        {errors.root && (
          <Typography color='error' className='mt-2'>
            {errors.root.message}
          </Typography>
        )}
        {/* <ExpirationTimeRadio value='' /> */}
      </form>
    </>
  );
};

export default UploadForm;
