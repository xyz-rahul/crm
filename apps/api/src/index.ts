import 'express-async-errors'; // should be imported before express is called
import createServer from './startup/server';
import mongoConnection from './startup/db';
import 'dotenv/config'

const PORT = process.env.PORT || 80;
if(!PORT) throw new Error("PORT not provided")
const server = createServer();

mongoConnection.once('open', () => {
    console.log('MongoDB connection established successfully.');

    server.listen(PORT, () => {
        console.log(`API is running on port ${PORT}.`);
    });
});

mongoConnection.on('error', (error) => {
    console.error('Failed to establish MongoDB connection:', error);
});
