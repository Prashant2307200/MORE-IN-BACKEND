const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const methodOverride = require('method-override');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node_app',
    password: 'prash@nt23'
});
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('/views', path.join(__dirname, '/views'));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port,() => {
    console.log(`listening on ${port}`)
});

app
.get('/', (req, res) => {
    // index route
    const q = `SELECT COUNT(*) FROM user`;
    try{
        connection.query(q,(err ,result) => {
            if (err) throw err;
            const count = result[0]["COUNT(*)"];
            res.render('home.ejs',{ count });
        });
    }
    catch(err){
        console.log(err);
        res.send(`SOME ERROR IN DB`)
    }
})
.get('/users', (req,res) => {
    // view route
    const q = `SELECT * FROM user`;
    try{
        connection.query(q,(err ,result) => {
            if (err) throw err;
            res.render('show',{ users: result });
        });
    }
    catch(err){
        console.log(err);
        res.send(`SOME ERROR IN DB`)
    }
})
.get('/users/:id/edit', (req,res) => {
    // edit route
    const { id } = req.params;
    const q = `SELECT * FROM user WHERE userId='${id}'`;
    try{
        connection.query(q, (err,result) => {
            if(err) throw err;
            const { userId,username,email,password } = result[0];
            res.render('edit',{ userId,username,email,password });
        });
    }
    catch(err){
        console.error(err);
        res.send(err);
    }
})
.patch('/users/:id',(req ,res) => {
    // update route (DB)
    const { id } = req.params;
    const { password: formPass,username: formUser } = req.body;
    const q1 = `SELECT * FROM user WHERE userId='${id}'`;
    try{
        connection.query(q1, (err,result) => {
            if(err) throw err;
            const { password } = result[0];
            if(formPass != password) {
                res.send('WRONG PASSWORD');
            }
            else{
                const q2 = `UPDATE user SET username='${formUser}' WHERE userId='${id}'`;
                connection.query(q2, (err,result) => {
                    if(err) throw err;
                    res.redirect('/users');
                });
            }
        });
    }
    catch(err){
        console.error(err);
        res.send(err);
    }
});

/**
let getRandUser = () => ({
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()

    avatar: faker.image.avatar(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
});

let data = [];
for(let i = 1; i <= 100; ++i){
    data.push(Object.values(getRandUser()));
}

const q = 'SHOW TABLES'; 
placeholder
const q = 'INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)';
const q = `INSERT INTO user (id ,username ,email ,password) VALUES ?`;
const users = [ 
    ['104','104_newuser','def@gmail.com','def'],
    ['105','105_newuser','ghi@gmail.com','ghi'],
];
const q = `INSERT INTO user (userId ,username ,email ,password) VALUES ?`;
connection.query( q ,[data] ,function(err ,res){
    if(err) throw err;
    console.log(res); //arrOfObj len itr
});
connection.end();

workbench
mysql

mysql package
node ./index.js

mysql -u root -p

CLI
set bin of it in environment variable

SQL FILES
source schema.sql   
*/