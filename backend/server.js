const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDB = require('./config/db');
const userRoutes = require('../backend/Routes/userRoutes');
const chatRoutes = require('../backend/Routes/chatRoutes');
const messageRoutes = require('../backend/Routes/messageRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');


connectDB();
const app = express();
dotenv.config()

app.use(express.json());

app.get('/', (req, res) => {
    res.send('api is runnig');
})
app.get('/api/chat', (req, res) => {
    res.send(chats);
})
app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find(c => c._id === req.params.id)
    res.send(singleChat);
});

app.use("/api/user", userRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000;


app.listen(8000, console.log(`server started on PORT ${PORT}`));