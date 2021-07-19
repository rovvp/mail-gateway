const request = require('superagent');

module.exports = {

    send: async(provider) => {
                
       let res = await request
            .post(provider.url)
            .set("content-type", provider.headers['content-type'])
            .set("authorization", provider.headers['authorization'])
            .send(provider.body)
            .retry(3) //retry configuration 3 attempts
            .timeout({ deadline: 5000 }) //5 second timeout
            .catch((err) => {
                return new Promise((resolve,reject) => {
                    reject({ "Status": err.response.statusCode, "Success": false, "Error": err.response.error, "Retries": err.retries });
                });
            });

            return new Promise((resolve,reject) => {
                resolve({ "Status": res.statusCode, "Success": res.ok });
            });

    }
    
}
