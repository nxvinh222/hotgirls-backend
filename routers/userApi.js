const express = require('express');
const bcrypt = require('bcrypt');
const UserApiRouter = express.Router();


const UserModel = require('../models/user');


UserApiRouter.get('/', function(req, res){
    // UserModel.find({}, function(err, users){
    //     if (err) res.json({ success: false, err})
    //     else res.json({ success: true, data: users})
    // })

    UserModel.find({})
        .then(users => res.json({ success: true, data: users}))
        .catch(err => res.json({ success: false, err}))
})

UserApiRouter.get('/:id', function(req, res){
    let {id} = req.params;
    // UserModel.findById(id, function(err, userFound){
    //     if(err) res.json({ success: false, err: "Not found" })
    //     else
    //     res.json({ success: true, data: userFound });
    // })

    UserModel.findById(id)
        .then(userFound => res.json({ success: true, data: userFound }))
        .catch(err => res.json({ success: false, err: "Not found" }))
})

UserApiRouter.put('/:id', function(req, res){
    let {id} = req.params;
    // UserModel.findById(id,
    // function(err, userFound){
    //     if (err) res.json({ success: false, err: ' Not found'})
    //     else if(!userFound) res.json({ success: false, err: ' Not found'})
    //     else{
    //         //ex: req.body = {name: 'a', age: 1}
    //         for (let key in req.body){
    //             let value = req.body[key];
    //             if (value !== null){
    //                 userFound[key] = value;
    //             }
    //         }

    //         userFound.save(function(err, userUpdated){
    //             if (err) res.json({ success: false, err})
    //             else res.json({ success: true, data: userUpdated}) 
    //         })
    //     }
    // });

    UserModel.findById(id)
        .then(userFound => {
            if(!userFound) res.json({ success: false, err: ' Not found'})
            else{
            //ex: req.body = {name: 'a', age: 1}
                for (let key in req.body){
                    let value = req.body[key];
                    if (value !== null){
                        userFound[key] = value;
                    }
                }
            }
            userFound.save()
                .then(userUpdated => res.json({ success: true, data: userUpdated}))
                .catch(err => res.json({ success: false, err}))
        })
        .catch(err => res.json({ success: false, err: err}))
});

//create
UserApiRouter.post('/', function(req, res){
    const { password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 12);
    req.body.password = hashPassword;
    // UserModel.create(req.body, function(err, createdUser){       
    //     if (err) res.json({ success: false, err})
    //     else res.json({ success: true, data: createdUser}) 
    // })

    UserModel.create(req.body)
        .then(createdUser => res.json({ success: true, data: createdUser}) )
        .catch(err => res.json({ success: false, err})
)
})

UserApiRouter.delete('/:id', function(req, res){
    let {id} = req.params;

    // UserModel.findById(id, function(err, userFound){
    //     if (err) res.json({ success: false, err: "Not found"})
    //     else {
    //         userFound.remove(function(err){
    //             if (err) res.json({ success: false, err})
    //             else res.json({ success: true})
    //         })
            
    //     } 
    // })

    UserModel.findById(id)
        .then(function(userFound){
            userFound.remove()
                .then(() => res.json({ success: true}))
                .catch(err => res.json({ success: false, err}))
        })
        .catch(err => res.json({ success: false, err: "Not found"})
        )
})


module.exports = UserApiRouter;