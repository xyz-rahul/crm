import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;
if (!mongoURL) throw new Error('MongoURL not provided')

mongoose.connect(mongoURL);

export default mongoose.connection;
