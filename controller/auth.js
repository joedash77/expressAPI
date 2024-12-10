const User = require('../model/user');
const { genSaltSync, hashSync, compareSync} = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');

module.exports.checkToken = (req, res, next) => {
    const token = req.get('auth');
    jwt.verify(token, 'privateKEY', (err, message) => {
        if(err){
            res.status(400).json({
                status: 'fail',
                message, 
                err
            })
        }
        else{
            next();
        }
    })
}

module.exports.login = (req, res) => {
    let body = req.body;
    const username = body.username;
    const password = body.password;

    if(username!=null){
        User.findOne({
            username: username
        })
        .then((user) => {
            if(user){
                const result = compareSync(password, user.password);

                if(result){
                    user.password = undefined;
                    const token = jwt.sign({user: user}, 'privateKEY', {
                        expiresIn: '24h'
                    });
                    return res.status(200).json({
                        status: 'success',
                        data: {
                            user: user,
                            token: token,
                            message: 'Authorized'
                        }
                    })
                }
                else{
                    return res.status(200).json({
                        status: 'fail',
                        message: 'Unauthorized'
                    })
                }
            }
            else{
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid username or password'
                })
            }
        })
    }
}