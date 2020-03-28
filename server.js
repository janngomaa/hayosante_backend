const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require("morgan");
var addRequestId = require('express-request-id')();
 

dotenv.config();
const logger = require('./logging/expressWinston');
const mgDBConnection = require('./database/MongoDBConnection');

const app = express();

//DB Connectivity
mgDBConnection();

/* ***
*  *** MIDLEWARES
*/

//Logging
app.use(addRequestId);
morgan.token('id', function getId(req) {
  return req.id
});
const morganFormat = `requestId:':id', remote-addr:':remote-addr', metho:':method', url:':url', 
status:':status', response-time:':response-time(ms), http-version:'HTTP/:http-version', 
content-length:':res[content-length]', referrer:':referrer', user-agent:':user-agent'`;

app.use(morgan(morganFormat, { "stream": logger.stream }));


//request payload middlewares
app.use(express.json()); //parse request json data
app.use(express.urlencoded({extended:true})); //parse url encoded data

// Routing app modules
app.use('/api/v1/user', require('./routes/userRoutes'));
/*app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'));
app.use('/api/v1/reservation', require('./routes/reservationRoutes'));
*/

app.get('/', (req, res, next) => {
    res.send('Welcome to the Hayyosante Web API');
});


// Error Handling Middleware (Default Error Handling)
app.use(function(err, req, res, next){
    logger.error(err.stack, {layer:'endpoint', requestId:req.id});
    logger.debug(req, res, {layer:'endpoint', requestId:req.id});

    res.status(500).send({
        status:500, 
        message:err.message, 
        body:{}});
});
PORT = process.env.SERVER_PORT || 6002;
app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`, {layer:'endpoint'});
});
