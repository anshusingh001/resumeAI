const mongoose=require('mongoose')

async function dbConnection(){

    try{
       await mongoose.connect(process.env.MONGO_URL) 
       console.log("Connected to Database")
    }
    catch(err){
        console.log(err)
    }
}

module.exports=dbConnection;