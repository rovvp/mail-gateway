/* 
 * Mail Controller
 *
 * Requests forwrded to this controller
 *
*/

const validator = require('../classes/validators/mail');
const sendgrid  = require('../classes/providers/sendgrid');
const mailgun   = require('../classes/providers/mailgun');
const mailActor = require('../classes/actors/mailActor');
const logger    = require('../utils/logger');

/* 
 * function: main
 * Initiates the request route 
 * Returns json 
 * 
*/

exports.processMail = async(req, res) => {

    const cc = req.body.addressCc || '';
    const bcc = req.body.addressBcc || '';

    try { 

        logger.log('info', "Validating user input");

        //validate inputs
        validator.checkTo(req.body);

        validator.addressField('addressTo', req.body.addressTo);

        if (cc.length > 0) {
            validator.addressField('addressCc', cc);
        }

        if (bcc.length > 0) {
            validator.addressField('addressBcc', bcc);
        }

        validator.contentField(req.body.content);


    } catch (e) {

        //return fatal error on misconfigured inputs
        res.status(400).json(e);
        logger.log('error', e);
        return;

    }


    /**
     * Setup config
     * 
     */

    logger.log('info', "Setting up mail config ... ");

    const sendgridConfig = sendgrid.configure({
        to: req.body.addressTo,
        cc: cc,
        bcc: bcc,
        content: req.body.content
    });

    const mailgunConfig = mailgun.configure({
        to: req.body.addressTo,
        cc: cc,
        bcc: bcc,
        content: req.body.content
    });

    /**
     * Default: Sendgrid
     * Begin by attempting the default provider Sendgrid
     * Fail sending after the set number of retries and time out period.
     */
    try {

        logger.log('info', 'Attempting mail send using Sendgrid service.');
        let response = await mailActor.send(sendgridConfig);
        res.status(200).json(response);
        logger.log('info', `Mail sent ${JSON.stringify(response)}`);
        return;

    } catch(e) {

        //log error but continue on to failover service.
        logger.log('error', `Mail error ${JSON.stringify(e)}`);

    }

    /**
     * Failover: Mailgun
     * If sending via Sendgrid fails we move on to try Mailgun
     * Fail sending after the set number of retries and time out period.
     * 
     */
    try {

        logger.log('info', 'Attempting mail send using Mailgun service.');
        let response = await mailActor.send(mailgunConfig);
        res.status(200).json(response);
        logger.log('info', `Mail sent ${JSON.stringify(response)}`);
        return;

    } catch(e) {

        //finally return fatal error 
        res.status(400).json(e);
        logger.log('error', `Mail error ${JSON.stringify(e)}`);
        return;

    }

};
 
