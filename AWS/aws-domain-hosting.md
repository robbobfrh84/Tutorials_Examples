# AWS domain hosted perched from nameCheap

### namecheap.com
- Go to namecheap.com, log in, search for name, buy it.
- In the side-navbar select `Dashboard`
- Find your domain and select `[Manage]`
- keep this page **open** as you will return back soon...

### aws.amazon.com
Create a Hosted zone
- @`aws.amazone.com` and click `[Sign In to the Console]`
- Under the `All services` dropdown, find `Networking & Content Delivery` and  click-> `Route 53`
- Click -> `Hosted zones` on the left nav
- Click -> `[Create Hosted Zone]`

In the right pane titled, `Create Hosted Zone`
- Paste the Source URL: … *whatever.com*
  - **Important!:** You're just pasting the domain name and the top-level domain name. In the example above, ".com" is the top-level domain name. When combined with "whatever", it is called the second-level domain name.
- You can leave the `Comment:` section empty, but make sure `Public Hosted Zone` is slelcted as the `Type`.
- Click -> [Create]

Add Name Servers
- On the left-navbar click `Hosted Zone`
- Click-> the domain name you’ve just added … whatever.com
- Toggle `[ ]` (or just click) in the row that has the `Type` NS…
- Copy all the NS (name servers) inside the Value input box. For Example... (DO NOT emit last '.')
  - `ns-1949.awsdns-51.co.uk.`
  - `ns-936.awsdns-53.net.`
  - `ns-1399.awsdns-46.org.`
  - `ns-199.awsdns-24.com.`
- **NOTE:** Those are **Not** the same NS code you need, get your own!

### Back to > namecheap.com

Add Name servers to namecheap
- Now, from where we left off before, with our `Domain > Details` page open...
- Find the  `NAMESERVERS` section and click `Namecheap BasicDNS` and change `Custom DNS`.
- Paste all the NS you got from AWS in the same order 1-by-1. You may need to click the `+` button to add a couple more fields.
- Find the green `✔` button to save changes.


### Back to AWS
Go back to the AWS console page by clicking the `aws` icon in the upper-left.
- Under the `All services` dropdown, find `Storage` and  click-> `S3`
- Click-> `[create a new bucket]`,
- **!IMPORTANT:** Name it your website name i.e. example.com
- Select the `Region` closest to your location.
- Leave `Copy Settings from an existing bucket` empty.
- Click-> `[Next]`
- Leave Set Properties default. Click-> `[Next]`.
- Leave Set Permissions default.Click-> `[Next]`.
- Click-> `[Create Bucket]`

Add your content code.
- Find your newly created bucket and select it.
- Click the blue `[ ^ Upload]` button.
- If your project is in .zip format, you can select `[Add files]` and find your .zip project folder.
- However, you can just drag and drop
  - **IMPORTANT!:** Your must select **ALL** your files and folders **WITHIN** your project folder, not just the folder itself into the drag and drop area.
- Click-> `[Next]`
- Leave Set Properties default. Click-> `[Next]`.
- Leave Set Permissions default.Click-> `[Next]`.
- Click-> `[Upload]`
- Go to your new bucket (you might already be in it), click the “Permissions” tab & click -> `Bucket Policy]`
- Copy and paste this policy
  - **!IMPORTANT:** Remember to REPLACE `example.com` with your domain name.
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
- Click-> `[Save]`
- You'll get a warning that this is public, but you want people to see your site right!?

Set up as a Static Website
- Now click the `properties` tab in your bucket and click-> the `{Static Website Hosting}` box.
- toggle `[X]` "Use this bucket to host a website".
- Ddd index.html (or whatever your main .html file is named) in the `Index document` field.
- Leave the remaing field default and click-> `[Save]`

Find your way back to the route53
- In the `Hosted Zone` click the domain name you set up earlier.
- click —> `[Create Record Set]`
- You should have an empty input for name with your domain name to the right. KEEP IT empty if the domain name to the right is correct.
- Toggle Alias `[x] YES`.
- Under `Alias Target`, click the first one that pops up which *should* be your S3 bucket. **THIS CAN TAKE A FEW MINUTES**. try refreshing the page everyone minute or so and double check your domain is correct.
- Keep the other fields default.
- click-> `[Create]`

Now... go to your your domain something.com (don't use www, that fix is next) in the browser and see your website **L I V E!**
- I've done this several times and it does really show up rather fast. However, if it dosn't right away you may need to give it a few miniutes to confirm that something went wrong. ALSO, some browsers will try and force www. to override that enter your website as `http://something.com`

#### ! IMPORTANT !: You're not done... Re-routing for WWW.
The above code only works for yourwebsite.com, not www.yourwebsite.com Here's how we'll add another bucket to fix this.

In your Amazon S3 console...
- Click-> `[ + Create bucket]`
- Bucket Name = www.yourwebsite.com (Yes, must be just like that, but for you domain).
- Toggle through default settings and `[Create Bucket]`
- Select the "www." buck you just made.
- Now click the `properties` tab in your bucket and click-> the `{Static Website Hosting}` box.
- toggle `[X]` "Redirect requests" this time and save.
- for `Target bucket or domain` put the RE-Direct domain name... example.com (NO WWW) and save.

Back in “Route 53”
- Click -> `Hosted zones` on the left navbar.
- Click -> `[Create Hosted Zone]`
- Paste the domain name -> `www.whatever.com`. Make sure “Type:” is set to `Public Hosted Zone` and save.
- On the left side nav. click `Hosted Zones`
- Select the domain name you’ve just added … www.whatever.com


- Toggle `[x]` (or just click) in the row that has the “Type” NS…
- **IMPORTANT!:** Copy all the NS (name servers) from the NON-www zone
  - Past them into the value box. Similar to what you pasted into namecheap's "Custom DNS" section from before.
  - NOTE: this NEED the '.' at the end!
- Click-> `[Save Record Set]`

- Click-> `[Create Record Set]` leave "Name:" blank like before and toggle "Alias" to `[X]` Yes.
- Click the "Alias Target" input area and select the `www.example.com` with the S3 bucket url and click-> `[Create]`.

- Navagate back to your (NON-www) hosted zone example.com.
- Click-> `[Create Record Set]`
- Just type `www` into the "Name:" input field, NO spaces! you'll see how this creates `[www] example.com` in a strange way.
-  toggle "Alias" to `[X]` Yes.
- Click the "Alias Target" input area and select the `www.example.com` with the S3 bucket url and click-> `[Create]`.

This can take a few minutes!...

...Ok, so now you should be able to use both www or emit www like you would normally. good job!

#### The Internet is now Complete! ;-)

----
Resource Links:
-  http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html
