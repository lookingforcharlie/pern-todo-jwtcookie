import { FC } from 'react';

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <div className='text-center text-4xl mt-24 h-screen'>
      I am a PERN stack Todo Application
    </div>
  );
};

export default Home;
