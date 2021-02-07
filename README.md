# aws-ses
**Send SES mail via SDK using HTML templates, using terraform to configure SES**

In this POC we send mails using 2 ways:
1. sendMailUsingTemplate() -> Send email using SES template.
2. sendMailUsingHTML() -> Send email using HTML file from code base.

SES Setup:
```
(Update provider.tf with right access key, run below commands on terraform folder)
terraform init
terraform plan
terraform apply
```
Terraform scripts will do the following:
1. Creates IAM user that has SES policy to send mails. 
2. Register the email addresses with SES.
3. Upload the template with SES.

Next steps:
1. Configure region and access keys of user created above in config.json. Take the secret access key of the user from terraform state file (note that state file must be protected as it contains secret key).
2. Verify the email registration.

Execute code that send mails :
1. 'npm install aws-sdk' (or just npm install on root folder of poc as package.json has aws-sdk dependency)
2. 'npm run dev' which as per package.json runs 'node send_email.js'


SES by default works in Sandbox mode which has few restrictions. Refer this link for the restrictions and how to request for complete access:

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html

In Sandbox mode, the 'to' address can only be from emails registered with SES. However, the 'From' address is always from registered email addresses, be it sandbox or regular account.

You can verify mails one by one, or create a domain and verify it instead. When you verify an entire domain, you are verifying all email addresses from that domain
