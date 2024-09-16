import React from 'react';

// Utiliser une fonction asynchrone pour récupérer les données côté serveur
export default async function UserCount() {
  const res = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch user count');
  }

  const users = await res.json();
  const count = users.length;

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Membres : {count}
        </h2>
      </div>
    </div>
  );
}
