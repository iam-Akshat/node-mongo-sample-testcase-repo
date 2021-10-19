const mongoose = require('mongoose');
const app = require('../src/app');
const dotenv = require('dotenv');
const RefreshToken = require('../src/models/RefreshToken');
const User = require('../src/models/User');

dotenv.config();

const port = 5000;

const mongoURI = "mongodb://mongoService:27017/" + "authTesting"

//connect to DB before running tests
before((done) => {
    // start the server
    app.listen(port, () => {
        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        mongoose.connection.once('open', () => {
            console.log('connected to database');
            done();
        }).on('connectionError', (err) =>{
            console.log(err);
        })
    })
})

//drop the databsae
after((done) =>{
    mongoose.connection.db.dropDatabase(() => {
        mongoose.disconnect().then(() => done()).catch(err => console.log(err));
    })
})
