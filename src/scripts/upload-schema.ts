import { z } from 'zod';

const MAX_FILES_SIZE = 1024 * 1024 * 512; // 512 Mb

const folderNamePattern = /^[a-zA-Z0-9\[\](){}`@_\- ]+$/;
const onlySpacesPattern = /\S/;

const file = z.instanceof(File);

export const uploadSchema = z.object({
  files: z
    .array(file, { message: 'Must be selected at least 1 file' })
    .refine((files: Array<File>) => files.length > 0, 'Select at least 1 file')
    .refine((files: Array<File>) => {
      const totalSize: number = files.reduce((acc, file) => acc + file.size, 0);
      return totalSize <= MAX_FILES_SIZE;
    }, 'Max size is 512 Mb'),
  folderName: z
    .string()
    .max(40, 'Maximum 40 characters')
    .transform((val) => val.trim())
    .refine((folderName: string | undefined) => !folderName || folderNamePattern.test(folderName), {
      message: 'Folder name contains invalid characters',
    })
    .refine((folderName: string | undefined) => !folderName || onlySpacesPattern.test(folderName), 'Invalid name'),
  expirationTimeInHours: z.coerce
    .number()
    .refine((hours: number) => hours >= 1 && hours <= 72, 'Invalid expiration time'),
});

export type TUploadForm = z.infer<typeof uploadSchema>;
