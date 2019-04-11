const express = require('express');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const morgan = require('morgan');

const app = express();

// Db connection
const { mongoose } = require('./_helpers/database');

// middlewares
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./routes/user.routes'));

// global error handler
app.use(errorHandler);

// settings
app.set('port', process.env.PORT || 3000);

// Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
