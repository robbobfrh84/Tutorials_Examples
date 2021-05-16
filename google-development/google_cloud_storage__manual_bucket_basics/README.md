### The skinny
The below guide steps you through the process, but here's "the skinny" for what I was really after.
- Create Project: https://console.cloud.google.com/projectselector2
  - Go To Storage: https://console.cloud.google.com/storage/
- Enable Billing
- Create Bucket
- Enable allUser permission: *Select Bucket* > *Permissoins* tab
  - Select "[+] Add" Button
  - In "New Members" input, Type "allUsers" and select
  - In "Select a Role" Dropdown, find "Cloud Storage" > "Storage Object View"
- Create Folder upload files etc... etc...
- `*`: See Example links for api urls for client side work.

### Video
I needed to convert `.mkv` files to `.mp4` with `h.264` codec
- "Avidemux": Software Used: https://www.videohelp.com/software/AviDemux
- I downloaded a rick and morty episode that was `.mkv`
- I opened the file and set
  - Set **Video Output** to "Mpeg4 AVC (x264)"
  - Set **Audio Output** to "Copy"
  - Set **Output Format** "MKV Muxer"
- Then, uploaded the new `.mkv` video to the google bucket. 

My Example Project Links (maybe removed to clear up space):
- Project: https://console.cloud.google.com/getting-started?project=cloud-storage-basics
- Storage: https://console.cloud.google.com/storage/browser?project=cloud-storage-basics&prefix=
- Example bob8x8.png url: https://storage.googleapis.com/bobs_example_bucket1/test_folder_1/bob8x8.png

- Example object.json url (different then JS fetch url): https://storage.googleapis.com/bobs_example_bucket1/object.json
- Example download .json url (Works in JS fetch): https://storage.googleapis.com/storage/v1/b/bobs_example_bucket1/o/object.json?alt=media


- Example download .json url EMBEDED folder (Works in JS fetch): https://storage.googleapis.com/storage/v1/b/bobs_example_bucket1/o/test_folder_1%2Fdemo.json?alt=media

---
# Setting up a basic Google Cloud Storage bucket: up/download files

Guide QuickStart LINK: https://cloud.google.com/storage/docs/quickstart-console
Guide JSON API: https://cloud.google.com/storage/docs/json_api

### Setup
- Visit: https://console.cloud.google.com/projectselector2
  - {Create Project} > Project Name: "Cloud Storage Basics"

- After Creating the project, find {GO TO CLOUD STORAGE}
  - Or, link: https://console.cloud.google.com/storage/
  - Select "ENABLE BILLING"
    - NOTE: I had to remove billing from an old demo project (max 6). It didn't give me an error just would "hang" when selecting enable billing.
  - [+] Create Bucket
    - Bucket I created Link: https://console.cloud.google.com/storage/browser/bobs_example_bucket1

- Yep... just a file system.
- See guide link for editing permissions. Need to do it at bucket level first.

### Adding some stuff

- I added the `bob8x8.png` image & uploaded
  - Link: https://storage.googleapis.com/bobs_example_bucket1/test_folder_1/bob8x8.png
- I added the `index.html` file to open the image.
- I added the `demo.json` and works as .json! huray!
  - Link: https://storage.googleapis.com/bobs_example_bucket1/test_folder_1/demo.json
  - NOTE: *fetching* the data in JS gets cors errors, we need a different link through the JSON API, so let's see how to get that/where it comes from...

### Setting up Google Cloud Storage JSON API
- Once a bucket it created the API should be on by default
  - Confirm here...: https://console.cloud.google.com/apis/library/storage-api.googleapis.com
- Overview quick start link: https://cloud.google.com/storage/docs/json_api
- SO, there's a ton more you can do with the url in and the api, but this will give you base level overview of an object in the bucket, link: https://storage.googleapis.com/storage/v1/b/bobs_example_bucket1/o/object.json

### Solving for fetch
After visiting the JSON API link: https://storage.googleapis.com/storage/v1/b/bobs_example_bucket1/o/object.json I clicked the "mediaLink" on the response json in the browser, it game me a chance to download the .json file. So, then i just used that url in the *fetch* in the index.html and it work great!
- Link (NOTE: it'll take you to a download if you copy paste in a browser, but acts the same as a normal .json fetch to get data...): https://storage.googleapis.com/download/storage/v1/b/bobs_example_bucket1/o/object.json?generation=1620247624032084&alt=media
- I also noticed that simply https://storage.googleapis.com/storage/v1/b/bobs_example_bucket1/o/object.json?alt=media does the same.

And finally, here's an example .json url that's nexted in a folder that you can get in fetch
- https://storage.googleapis.com/storage/v1/b/bobs_example_bucket1/o/test_folder_1%2Fdemo.json?alt=media
