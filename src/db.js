import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/daypost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;


// db connect error 
const handleError = (error) => {
    console.log('Database Error : ', error)
}

// db connect sucess
const handleOpen = () => {
    console.log('V Database Connect Sucess')
}

db.on('error', handleError)
db.once('open', handleOpen)