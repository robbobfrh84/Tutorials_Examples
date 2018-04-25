## AWS domain hosted perched from nameCheap step-by-step simplified

AWS > Route 53
- `| Hosted zones <`
- `[Create Hosted Zone]`
- Domain Name: 'myWebSite.com'
- `[Create]`
- Copy 1-by-1 NS nameservers: `Include >...bob '.'`

NameCheap > Dashboard > click on 'myWebSite.com'
- In `> NAMESERVERS`
- `Custom DNS` dropdown
- Paste 1-by-1 all the ns-...
- Click green `✔`

AWS > S3
- `[+ Create bucket]`
- Bucket Name: 'myWebSite.com'
- `[Next]` > `[Next]` > `[Next]` > `[Create bucket]` >
- Click newly Created Bucket > `myWebSite.com`
  - `[ ^ Uplaod]` Drag and Drop your Code!
  - `[Next]` > `[Next]` > `[Next]` > `[Upload]` >
- Click the `Permissions` tab & click -> `Bucket Policy]`
    - Paste with your website!
    ```JSON
      {
        "Version":"2012-10-17",
        "Statement":[{
      	"Sid":"PublicReadGetObject",
              "Effect":"Allow",
      	  "Principal": "*",
            "Action":["s3:GetObject"],
            "Resource":["arn:aws:s3:::myWebSite.com/*"
            ]
          }
        ]
      }
    ```
    - Click-> `[Save]`
- Click the `Properties` Tag,
  - click-> the `{Static Website Hosting}` box.
  - index document: 'index.html'
  - Click-> `[Save]`

AWS > Route 53
- click —> `[Create Record Set]`
- leave name: blank and click alias: `[X]` YES
- ...(refresh/wait)...
- In the Alias Target: select your bucket from the dropdown (refresh/wait)

### Adding www.
AWS > S3 > `[+ Create bucket]`
- Bucket name: 'www.myWebSite.com' > `[Next]`x3 > `[Create bucket]`
- Click `www.lonejs.tech` > `properties` > `{Static Website Hosting}`
- `[X]` "Redirect requests" this time and save.
- target bucket or domain: 'myWebSite.com'

AWS > Route53
- `| Hosted Zones <` > `[Create Hosted Zone]`
  - Domain Name: 'www.myWebSite.com'
  - `[Create]`
  - Copy 1-by-1 NS from NON-www > nameservers: `!Include ending '.'`
  - Click `Save Record Set`
  - `[Create Record Set]` > Alise: `[X]` Yes > 'wwww.myWebSite.com'
  - `[Create]`
- BACK to NON-www zone...
  - `[Create Record Set]`
  - Name > `[   www.]myWebSite.com'`
  - Alise: `[X]` Yes >
  - `[Create]`
