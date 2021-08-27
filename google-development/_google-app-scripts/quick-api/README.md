# A Giphy Tutorial
See: .gif and tweet.md for guide...

### Google Script Example: https://script.google.com/d/1VSjJyQNLu3pnCjUfsOrPMfsiaNaDEHOAdcoTMjgpT868sCMjufrlBxS4/edit?splash=yes
- Example API Query Example: https://script.google.com/macros/s/AKfycbx1F-IPKseQKKJyfkBpNWxBH-y3eR-DIEUkpLNw6a1iyYM3ySs/exec?r=23

### And, here's the copy/paste code again...
```javascript
function doGet(e) {
  const pie = JSON.stringify({
    pie: Math.PI,
    radius: parseInt(e.parameter.r),
    circumference: (e.parameter.r * Math.PI) * 2
  })
  return ContentService.createTextOutput(pie).setMimeType(ContentService.MimeType.JSON)
}
```

# Questions?
- See 👉 [example tweet & discussion](https://twitter.com/BobMain49/status/1139630372382228481). And, feel free to reach out to **here** or **@bobmain49** on twitter.
