const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const postsRoutes = require('./routes/posts');

mongoose.connect('mongodb+srv://admin:b0nbBFa84U9MXdvQ@cluster0.p1ked.mongodb.net/posts-app?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(() => {
    console.log('connection failure')
  });

  

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  next();
})

app.use("/api/posts", postsRoutes);

module.exports = app;
