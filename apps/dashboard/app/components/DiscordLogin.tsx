// pages/login.tsx
import Link from 'next/link';
import React from 'react';
import { FaDiscord } from 'react-icons/fa';

const DiscordLogin = () => {
  return (
    <div className='flex justify-center items-center'>
      <div>
      <Link href='/' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center">
        <FaDiscord className=" mr-2 h-8 w-8" />Connecte-toi avec Discord
      </Link>
      </div>
    </div>
  );
};

export default DiscordLogin;
