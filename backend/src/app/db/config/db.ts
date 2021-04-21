import mongoose from 'mongoose';  
mongoose.connect('mongodb+srv://israelmarmar:12345@cluster0.yoncw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{autoReconnect: true}, (err) => {
    if (!err) console.log('MongoDB has connected successfully.');
    else console.log(err);
}); 

export default mongoose;