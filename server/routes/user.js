const express = require('express');
const router = express.Router();

// MODELS
const { User } = require('../models/user');

// MIDDLEWARE
const { auth } = require('../middleware/auth');

router.post('/register', (req, res) => {
    const user = new User(req.body);
    
    user.save()
        .then(doc => {
            res.status(200).json({
                success: true,
                user: doc
            });
        })
        .catch(err => {
            res.json({ success: false });
        });
});

router.post('/login', (req, res) => {
    User.findOne({ 'email': req.body.email })
        .then(user => {
            if(!user) return res.json({
                auth: false,
                message: 'Auth Failed! Email not found',
                userData: false
            });

            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch) return res.json({
                    auth: false,
                    message: 'Wrong Password',
                    userData: false
                });

                user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err);
                    res.cookie('auth', user.token).json({
                        auth: true,
                        userData: {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            lastname: user.lastname
                        }
                    });
                });
            });
        })
        .catch(err => {
            return res.status(400).send(err);
        });
});

router.get('/auth', auth, (req, res) => {
    res.json({
        auth: true,
        userData: {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname
        }
    });
});

router.get('/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if(!user) return res.status(400).send(err);
        res.status(200).send('Goodbye!');
    })
});

module.exports = router;