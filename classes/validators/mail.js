/* 
 * Validator module
 *
 * This is used for user input validation when data is posted to the API.
 *
*/

module.exports = {

	checkTo: function(body) {

		if(!body.addressTo) {

			throw 'addressTo field must exist and not be null'

		} 

		return true;
	},

	addressField: function(field, content) {

		var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-\.]+)+([;]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-\.]+))*$/;

		if(!regex.test(content)) {
			throw `${field} Email string is invalid. Please enter a single valid email or multiple emails seperated by a semi colon.`;
		}

		return true;

	},

	contentField: function(content) {

		if(!content) {

			 throw 'content field must not be empty.';

		}

		if(content && content.length < 3) {

			 throw  'content field must be longer than 3 chars.';

		}

		return true;

	}

} 