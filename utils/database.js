import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB =() => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{

      isConnected = true;
  
  
      console.log('MongoDB connected')
    })

  
}