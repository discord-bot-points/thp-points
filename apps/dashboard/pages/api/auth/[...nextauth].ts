import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      authorization: {
        params: {
          redirect_uri: "http://localhost:3000/api/auth/callback/discord"
        }
      }
    }),
  ],
  session: {
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
  },
  pages: {
    signIn: '/auth/signin',  // Redirige ici après une connexion
    error: '/auth/error',    // Optionnel, redirection en cas d'erreur
    verifyRequest: '/auth/verify-request',  // Optionnel, redirection après la vérification de l'email
    newAccount: '/auth/new-account',  // Optionnel, redirection après la création d'un nouveau compte
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    }
  }
};

export default NextAuth(authOptions);
