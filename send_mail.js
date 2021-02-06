const AWS = require('aws-sdk');
const fs = require('fs');

//AWS.config.loadFromPath('./config.json');
AWS.config.update({ region: 'us-east-1' });

let sendMail = (template) => {
	// Create sendEmail params
	var params = {
		Destination: {
			ToAddresses: [ '21.ramit@gmail.com' ]
		},
		Message: {
			/* required */
			Body: {
				/* required */
				Html: {
					Charset: 'UTF-8',
					Data: template
				}
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'Test email'
			}
		},
		Source: '21.ramit@gmail.com',
		ReplyToAddresses: [ '21.ramit@gmail.com' ]
    };
    
    console.log('sending mail...');
    // Create the promise and SES service object
	var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

	// Handle promise's fulfilled/rejected states
	sendPromise
		.then(function(data) {
			console.log('Mail sent with id', data.MessageId);
		})
		.catch(function(err) {
			console.error(err, err.stack);
		});
};

fs.readFile("template.html", "utf8", function(err, data) {
     sendMail(data);
});

