import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL || "mongodb+srv://xyzrahulkumar2002:Cd9gHUFvaPoHI6fY@crm-cluster.g6lwu.mongodb.net/?retryWrites=true&w=majority&appName=CRM-cluster"

if (!mongoURL) throw new Error('MongoURL not provided')

mongoose.connect(mongoURL)

export default mongoose.connection;
