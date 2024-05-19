import mongoose from 'mongoose';

const connectDb = async ( MONGODB_URI, MONGODB_NAME )=>{
    try {
        await mongoose.connect( MONGODB_URI, {
            dbName: MONGODB_NAME
        })
        console.log("Connected to mongoDB...");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;