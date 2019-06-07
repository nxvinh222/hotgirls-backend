const express = require('express');
const Router = express();
const bcrypt = require('bcrypt');

const UserModel = require('../models/user');

Router.get('/', function(req, res){
    if(req.session.user){
        res.json({ success: true, message: 'Success!', user: req.session.user })
    }else{
        res.json({ success: false, message: 'Fail!'})
    }
})


Router.post('/login', function(req, res){
    const { username, password } = req.body;

    console.log(req.body.username);

    UserModel.findOne({ username }, function(err, user){
        if (err) console.log(err)
        else if (!user) res.json({ success:false, message: 'User not found' })
        else{
            if(bcrypt.compareSync(password, user.password)){
                req.session.user = { username, id: user._id, name: user.name };
                res.json({ success: true, message: 'Login success!', user: user });
            }
            else res.json({ success: false, message: 'Wrong password!' });
        }
    })
})

module.exports = Router;