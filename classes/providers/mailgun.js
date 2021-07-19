/* 
 * Mailgun Provider
 *
 * Used to send email using 3rf Party Service: Mailgun
 *
*/
const config = require('config');
const querystring = require("querystring");

module.exports = {

      configure: credentials => {

        let body = {
              from: config.mail.general.replyTo,         
              to: credentials.to.replace(';',','), //replace colon with comma for multiple
              subject: config.mail.general.subject,
              text: credentials.content
        }

        if(credentials.cc) {
          body.cc = credentials.cc.replace(';',',');
        }

        if(credentials.bcc) {
          body.bcc = credentials.bcc.replace(';',',');
        }

        let data = querystring.stringify(body);

        return  {
          method: 'POST',
          url: config.mail.providers.mailgun.endPoint,
          headers: {
            'content-length': data.length,
            'content-type': 'application/x-www-form-urlencoded',
            authorization: 'Basic ' + Buffer.from('api:' + config.mail.providers.mailgun.key).toString('base64')
          },
          body: data
        }

    }

}