import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("MONGO_URL environment variable is undefined.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnection = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      udeUnifiedTopology: true,
    };
  }

  cached.promise = (await mongoose.connect(MONGO_URL, options)).then(
    (mongoose) => {
      return mongoose;
    }
  );

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnection;
