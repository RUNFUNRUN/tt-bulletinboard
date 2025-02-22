import { Link } from '@/router';

export const Header = () => {
  return (
    <header className='bg-green-600 w-full py-10'>
      <Link to='/' className='text-white font-bold text-3xl mx-10'>
        掲示板
      </Link>
    </header>
  );
};
