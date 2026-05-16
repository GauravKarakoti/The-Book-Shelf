const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});
userSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password=hash;
                next();
            });
        })
    } else {
        next();
    }
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    var user = this;
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
}
userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET);
    user.token = token;
    
    user.save()
        .then(savedUser => {
            cb(null, savedUser);
        })
        .catch(err => {
            cb(err);
        });
}
userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    
    if (!token) return cb(new Error("Token not provided"));

    jwt.verify(token, config.SECRET, function(err, decode) {
        if (err) return cb(err); 
        
        user.findOne({"_id": decode, "token": token})
            .then(foundUser => {
                cb(null, foundUser);
            })
            .catch(err => {
                cb(err);
            });
    });
}
userSchema.methods.deleteToken = function(token, cb) {
    var user = this;
    
    user.updateOne({ $unset: { token: 1 } })
        .then(updatedUser => {
            cb(null, updatedUser);
        })
        .catch(err => {
            cb(err);
        });
}
const User = mongoose.model("User", userSchema);
module.exports = { User }