'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)


const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const RedisStore = connectRedis(session)

//redis client
const redisClient = redis.createClient({
  host: 'localhost',
  post: 6379
})

redisClient.on('error', function(err){
  console.log('no conection redis'+err);
});
redisClient.on('connect', function(err){
  console.log('conected');
});

//configure session midleware
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: 'secret$%^134',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false, //true only transmit cookie over https
    httpOnly: false, //if true prevent client side js from reading the cookie
    maxAge: 1*60*10 //session max age miliseconds
  }
}))


app.get("/", (req, res) => {
  const sess = req.session;
  if (sess.username && sess.password) {
    if (sess.username) {
      res.write(
        `<h3>Home page</h3>`
      );
     }
  } else {
    res.sendFile(__dirname + "login.edge")
  }
});
app.post("login", (req, res) => {
  const sess = req.session;
  const { username, password } = req.body
  sess.username = username
  sess.password = password
  // add username and password validation logic here if you want.If user is authenticated send the response as success
  res.end("success")
});
app.get("logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/")
  });
});


const cookieParser = require('cookie-parser');
app.use(express.static(__dirname +'/views'));
app.use(cookieParser());
