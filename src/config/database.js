import mongoose from "mongoose";

async function connectDatabase() {
    mongoose.connect(process.env.DB_CONNECTION)

    return mongoose.connection;
}

export default connectDatabase;