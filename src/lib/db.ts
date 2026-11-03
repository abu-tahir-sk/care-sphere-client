import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://care-sphere:SkR8tpsy3NwvOzjZ@ac-tpl1w1w-shard-00-00.qha6rup.mongodb.net:27017,ac-tpl1w1w-shard-00-01.qha6rup.mongodb.net:27017,ac-tpl1w1w-shard-00-02.qha6rup.mongodb.net:27017/caresphere_db?ssl=true&replicaSet=atlas-542sdc-shard-0&authSource=admin&compressors=zlib';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

