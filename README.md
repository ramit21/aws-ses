# aws-ses
**Send SES mail via SDK using HTML templates, using terraform to configure SES**

SES Setup:
1. Run the below terraform commands on the terraform folder to create IAM user that has SES policy to send mails. 
```
Update provider.tf with right access keys.
terraform init
terraform plan
terraform apply
```
2. Configure the access keys of this user in config.json, along with region of SES being used.
3. Register the email addresses and verify them.

Execute mail sending code:
1. 'npm install aws-sdk' (or just npm install on root folder of poc as package.json has aws-sdk dependency)
2. 'npm run dev' which as per package.json runs 'node send_email.js'

In this poc we have used html file as a template for mail body. You can also define templates within SES:
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-personalized-email-api.html

SES by default works in Sandbox mode which has few restrictions. Refer this link for the restrictions and how to request for complete access:

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html

In Sandbox mode, the 'to' address can only be from emails registered with SES. However, the 'From' address is always from registered email addresses, be it sandbox or regular account.

You can verify mails one by one, or create a domain and verify it instead.