const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session');

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(session({
    secret: 'worthy',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authApiRouter = require('./routers/authApi');
app.use('/api/auth', authApiRouter);

app.use(function(req, res, next){
    // console.log(req.session);
    // console.log(req.sessionID);
    // req.session.user = "vinh";
    // res.send("cc")
    next();
})

mongoose.connect('mongodb://localhost/tk-hotgirls');



const userApiRouter = require('./routers/userApi');
app.use('/api/users', userApiRouter);

const postApiRouter = require('./routers/postApi');
app.use('/api/post', postApiRouter); 

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, '../frontend/home.html'));
})


app.get('/login', function(req, res){
    res.sendFile(path.resolve(__dirname, '../frontend/login.html'));
})

app.listen(8008, function(err){   
    if (err) console.log(err)
    else console.log("Link start!");
})

