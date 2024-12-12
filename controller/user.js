const User = require('../model/user');
const {genSaltSync, hashSync, compareSync} = require('bcrypt');

module.exports.addUser = (req, res) => {
    let body = req.body;

    if(body!=null && body!=undefined){
        if(body.username==null){
            res.status(400).json({
                status: 'fail',
                message: {body: 'Username is required!'}
            })
        }
        else if(body.email==null){
            res.status(400).json({
                status: 'fail',
                message: {body: 'Email is required!'}
            })
        }
        else if(body.password==null){
            res.status(400).json({
                status: 'fail',
                message: {body: 'Paswword is required!'}
            })
        }
        else{
            const user = new User({
                username: body.username,
                password: hashSync(body.password, genSaltSync(10)),
                email: body.email,
                name: {
                    first: body.first,
                    last: body.last
                }
            })

            user.save()
            .then((user) => {
                res.status(200).json({
                    status: 'success',
                    message: user
                })
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'fail',
                    message: err
                })
            })
        }
    }
    else{
        res.status(400).json({
            status: 'fail',
            message: {body: 'Body is required!'}
        })
    }
}

module.exports.getAllUser = (req, res) => {
    User.find()
    .then((users) => {
        return res.status(200).json({
            status: 'success',
            data: users
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: err
        })
    })
}

module.exports.getUserById = (req, res) => {
    const id = req.params.id;

    User.findById(id)
    .then((user) => {
        return res.status(200).json({
            status: 'success',
            data: user
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: err
        })
    })
}

module.exports.updateUser = (req, res) => {
    const userId = req.params.id;
    let body = req.body;
    const updates = {};

    if(body.username){
        updates.username = body.username;
    }
    if(body.password){
        updates.password = hashSync(body.password, genSaltSync(10));
    }
    if(body.email){
        updates.email = body.email;
    }
    if(body.name){
        if(body.name.first){
            updates['name.first'] = body.name.first;
        }
        if(body.name.last){
            updates['name.last'] = body.name.last;
        }
    }

    User.findAndUpdate(userId, updates)
    .then((newUser) => {
        if(!newUser){
            return res.status(404).json({
                status: 'fail',
                message: 'Usuario no encontrado'
            })
        }
        return res.status(200).json({
            status: 'success',
            data: newUser
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: 'Error al editar el usuario',
            error: err.message
        })
    })
}