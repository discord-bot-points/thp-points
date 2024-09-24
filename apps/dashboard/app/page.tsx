// src/app/page.tsx

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import UserTable from './components/UserTable';
import TransactionTable from './components/TransactionTable';
import UserCount from './components/UserCount';
import AveragePoints from './components/AveragePoints';
import { redirect } from 'next/navigation';


export default async function Home() {
  const session = await getServerSession(authOptions);

  // Si pas de session, redirige vers la page de connexion
  if (!session) {
    redirect('/login');
  }

  // Récupérer les utilisateurs et transactions
  const resUsers = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  });
  const users = await resUsers.json();
  const resTransactions = await fetch('http://localhost:3000/api/transactions', { cache: 'no-store' });
  const transactions = await resTransactions.json();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      <main className="flex-grow p-8 sm:p-16">
        <div className="flex justify-around items-center">
          <UserCount />
          <AveragePoints />
        </div>
        <h1 className="text-3xl font-bold my-6 text-center">Liste des Utilisateurs</h1>
        <UserTable users={users} />
        <h1 className="text-3xl font-bold m-6 text-center">Liste des Transactions</h1>
        <TransactionTable transactions={transactions} />
      </main>
    </div>
  );
}
