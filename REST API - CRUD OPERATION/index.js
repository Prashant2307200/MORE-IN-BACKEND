const express = require('express');
const ExpressError = require('./ExpressError');
const methodOverride = require('method-override');
const path = require('path');
const router = require('./routes/posts');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('./views',path.join(__dirname, 'views'));

const checkoutToken = ( req,res,next ) => {
    const { token } = req.query;
    if(token !== 'Give Access'){
        throw new ExpressError(401,'--> ACCESS DENIED! <--');
    }
    return next();
}
// app.use('/api',checkoutToken);
app.get('/api',checkoutToken,(req, res) => {
    res.send('data');
});

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/posts',router);
app.use((req,res,next) => {
    req.responseTime = new Date().toString();
    const { method,path,responseTime,hostname } = req;
    console.log(`${method}: ${hostname} ${path} ${responseTime}`);
    return next();
});
app.get('/err',(req,res)=>{ abcd=abc });
app.use('/err',(err,req,res,next) => {
    const { status=500,message=`SOME ERROR` } = err;
    res.status(status).send(message);
    return next(err);
});
app.use((req,res) => {
    let status = 404;
    let message = 'Not Found';
    // information ,success ,redirect ,client err ,server err
    res.status(status).send(message);
});

app.listen(port,() => {
    console.log(`listening on port http://localhost:${port}/posts/`);
});
