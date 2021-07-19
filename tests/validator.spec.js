var app = require('../app'), 
	expect  = require('chai').expect,
	validators  = require('../classes/validators/mail');

describe('Isolating Validator', function () {

	it('addressField validator returns true when address is correct', function(done) {

		expect(validators.checkTo({'addressTo':'rowan.pronk@gmail.com'})).to.equal(true);

		done();

	});

	it('addressField validator throws error when null', function(done) {

		expect(function() { validators.checkTo({'addressTo':null}) }).to.throw('addressTo field must exist and not be null');

		done();

	});


	it('addressField validator throws error when addressTo blank', function(done) {

		expect(function() { validators.checkTo({'addressTo':''}) }).to.throw('addressTo field must exist and not be null');

		done();

	});

	it('addressField validator throws error when multiple emails are passed in but not valid', function(done) {

		expect(function() { validators.addressField('addressTo','rowan.pronk@gmail.com;rowanpronk@.co') }).to.throw('addressTo Email string is invalid. Please enter a single valid email or multiple emails seperated by a semi colon.');

		done();

	});

	it('addressField validator throws error when emails are passed in but not valid', function(done) {

		expect(function() { validators.addressField('addressTo','rowanpronk@.') }).to.throw('addressTo Email string is invalid. Please enter a single valid email or multiple emails seperated by a semi colon.');

		done();

	});

	it('addressField validator throws error when multiple emails are passed in but not valid', function(done) {

		expect(function() { validators.addressField('addressTo','rowan.pronk@gmail.com;rowanpronk@.') }).to.throw('addressTo Email string is invalid. Please enter a single valid email or multiple emails seperated by a semi colon.');

		done();

	});


	it('contentField validator returns true when valid input given', function(done) {

		expect(validators.contentField('This is a valid email message.')).to.equal(true);

		done();

	});


	it('contentField validator throws error when input less than 3 chars', function(done) {

		expect(function() { validators.contentField('T') }).to.throw('content field must be longer than 3 chars');

		done();

	});


	it('contentField validator throws error when input empty', function(done) {

		expect(function() { validators.contentField(null) }).to.throw('content field must not be empty.');

		done();

	});
	
});