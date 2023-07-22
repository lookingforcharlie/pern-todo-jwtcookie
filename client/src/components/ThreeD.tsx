import { FC } from 'react';

interface ThreeDProps {}

const ThreeD: FC<ThreeDProps> = ({}) => {
  return (
    <>
      <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-pulse' />
      <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
    </>
  );
};

export default ThreeD;
