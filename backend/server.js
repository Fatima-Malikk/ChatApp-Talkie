const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require ("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();

connectDB();

app.use(express.json()); // to accept json data


app.use('/api/user', userRoutes); 
app.use('/api/chat', chatRoutes); 

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(5001, console.log(`Server started on port no : ${PORT}`));