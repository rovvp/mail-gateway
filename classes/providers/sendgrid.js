/* 
 * Sendgrid Provider
 *
 * Used to send email using 3rf Party Service: Mailgun
 *
*/
const config = require('config');

module.exports = {

    configure: credentials => {
        
        let personalizations = [{
             subject: config.mail.general.subject
        }];

        personalizations[0].to = credentials.to.split(';').map(function(item) {
          return { email: item };
        });

        if(credentials.bcc && credentials.bcc.length > 0) {
          personalizations[0].bcc = credentials.bcc.split(';').map(function(item) {
            return { email: item };
          });           
        }

        if(credentials.cc && credentials.cc.length > 0) {
          personalizations[0].cc = credentials.cc.split(';').map(function(item) {
            return { email: item };
          });           
        }
        
        return options = {
          method: 'POST',
          url: config.mail.providers['sendgrid'].endPoint,
          headers: {
              'content-type': 'application/json',
              authorization: 'Bearer ' + config.mail.providers.sendgrid.key
          },
          body: {
              personalizations: personalizations,
              from: {
                  email: config.mail.general.replyTo,
                  name: config.mail.general.from
              },
              reply_to: {
                  email: config.mail.general.replyTo,
                  name: config.mail.general.from
              },
          content: [
              {
                "type": "text/plain",
                "value": credentials.content
              }
            ]
          },
          json: true
      };

    }

}