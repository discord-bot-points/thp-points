import React from 'react';

// Fonction asynchrone pour récupérer les données côté serveur
export default async function AveragePoints() {
    
  const res = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  const users = await res.json();

  // Filtrer les utilisateurs avec des points valides et positifs
  const validUsers = users.filter((user: { balance: number }) => typeof user.balance === 'number' && user.balance > 0);

  const totalPoints = validUsers.reduce((acc: number, user: { balance: number }) => acc + user.balance, 0);
  const average = validUsers.length > 0 ? totalPoints / validUsers.length : 0;

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Moyenne utilisateur : {average.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}
