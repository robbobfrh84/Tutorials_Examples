# AWS domain hosted perched from nameCheap

### namecheap.com
- go to namecheap.com, log in, search for name, buy it.

### aws.amazon.com
- log into was and go to “Networking & Content” > click-> “Route 53”
- click -> "Hosted zones" on the left nav
- click -> [Create Hosted Zone]
- Paste the Source URL: … whatever.com
  - make sure “Type:” is set to “Public Hosted Zone”
- click -> [Create]
- on the left side nav. click “Hosted Zone”
- click-> the domain name you’ve just added … whatever.com
- Toggle [x] (or just click) in the row that has the “Type” NS…
- copy all the NS (name servers) inside the Value input box….
  - `ns-1949.awsdns-51.co.uk.` ! Not the same NS code you need, get your own!
  -`ns-936.awsdns-53.net.`
  -`ns-1399.awsdns-46.org.`
  -`ns-199.awsdns-24.com.`
- When i did this pressing [Save Record Set] just errors with  you haven’t changed anything.

### Back to namecheap.com
- log in, go to “DashBoard”, find your new URL and …
- click -> [Manage]
- find {NameServers}
- click “Custom DNS”
- paste all the NS you got from aws.
- find the green check mark and click to save.


### Back to AWS
- find the S3 buckets section and create a new bucket,
- IMPORTANT name it your website name i.e. example.com
- toggle through defaults.
- upload the *CONTENTS* of your folder, not the whole folder.
- go to your new bucket, click the “Permissions” tab & click -> [Bucket Policy]
- copy and paste this policy (MIND TO REPLACE example.com )
```JSON
{
  "Version":"2012-10-17",
  "Statement":[{
	"Sid":"PublicReadGetObject",
        "Effect":"Allow",
	  "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::example.com/*"
      ]
    }
  ]
}
```
- Under the properties tab in your bucketed click-> the “Static Website Hosting” box
- toggle “User this bucket to host a website”
- add index.html (or folder dir if you added it first. )
—
- find your way back to the route53
- In the “Hosted Zone” click your url you set up earlier
- click —> [Create Record Set]
- it should have an empty input for name with your url to the right. KEEP IT empty if the url is correct.
- toggle Alias [YES]
- under “Alias Target”, click the first one that pops up which should be your S3 bucket
- click->[Create]
- got your your url in the browser and really it worked for me right away!

### www. Re-routing.
The above code only works for yourwebsite.com, not www.yourwebsite dot com. Here's how we'll add another bucket to fix this.

In your Amazon S3 console...
- ->[+ Create bucket]
- Bucket Name = www.yourwebsite.com (Yes, must be just like that, but for you domain.)
- Toggle through default settings and [Create Bucket]
- ->[ your new bucket]
- ->[ Redirect requests ] box.
  - toggle "Use this bucket to host a website"
- for Target bucket or domain put the RE-Direct url... example.com (NO WWW)
- ->[Save]

Back in “Route 53”
- click -> "Hosted zones" on the left nav
- click -> [Create Hosted Zone]
- Paste the Source URL:www.whatever.com
  - make sure “Type:” is set to “Public Hosted Zone”
- click -> [Create]
- on the left side nav. click “Hosted Zones”
- click-> the domain name you’ve just added … www.whatever.com
- Toggle [x] (or just click) in the row that has the “Type” NS…
- IMPORTANT - copy all the NS (name servers) from the NON-www zones
  - past it in the value box.

- LINK: http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html
