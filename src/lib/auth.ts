import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt, bearer } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb://docu-craft:lDnJChGxidvj3kxg@ac-lgfpfea-shard-00-00.2ggt5ir.mongodb.net:27017,ac-lgfpfea-shard-00-01.2ggt5ir.mongodb.net:27017,ac-lgfpfea-shard-00-02.2ggt5ir.mongodb.net:27017/caresphere_db?ssl=true&replicaSet=atlas-13rvzw-shard-0&authSource=admin&appName=Cluster0';

const client = new MongoClient(uri);
const db = client.db('caresphere_db');

const getBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export const auth = betterAuth({
  baseURL: getBaseUrl(),
  secret: process.env.BETTER_AUTH_SECRET || 'CareSphere_BetterAuth_Secret_Key_2026_SecureKey',
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: '7d',
      },
    }),
    bearer(),
  ],
});
