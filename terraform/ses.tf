resource "aws_iam_user" "mail_sender" {
  name = "mail_sender"
  tags = {
    service = "ses"
  }
}

resource "aws_iam_access_key" "mail_sender" {
  user = aws_iam_user.mail_sender.name
}

resource "aws_iam_user_policy" "ses_role" {
  name = "ses_role"
  user = aws_iam_user.mail_sender.name

policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action":[
            "ses:SendEmail",
            "ses:SendTemplatedEmail",
            "ses:SendRawEmail",
            "ses:SendBulkTemplatedEmail"
        ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF

}

resource "aws_ses_email_identity" "permitted_from_email" {
  email = "21.ramit@gmail.com"
}

resource "aws_ses_template" "MyTemplate" {
  name    = "MyTemplate"
  subject = "Greetings, {{name}}!"
  html    = "<h1 style='color:blue'>Hello {{name}}</h1>"
  text    = "Hello {{name}}"
}