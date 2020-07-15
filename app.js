const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const dotenv = require('dotenv');
var business = require('./business');

dotenv.config();
const app = express();
app.use(cors());
// parse application/json
app.use(bodyParser.json());


// Business routes
app.use('/api/business', business);

//Server listening
app.listen(process.env.PORT,() =>{
    console.log(`Server started on port ${process.env.PORT}...`);
});