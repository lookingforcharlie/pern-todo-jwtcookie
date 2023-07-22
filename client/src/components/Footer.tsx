import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className='text-center py-6 bg-zinc-700 text-gray-400'>
      I am Footer
    </div>
  );
};

export default Footer;
