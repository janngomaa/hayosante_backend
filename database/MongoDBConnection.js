const mongosse = require('mongoose');
const logger = require('../logging/expressWinston');

module.exports = async() => {
    try{
        await mongosse.connect( process.env.MONGODB_RESTO_URL, 
                                {   useNewUrlParser:true,  
                                    useUnifiedTopology: true /*,
                                    useFindAndModify: false */
                                }
        );
        logger.info('Connected to MongoDB Server.', {layer:'database'});
    } catch(error){
        logger.error('Database Connectivity Error: ', error,  {layer:'database'});
        throw new Error(error);
    } 
}