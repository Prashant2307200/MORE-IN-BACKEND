// req -> middleware(function) -> res
// types
// method override
// body parser
// express.static
// express.urlencoded

// features
// excess req ,res obj.
// chaining is possible 
// send a response to break cycle
// execute any code
// call next middleware in stack
// app.use(middleware) -> app.use((err,req,res,next)=>{});
// middleware either send res or call next middleware in stack

const express = require('express');
const app = express();
const port = 3000;

app.use((req,res)=>{
    const { query,password } = req.query;
    console.log('Hi i\'m middleware');
    res.send(`${ query } ${ password }`);
})

app.get('/', (req, res) => {
    res.send('Welcome res received!');
});

app.listen(port,() => {
    console.log(`listening on port ${ port }`);
});