## "Catching" specific cell input values with Google Apps Script
Here's how you can create a Google Apps Script to do specific operation when certain words are entered into any cell, aka "magic words".

### Create the function
- In a google sheet, click the **Tools** tab and select **< > Script editor**
- This simple example will turn any cell's background color orange, if "orange" is entered into the cell.
```javascript
function onEdit(e) {
  const cell_input = e.range.getValue()
  if (cell_input == "orange") {
    e.range.setBackground("orange")
  }
}
```
- Paste the code into your text area and save(no need to deploy).
- Then, click back over to your sheet and give it a try!

### Examples
- For more examples, see `code.js` in this folder. Careful, only 1 `onEdit` function can be used in the code at a time. More than one will over-ride the previous.
- Also, you can copy the following [google sheet](https://docs.google.com/spreadsheets/d/1tvy9rdwnP61W2dq4NgyWc5OhbNOIiX8AElDoGTmgtfQ/edit#gid=0) to test without creating your own.

### Questions?
- See 👉 [example tweet & discussion](< TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨TO DO 🚨>). And, feel free to reach out to **here** or **@bobmain49** on twitter.
