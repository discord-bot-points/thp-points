import TransactionTable from './components/TransactionTable';
import { User, Transaction } from './api/Type';
import UserTable from './components/UserTable';
import UserCount from './components/UserCount';
import AveragePoints from './components/AveragePoints';



export default async function Home() {


  const resUsers = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });
  const users: User[] = await resUsers.json();

  const resTransactions = await fetch('http://localhost:3000/api/transactions', { cache: 'no-store' });
  const transactions: Transaction[] = await resTransactions.json();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      <main className="flex-grow p-8 sm:p-16">
        <div className='flex justify-around items-center'>
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
