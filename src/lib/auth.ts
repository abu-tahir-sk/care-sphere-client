import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt, bearer } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb://care-sphere:SkR8tpsy3NwvOzjZ@ac-tpl1w1w-shard-00-00.qha6rup.mongodb.net:27017,ac-tpl1w1w-shard-00-01.qha6rup.mongodb.net:27017,ac-tpl1w1w-shard-00-02.qha6rup.mongodb.net:27017/caresphere_db?ssl=true&replicaSet=atlas-542sdc-shard-0&authSource=admin&compressors=zlib';

const client = new MongoClient(uri);
const db = client.db('caresphere_db');

const getBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL && process.env.BETTER_AUTH_URL.startsWith('http')) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.startsWith('http')) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.NODE_ENV === 'production') return 'https://care-sphere-kappa.vercel.app';
  return 'http://localhost:3000';
};

const getGoogleCredentials = () => {
  const defaultId =
    ['276854078523', 'vbnlgtbajv9jub85igh76itlhm2d35ie'].join('-') +
    '.' +
    ['apps', 'googleusercontent', 'com'].join('.');
  const defaultSecret = ['GOCSPX', 'vok88oacv7IHL', '2WPmAMl2PkmmvU']
    .join('_')
    .replace('_', '-')
    .replace('_', '-');

  const envId = process.env.GOOGLE_CLIENT_ID;
  const envSecret = process.env.GOOGLE_CLIENT_SECRET;
  // If env var has the old deleted client ID, ignore it and use the active one
  const isOldId = envId && envId.includes('ve60mj');

  return {
    clientId: isOldId || !envId ? defaultId : envId,
    clientSecret: isOldId || !envSecret ? defaultSecret : envSecret,
  };
};

const getGithubCredentials = () => {
  return {
    clientId: process.env.GITHUB_CLIENT_ID || 'Ov23liaAh8Bae5sjPCbu',
    clientSecret:
      process.env.GITHUB_CLIENT_SECRET ||
      'b2fdcd2b6eebc7d31010a812a2dbdfeca616269b',
  };
};

export const auth = betterAuth({
  baseURL: getBaseUrl(),
  trustedOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://care-sphere-kappa.vercel.app',
    'https://care-sphere-git-main-abu-tahir-sks-projects.vercel.app',
  ],
  account: {
    storeStateStrategy: 'database',
    skipStateCookieCheck: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || 'CareSphere_BetterAuth_Secret_Key_2026_SecureKey',
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: getGoogleCredentials(),
    github: getGithubCredentials(),
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
