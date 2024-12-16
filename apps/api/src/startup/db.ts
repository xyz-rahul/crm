import mongoose, { } from "mongoose";

const mongoURL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myapp';

mongoose.connect(mongoURL);

export default mongoose.connection;
