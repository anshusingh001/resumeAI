const app=require('./src/app');
const dotenv=require('dotenv');
const dbConnection=require('./src/config/database')

dotenv.config();
const PORT=process.env.PORT||5000;

dbConnection();

app.listen(PORT,()=>{
    console.log(`Server is running perfectly on port ${PORT}`);
});