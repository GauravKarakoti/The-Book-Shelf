const { User } = require("../models/user");

let auth = (req, res, next) => {
    let token = req.cookies.auth;

    if (!token) {
        return res.send(false);
    }

    User.findByToken(token, (err, user) => {
        if(err) return res.send(false); 
        
        if(!user) return res.send(false);
        
        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = { auth }