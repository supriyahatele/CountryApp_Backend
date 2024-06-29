require('dotenv').config()
const express = require('express');
const cors =require('cors');
const { dbToConnection } = require('./config/dbConnection');
const { userRouter } = require('./routes/userRoutes');
const { countryRouter } = require('./routes/countryRoutes');
const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/users', userRouter);
app.use('/api/countries', countryRouter);
// app.use('/api/flags', flagRouter); 

app.listen(process.env.PORT,()=>{
  dbToConnection()
    console.log('server is running!')
})