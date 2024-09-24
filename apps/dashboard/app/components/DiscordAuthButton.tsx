// app/components/DiscordAuthButton.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from 'react-icons/fa'

const DiscordAuthButton: React.FC = () => {
  const { data: session } = useSession();


  if (session) {
    return (
      <div className="flex flex-row items-center space-x-4">
        <a href="/">
        <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Se déconnecter</button>
        </a>
        <Link href={"/profile/" + session.user?.name}>
        <Image src={session.user?.image} width={64} height={64} className="rounded-full" alt="avatar" />
        </Link>
      </div>
    );
  }

  return <button onClick={() => signIn("discord")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center"><FaDiscord className=" mr-2 h-8 w-8" />Se connecter avec Discord</button>;
};

export default DiscordAuthButton;
