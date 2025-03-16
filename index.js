import express from "express";
import { title } from "process";
import methodOverride from "method-override";
const app=express();
const port = 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(methodOverride("_method"));

// this array stores my blogs key pair
let blogPosts=[]
console.log(blogPosts)
// for main home page
app.get('/', (req, res)=>{
    const sendingTitle = blogPosts.map(post => post.key); 
    res.render('index', {blogTitle: sendingTitle});
});

// to render the write article page
app.get('/write', (req, res)=>{
    res.render('write');
});

// for writing articles on the website and it adds to the main array 
app.post('/submit', (req, res)=>{
    const postit={
        key:req.body.title,
        content:req.body.blogpost,
    }
    blogPosts.push(postit);
    res.redirect('/');
});


// for sending to read article page from links
app.get('/post/:title', (req, res)=>{
    const titleToFind = req.params.title;
    const foundPost = blogPosts.find(post => post.key === titleToFind);
   
    if (foundPost) {
        res.render("post", { title: foundPost.key, content: foundPost.content });
    } else {
        res.status(404).send("Post not found");
    }
 
});
// route to the edit page 
app.get("/edit/:title", (req, res) => {
    const post = blogPosts.find(p => p.key === req.params.title);
    
    if (post) {
        res.render("edit", {title: post.key, content:post.content });
    } else {
        res.status(404).send("Post not found");
    }
});
// for updating the blogs and titles from my page
app.put("/update/:title", (req, res) => {
    const postIndex = blogPosts.findIndex(post => post.key === req.params.title);
    
    if (postIndex !== -1) {
        blogPosts[postIndex].key = req.body.title;  
        blogPosts[postIndex].content = req.body.content;
        res.redirect("/");
    } else {
        res.status(404).send("Post not found");
    }
});

// function to delete any blog from the site
app.post("/delete/:title", (req, res) => {
    const titleToDelete = req.params.title;
    const postIndex = blogPosts.findIndex(post => post.key === titleToDelete);

    if (postIndex !== -1) {
        blogPosts.splice(postIndex, 1);
        res.redirect("/");
    } else {
        res.status(404).send("Post not found");
    }
});

app.listen(port, ()=>{
    console.log(`server listening on ${port}.`);
});