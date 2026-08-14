import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Cached across hot reloads in dev and across serverless invocations,
// so we don't open a new connection on every request.
declare global {
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set — add it to .env");
  }
  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(MONGODB_URI);
  }
  return global._mongooseConn;
}
