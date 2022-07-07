import { fauna } from "../../../services/faunadb";
import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      const {email}= user;

      await fauna.query(
        q.If(
          q.Not(
            q.Exists(q.Match(q.Index("users_by_email"), q.Casefold(email as string)))
          ),
          q.Create(q.Collection("users"), { data: { email } }),
          q.Get(q.Match(q.Index("users_by_email"), q.Casefold(email as string)))
        )
      );
      return true;
    },
  },
});
