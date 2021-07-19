var app = require('../app'), 
	expect  = require('chai').expect,
	config  = require('config'),
	mailgun  = require('../classes/providers/mailgun');

describe('Isolating Mailgun', function () {

	it('valid config with to credentials', function(done) {

		let credentials = {
			to: "rpronk@brrmedia.com",
			text: "This is my message",
			content: "this is some content"
		}


		expect(mailgun.configure(credentials)).to.be.an('object').that.includes.keys('body','headers','url','method');

		done();

	});


	it('valid config with to,cc credentials', function(done) {

		let credentials = {
			to: "rpronk@brrmedia.com",
			cc: "rowan.pronk@icloud.com",
			text: "This is my message",
			content: "this is some content"
		}

		expect(mailgun.configure(credentials)).to.be.an('object').that.includes.keys('body','headers','url','method');

		done();

	});


	it('valid config with to,cc,bcc credentials', function(done) {

		let credentials = {
			to: "rpronk@brrmedia.com",
			cc: "rowan.pronk@icloud.com",
			bcc: "row.jj.p@gmail.com",
			text: "This is my message",
			content: "this is some content"
		}

		expect(mailgun.configure(credentials)).to.be.an('object').that.includes.keys('body','headers','url','method');

		done();

	});

});