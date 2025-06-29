// require ("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors=require("cors");
// const PORT=process.env.PORT||5000;
// const router=require('./routes')
// const app=express();
// // const paymentRoutes=require('./routes/paymentRoutes');
// // const requestRoutes=require('./routes/requestRoutes');
// // const collectionCenterRoutes=require('./routes/collectionCenterRoutes');



// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use('/api/v1',router);
// // app.use('/api/v1/payments', paymentRoutes);
// // app.use('/api/v1/requests', requestRoutes);
// // app.use('/api/v1/collection-centers', collectionCenterRoutes);




// //connect to db
// const connectDB=async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log("Error connecting to MongoDB", error);
//     }
// }

// connectDB();

// //connection status
// mongoose.connection.on("connected",()=>{
//     console.log("Mongoose connected successfully");
// });

// mongoose.connection.on("error",(error)=>{
//     console.log("Mongoose connection error",error.message);
// });

// mongoose.connection.on("disconnected",()=>{
//     console.log("Mongoose disconnected from db");
// });

// //run server
// const server=app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// });

// server.on("error",(err)=>{
//     console.log("Server error",err.message)
// })

require ("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const PORT=process.env.PORT||5000;
const router=require('./routes')
const app=express();
// const paymentRoutes=require('./routes/paymentRoutes');
// const requestRoutes=require('./routes/requestRoutes');
// const collectionCenterRoutes=require('./routes/collectionCenterRoutes');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:8081", "http://192.168.0.114:8081"],
    credentials: true,
  })
);
app.use('/api/v1',router);
// app.use('/api/v1/payments', paymentRoutes);
// app.use('/api/v1/requests', requestRoutes);
// app.use('/api/v1/collection-centers', collectionCenterRoutes);




//connect to db
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

connectDB();

//connection status
mongoose.connection.on("connected",()=>{
    console.log("Mongoose connected successfully");
});

mongoose.connection.on("error",(error)=>{
    console.log("Mongoose connection error",error.message);
});

mongoose.connection.on("disconnected",()=>{
    console.log("Mongoose disconnected from db");
});

//run server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


server.on("error",(err)=>{
    console.log("Server error",err.message)
})