const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require ("./routes/userRoutes")

const app = express();
dotenv.config();

connectDB();

app.get('/', (req, res) => {
    res.send("API running");
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
}); 

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
}); 

app.use('/api/user', userRoutes); 


const PORT = process.env.PORT || 5001;

app.listen(5001, console.log(`Server started on port no : ${PORT}`));