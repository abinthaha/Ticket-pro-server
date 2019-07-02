
var database = require("../../config/db")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/registerValidator");
const validateLoginInput = require("../../validation/loginValidator");
const keys = require("../../config/key")
const User = require("../../models/User");

var userController = {
    createUser: (req, res) => {
        const { errors, isValid } = validateRegisterInput(req.body);
        if (!isValid) {
            console.log("Error occured")
            return res.status(400).json(errors);
        }
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.send("Email id already exists")
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role_id: req.body.role_id
                });
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        console.log("USER CREATION", newUser)
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
    },

    getAllUsers: (req, res) => {
        User.find({role_id: 1}).then(users => {
            res.send(users)
        }).catch(err => {
            console.log("error when Get users", err)
        })
    },
    
    login: (req, res) => {
        const { error, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(404).json(error)
        }
        else {
            User.findOne({ email: req.body.email }).then(user => {
                if (!user) {
                    res.status(404).json("Email id doesnot exist")
                }
                else {
                    bcrypt.compare(req.body.password, user.password).then(isMatch => {
                        if (isMatch) {
                            // User matched
                            // Create JWT Payload
                            const payload = {
                                id: user.id,
                                name: user.name,
                                role_id: user.role_id,
                                email: user.email
                            };
                            // Sign token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {
                                    expiresIn: 31556926 // 1 year in seconds
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                }
                            );
                        }
                        else {
                            res.status(404).json("Invalid password")
                        }
                    });
                }
            })
                .catch(err => {
                    console.log("Error:", err)
                })
        }
    },
}

module.exports = userController