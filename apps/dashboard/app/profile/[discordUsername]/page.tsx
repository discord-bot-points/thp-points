import prisma from "../../../lib/prismaClient";
import Table from "../../components/Table";
import Image from "next/image";
import Badge from "../../components/Badge"; // Assurez-vous que le chemin est correct
import { FaLink } from 'react-icons/fa'; // Importer l'icône FaLink
import Link from 'next/link';
import { getServerSession } from "next-auth/next"; // Importer getServerSession
import authOptions from '../../../lib/authOptions';
import { redirect } from 'next/navigation';

interface ProfileProps {
  params: {
    discordUsername: string;
  };
}

async function fetchUserProfile(discordUsername: string) {
  try {
    console.log("Fetching user with discordUsername:", discordUsername);
    const user = await prisma.user.findUnique({
      where: { discordUsername },
      include: {
        sent: true,
        received: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export default async function ProfilePage({ params }: ProfileProps) {
  const session = await getServerSession(authOptions);

  // Si la session n'existe pas, rediriger vers la page de login
  if (!session) {
    redirect('/login');
  }

  const user = await fetchUserProfile(params.discordUsername);

  if (!user) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-red-600">Utilisateur non trouvé</p>
      </main>
    );
  }

  const userData = [
    {
      discordUsername: user.discordUsername,
      discordUserAvatar: user.discordUserAvatar,
      pointsSent: user.pointsSent,
      pointsReceived: user.pointsReceived,
      balance: user.balance,
    },
  ];

  const transactionData = [
    {
      transactionsCount: user.sent.length + user.received.length,
      receptionsCount: user.received.length,
      sendsCount: user.sent.length,
    },
  ];

  const transactionHeaders: { key: keyof (typeof transactionData)[0]; label: string }[] = [
    { key: "sendsCount", label: "Nombre d'Envois" },
    { key: "receptionsCount", label: "Nombre de Réceptions" },
    { key: "transactionsCount", label: "Nombre de Transactions" },
  ];

  const headers: { key: keyof (typeof userData)[0]; label: string }[] = [
    { key: "pointsReceived", label: "Points Reçus" },
    { key: "pointsSent", label: "Points Envoyés" },
    { key: "balance", label: "Solde" },
  ];

  const detailedTransactionData = [
    ...user.sent.map((transaction) => ({
      type: "Envoi",
      member: (
        <Link href={`/profile/${encodeURIComponent(transaction.receiverId)}`} passHref>
          <Badge color="bg-blue-500">{transaction.receiverId}</Badge>
        </Link>
      ),
      points: (
        <span className="text-red-600 font-bold">
          -{transaction.points}
        </span>
      ),
      domain: transaction.domainId,
      description: transaction.description,
      link: (
        <a
          href={transaction.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 transform hover:scale-105"
        >
          <FaLink className="mr-1 text-lg" />
        </a>
      ),
      date: transaction.createdAt?.toLocaleDateString() || "Date non disponible",
    })),
    ...user.received.map((transaction) => ({
      type: "Réception",
      member: (
        <Link href={`/profile/${encodeURIComponent(transaction.senderId)}`} passHref>
          <Badge color="bg-blue-500">{transaction.senderId}</Badge>
        </Link>
      ),
      points: (
        <span className="text-green-600 font-bold">
          +{transaction.points}
        </span>
      ),
      domain: transaction.domainId,
      description: transaction.description,
      link: (
        <a
          href={transaction.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 transform hover:scale-105"
        >
          <FaLink className="mr-1 text-lg" />
        </a>
      ),
      date: transaction.createdAt?.toLocaleDateString() || "Date non disponible",
    })),
  ];

  const detailedTransactionHeaders: { key: keyof (typeof detailedTransactionData)[0]; label: string }[] = [
    { key: "type", label: "Type" },
    { key: "member", label: "Membre" },
    { key: "points", label: "Points" },
    { key: "description", label: "Description" },
    { key: "date", label: "Date" }, // Remplacez "createdAt" par "date"
    { key: "domain", label: "Domaine" },
    { key: "link", label: "Lien" },
  ];

  return (
    <>
      <div className="flex justify-center items-center mt-6">
        <div className="flex items-center justify-center w-4/5 bg-white shadow-md rounded-lg p-6 space-x-6">
          <div className="relative w-16 h-16">
            <Image
              src={user.discordUserAvatar}
              alt="Avatar"
              layout="fill"
              className="rounded-full object-cover"
              style={{ transform: "scale(1.4)" }}
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Profil de {user.discordUsername}
          </h1>
        </div>
      </div>

      <section className="flex flex-col p-10">
        <div className="flex flex-col md:flex-row items-center sm:flew-col justify-around space-y-4 mb-8">
          <article className="flex flex-col items-center space-y-4 w-full sm:w-1/3 md:w-1/4 mt-4">
            <div className="bg-white shadow-md w-full rounded-lg">
              <div className="flex flex-col items-center justify-between p-4 h-full w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rang</h2>
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-1xl font-bold text-gray-800 text-center">Points envoyés</p>
                  <p>8</p>
                  <p className="text-1xl font-semibold text-gray-800 mt-2 text-center">Points reçus</p>
                  <p>8</p>
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col items-center space-y-4 w-full sm:w-2/3 md:w-1/2">
            <div className="bg-white shadow-md w-full mb-4">
              <Table data={userData} headers={headers} />
            </div>
            <div className="bg-white shadow-md w-full">
              <Table data={transactionData} headers={transactionHeaders} />
            </div>
          </aside>
        </div>

        <section className="flex justify-center items-center">
          <div className="bg-white shadow-md w-full mb-4">
            <Table
              data={detailedTransactionData}
              headers={detailedTransactionHeaders}
            />
          </div>
        </section>
      </section>
    </>
  );
}
