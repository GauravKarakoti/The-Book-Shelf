require('dotenv').config();
const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        FRONTEND: 'https://the-book-shelf-snowy.vercel.app'
    },
    default: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        FRONTEND: 'http://localhost:3000'
    }
}
exports.get = function get(env) {
    return config[env] || config.default
}