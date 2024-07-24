import UploadFiles from '@/components/upload-files';
import { FC } from 'react';

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  return (
    <main className='flex flex-col gap-4 items-center w-full max-w-7xl px-4 mx-auto'>
      <UploadFiles />
    </main>
  );
};

export default Home;
