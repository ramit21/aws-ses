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

output "secret" {
  value = aws_iam_access_key.mail_sender.encrypted_secret
}