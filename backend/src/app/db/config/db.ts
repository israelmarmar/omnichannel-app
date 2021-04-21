import mongoose from 'mongoose';  
mongoose.connect(process.env.MONGO, 
{autoReconnect: true}, (err) => {
    if (!err) console.log('MongoDB has connected successfully.');
    else console.log(err);
}); 

export default mongoose;