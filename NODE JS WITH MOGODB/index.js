const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat');
const methodOverride = require('method-override');
const ExpressError = require('./ExpressError');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.listen(port,() => {
    console.log(`listening on port http://localhost:${port}/chats`);
});

(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/whatsapp`);
})()
.then(res => console.log(`Connecting to Port: ${port}`))
.catch(error => console.error(err)); 

function asyncWrap(asyncFunc){
    return (function(req, res, next){
        asyncFunc(req, res, next).catch(err => next(err));
    });
}

app
.get('/chats',asyncWrap(async (req, res) => {
    // index route
    let chats = await Chat.find();
    res.render('chats',{ chats });
}))
.get('/chats/new',(req, res) => {
    // create route
    // throw new ExpressError(404,'Page not found');
    res.render('new')
})
.post('/chats' , async (req, res) => {
    try{
        let { from,to,msg } = req.body;
        let newChat =  new Chat({ from,to,msg,created_at: new Date() });
        await newChat.save()
        res.redirect('/chats');
    }
    catch(err){
        next(err);
    }
})
.get('/chats/:id', async (req, res ,next) => {
    // show route
    let { id } = req.params;
    let chat = await Chat.findById(id);
    // mongoose err wrong len id
    // invalid id garbage chat ejs err
    // id doesn't exist page not exist 
    // validation error
    if( !chat ){
        next(new ExpressError(404,"Chat not found"));
    }
    res.render("edit", { chat });
})
.get('/chats/:id/edit',async (req, res) => {
    // update route
    try{
        const { id } = req.params;
        let chat = await Chat.findById(id);
        res.render('edit',{ chat });
    }
    catch(err){
        next(err);
    }
})
.put('/chats/:id',async (req, res) => {
    try{
        const { id } = req.params;
        const { msg: newMsg }= req.body;
        let updatedChat = await Chat.findByIdAndUpdate(
            id ,
            { msg: newMsg } ,
            { runValidators: true }
        );
        res.redirect('/chats');
    }
    catch(err){
        next(err);
    }
})
.get('/chats/:id',async (req, res) => {
    // delete route
    try{
        const { id } = req.params;
        const deleteChat = await Chat.findByIdAndDelete(id);
        res.redirect('/chats');
    }
    catch(err){
        next(err);
    }
});

const handleValidationError = (err) => {
    if(err.name === "ValidationError"){
        console.log("This was a validation error please follow the rules");
        console.dir(err.message);
    }
    return err;
}

app.use((err, req, res, next) => {
    if(err.name === "ValidationError"){
        err = handleValidationError(err); 
    }
    next(err);
});
app.use((err, req, res, next) => {
    let { status=500 ,message="Some Error Occurs" } = err;
    res.status(status).send(message);
});