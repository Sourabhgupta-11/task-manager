const express=require('express');
const app=express();
require('./db')
require('dotenv').config();
const cors=require('cors')

app.use(express.json())
const allowedOrigins = [
  'http://localhost:3000',
  'https://taskmanager-three-snowy.vercel.app'                  
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); 
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  }
}));

const authRoutes = require("./routes/auth.js");
const taskRoutes = require("./routes/tasks.js");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
