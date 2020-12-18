# Clasp Completed Walkthrough December, 2020
I redid a year(s) old walkthrough of the READMEDevelopment Guide

# Jumping back in?
If you jumping back into this guide to get a refresher of clasp development, and just wanna mess with this code...
- `cd` into this folder.
-...

# Raw Step-by-step
Step Symbols:
- '~' means maybe redundant
- '>' select / click
- '{key}' code snippit and key below

Terminal
- $`mkdir clasp_completed_walkthrough` > $`cd clasp_completed_walkthrough`
- ~ $`npm install @google/clasp -g`
- $`clasp login`
- $`clasp create Clasp_completed_walkthrough`
- > webapp
- $`clasp open`
- $`clasp pull`
- Add {A} to code.js
- $`clasp push`


# {Code} Added
- {A}
```javascript
function myFunction() {
  Logger.log("A log for you")
  return "Ok it works here"
}
```
