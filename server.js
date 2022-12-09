//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const app = express ();
const db = mongoose.connection;
const Post = require('./models/post.js');
const User = require('./models/user.js');
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
  console.log('connected')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));
// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(express.json());

app.use(cors());

//___________________
// Routes
//___________________
  // Get All Posts (For Home Page)
  app.get('/posts', (req, res)=>{
    Post.find({}, (err, postMatch)=>{
      res.json(postMatch);
    });
  });
  // Get All Users (For Search Page) *** Not 100% sure this is the best approach
  app.get('/users', (req, res)=>{
    User.find({}, (err, userMatch)=>{
      res.json(userMatch);
    });
  });
  // Create Post
  app.post('/posts', (req, res)=>{
    Post.create(req.body, (err, createdPost)=>{
      res.json(createdPost);
    });
  });
  // Delete Post
  app.delete('/posts/:id', (req, res)=>{
    Post.findByIdAndRemove(req.params.id, (err, deletedPost)=>{
      res.json(deletedPost);
    });
  });
  // Edit Post (Both for users own posts and comments on others should be the same route)
  app.put('/posts/:id', (req, res)=>{
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, match)=>{
      res.json(match);
    });
  });
  // Create User
  app.post('/users', (req, res)=>{
    User.create(req.body, (err, createdUser)=>{
      res.json(createdUser);
    });
  });
  // Edit User
  app.put('/users/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, match)=>{
      res.json(match);
    });
  });
  // Delete User
  app.delete('/users/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
      res.json(deletedUser);
    });
  });
  // Delete All Posts from User (for using when user is deleted)
  app.delete('/allposts/:username', (req, res)=>{
    Post.find({owner: req.params.username}).deleteMany((err, deletedPosts)=>{
      res.json(deletedPosts);
    });
  });

  // Remove user from any other user following and followers
  app.put('/following/:username', (req, res)=>{
    User.find({}).updateMany({$pull: {following:req.params.username}}, (err, deletedUser)=>{
      res.json(deletedUser);
    });
  });
  app.put('/followers/:username', (req, res)=>{
    User.find({}).updateMany({$pull: {followers:req.params.username}}, (err, deletedUser)=>{
      res.json(deletedUser);
    });
  });

  // Delete all user comments on toher users posts
  app.put('/allcomments/:username', (req, res)=>{
    Post.find({}).updateMany({$pull:{comments:{user:req.params.username}}}, (err, deletedUser)=>{
      res.json(deletedUser);
    });
  });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));