/* This is a database connection function*/
import mongoose, {Mongoose} from 'mongoose'

async function dbConnect(): Promise<Mongoose> {

    if (mongoose.connection.readyState === 1) {
        console.log('Already connected to the database');
        return mongoose;
    }

    return mongoose.connect(process.env.MONGODB_URI || "", {
        maxPoolSize: 1
    })
        .then((connection) => {
            console.log('Connecting to the database...');
            return connection;
        });
}
export default dbConnect