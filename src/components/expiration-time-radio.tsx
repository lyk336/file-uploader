import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { FC } from 'react';
import { FieldError } from 'react-hook-form';

interface IExpirationTimeRadioProps {
  onChange: (...event: any[]) => void;
  value: number;
  error: FieldError | undefined;
}

const ExpirationTimeRadio: FC<IExpirationTimeRadioProps> = ({ onChange, value, error }) => {
  return (
    <>
      <RadioGroup defaultValue={1} onChange={onChange} value={value} row className='mb-4'>
        <FormControlLabel value={1} control={<Radio />} label='1 hour' />
        <FormControlLabel value={4} control={<Radio />} label='4 hours' />
        <FormControlLabel value={12} control={<Radio />} label='12 hours' />
        <FormControlLabel value={24} control={<Radio />} label='1 day' />
        <FormControlLabel value={72} control={<Radio />} label='3 days' />
      </RadioGroup>

      {error && (
        <Typography color='error' className='mb-4'>
          {error.message}
        </Typography>
      )}
    </>
  );
};

export default ExpirationTimeRadio;
