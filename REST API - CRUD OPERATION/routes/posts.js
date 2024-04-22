const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
let { posts } = require('../data.json');

let show = 0;
let edit = 0;

posts.forEach( post => {
    post.id = uuidv4();
    console.log(post);
});

router
    .get('/',(req,res) => {
        // index route - /posts/
        res.render('index',{ posts,show,edit });
    })
    .get('/new',(req,res) => {
        // serve for create route
        res.render('new');
    })
    .post('/',(req,res) => { 
        // excess data served for create route
        let { username,content } = req.body;
        console.log(req.body);
        let id = uuidv4();
        posts.push({ id,username,content });
        res.redirect('/posts');
    })
    .get('/:id',(req,res) => {
        // show or view route
        let { id } = req.params;
        let post = posts.find(post => id == post.id);
        show = 1;
        res.render('show',{ post,show,edit });
        show = 0;
    })
    .get('/:id/edit',(req,res) => {
        // serve for edit route
        let { id } = req.params;
        let post = posts.find(post => id == post.id);
        edit = 1;
        res.render('edit',{ post,show,edit });
        edit = 0;
    })
    .patch('/:id',(req,res) => {
        // excess data served for edit route
        // hopscotch : patch => req -> body -> content="some content" -> form/urlenc...
        let id = req.params.id;
        let post = posts.find(post => id == post.id);
        post.content = req.body.content;
        res.redirect('/posts');
    })
    .delete('/:id',(req,res) => {
        // destroy route
        let { id } = req.params;
        posts = posts.filter(post => id != post.id);
        res.redirect('/posts');
    });
module.exports = router;