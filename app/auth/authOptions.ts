import { randomUUID } from "crypto";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    //  adapter: PrismaAdapter(prisma),
  providers : [
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  session : {
    strategy : 'jwt' as const, 
     generateSessionToken: () => {
    return randomUUID()
  }
  }
}

export default authOptions