const AWS = require('aws-sdk');
const fs = require('fs');

//AWS.config.loadFromPath('./config.json');
AWS.config.update({ region: 'us-east-1' });

const sendMailUsingTemplate = (to, data) => {
	const templateData = {
		"name": data
	}
	var params = {
		Destination: {
			ToAddresses: [ to ]
		},
		Template: 'MyTemplate', //name of SES template
		TemplateData: JSON.stringify(templateData),
		Source: '21.ramit@gmail.com',
		ReplyToAddresses: [ '21.ramit@gmail.com' ]
    };
    
    console.log('sending mail using SES template as body ...');
    // Create the promise and SES service object
	var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendTemplatedEmail(params).promise();

	// Handle promise's fulfilled/rejected states
	sendPromise
		.then(function(data) {
			console.log('Template mail sent with id', data.MessageId);
		})
		.catch(function(err) {
			console.error(err, err.stack);
		});
};


const sendMailUsingHTML = (to, template) => {
	var params = {
		Destination: {
			ToAddresses: [ to ]
		},
		Message: {
			/* required */
			Body: {
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
    
    console.log('sending mail using HTML body ...');
    // Create the promise and SES service object
	var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

	// Handle promise's fulfilled/rejected states
	sendPromise
		.then(function(data) {
			console.log('HTML mail sent with id', data.MessageId);
		})
		.catch(function(err) {
			console.error(err, err.stack);
		});
};

//Send mail using SES Template
sendMailUsingTemplate('21.ramit@gmail.com',"Ramit");

//Read HTML template from code and send mail using this template
fs.readFile("template.html", "utf8", function(err, data) {
	sendMailUsingHTML('21.ramit@gmail.com',data);
});

