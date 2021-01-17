const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@articles-api.szye7.mongodb.net/<dbname>?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('MonogoDB Connected!');
})


const articlesRouts = require('./api/routes/articles')
const categoriesRouts = require('./api/routes/categories')
const usersRouts = require('./api/routes/users')

app.use(morgan("dev")); 

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


app.use( (req, res ,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


// Routes
app.use('/articles', articlesRouts);
app.use('/categories', categoriesRouts);
app.use('/users', usersRouts);


app.use( (req, res, next) => {
    const error = new Error('not Found');
    error.status = 404;
    next(error);
})

app.use( (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app