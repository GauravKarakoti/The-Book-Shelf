const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const cookieParser = require('cookie-parser');
const books = require('./routes/books');
const config = require('./config/config').get(process.env.NODE_ENV);
require('dotenv').config();
const app = express();
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', user);
app.use('/api/books', books);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('SERVER RUNNING');
});