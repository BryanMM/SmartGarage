const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
    useCreateIndex: true, useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = {
    User: require('../models/user.model')
};