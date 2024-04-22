const mongoose = require('mongoose');
const Chat = require('./models/chat');

(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/whatsapp`);
})()
    .then(res => console.log(`Connecting to Port: 3000`))
    .catch(err => console.error(err));

let allChats = [
    {
        "from": "Alice",
        "to": "Bob",
        "msg": "Hey, how's it going?",
        "created_at": new Date()
    },
    {
        "from": "Prashant",
        "to": "Sujal",
        "msg": "Hey Alice! I'm good, thanks. How about you?",
        "created_at": new Date()
    },
    {
        "from": "Puja",
        "to": "Manisha",
        "msg": "I'm doing well too. Just working on a project.",
        "created_at": new Date()
    },
    {
        "from": "Boby",
        "to": "Het",
        "msg": "That sounds interesting. What project are you working on?",
        "created_at": new Date()
    },
    {
        "from": "Ramu",
        "to": "John",
        "msg": "It's a machine learning model for sentiment analysis.",
        "created_at": new Date()
    },
    {
        "from": "Lucifer",
        "to": "Juliet",
        "msg": "Wow, that sounds cool! Let me know if you need any help.",
        "created_at": new Date()
    }
]


Chat.insertMany(allChats);