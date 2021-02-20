# aws-ses
**Send SES mail via SDK using HTML templates, using terraform (with remote state) to configure SES**

SES Setup using Terraform:
1. Manually create S3 bucket in us-east-1 region: terraform-state-ramit21. Enable versioning.
2. Manually create dynamodb table in us-east-1 region: dynamodb-terraform-state-lock, with hashkey LockID of type String.
3. Run terraform scripts under folder /terraform/ses: 
```
(Update provider.tf with right access key, run below commands on terraform/ses folder)
terraform init
terraform plan
terraform apply
```
Terraform scripts will do the following:
1. Setup terrafrom state remotely on S3 bucket and enable locking using dynamodb.
2. Creates IAM user that has SES policy to send mails (this user can be ignored, see step 1 below). 
3. Register the email addresses with SES.
4. Upload the template with SES.

Next steps:
1. Configure region and access keys of user created above in config.json. Take the secret access key of the user from terraform state file (note that state file must be protected as it contains secret key). Uncomment line 4 in send_email.js. Or skip this step, and configure AWS on local system with a user that has send email permissions.
2. Verify the email registration.

Execute code that send mails :
1. 'npm install aws-sdk' (or just npm install on root folder of poc as package.json has aws-sdk dependency)
2. 'npm run dev' which as per package.json runs 'node send_email.js'

In this POC we send mails using 2 ways:
1. sendMailUsingTemplate() -> Send email using SES template.
2. sendMailUsingHTML() -> Send email using HTML file from code base.

## SES Sandbox

SES by default works in Sandbox mode which has few restrictions. Refer this link for the restrictions and how to request for complete access:

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html

In Sandbox mode, the 'to' address can only be from emails registered with SES. However, the 'From' address is always from registered email addresses, be it sandbox or regular account.

## SES Domain Registration
You can verify mails one by one, or create a domain and verify it instead. When you verify an entire domain, you can then use any sub-domain as the mail sender (eg user1@mydomain.com for the verfified domain mydomain.com). To register your domain, you need to add the domain as a TXT record with your DNS provider (R53 or third party) with the name '_amazonses', and the token of the ses domain. 

https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_domain_identity

The terraform link above creates a domain example.com, and registers it with R53. Before running this, create a R53 hosted zone, and give the zone_id in terraform field zone_id. Once all this is done, verify on SES console that your domain is marked as 'Verfified'. Now change the sender address in send_email.js with say user@example.com, and see the latter marked as sender of the mail. You can also verify DKIM so that mails don't land in the junk folder.

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html

https://www.youtube.com/watch?v=j8izLCTBIwg
