import { Link } from '@/router';

export const Header = () => {
  return (
    <header className='bg-primary w-full p-10 flex justify-between'>
      <Link to='/' className='text-white font-bold text-3xl'>
        掲示板
      </Link>
      <Link
        to='/threads/new'
        className='underline text-white font-bold text-xl'
      >
        スレッドを立てる
      </Link>
    </header>
  );
};
