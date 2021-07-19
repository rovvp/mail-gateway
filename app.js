/* 
 * sampleMailer
 *
 * A simple NodeJS application providing an API Endpoint interface to our backend providers 
 *
*/

const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const app = express();
const cors = require('cors')
const mailRouter = require('./routes/mail');
const logger = require('./utils/logger');

/* 
 * Server Setup
 *
 * Setup app restrictions
 *
*/

app.use(cors());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));


/* 
 * Routes
 *
 * Tie mail routes into app
 *
*/
app.use(mailRouter);


/* 
 * Start 
 *
 * Start the application
 *
*/

app.listen(process.env.PORT || config.get('general.port'), function () {
	logger.log('info', `Server started at ${config.get('general.port')}`);
});


module.exports = app;
