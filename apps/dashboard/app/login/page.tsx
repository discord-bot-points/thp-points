// app/login/page.tsx

import DiscordAuthButton from '../components/DiscordAuthButton';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-[80vh] bg-gray-100 font-sans">
    <main className="flex-grow flex flex-col items-center justify-center p-8 sm:p-16 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenue sur le Leaderboard des points THP
      </h1>
      <h4 className="text-xl mb-6">
        Connectez-vous pour voir les statistiques
      </h4>
      <DiscordAuthButton />
    </main>
  </div>
  );
}
