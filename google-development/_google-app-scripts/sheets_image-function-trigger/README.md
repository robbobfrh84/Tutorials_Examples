##  Trigger a Google Apps Script Function with a Image
Let's import an image into a google sheet and make it a button! And, when clicked, it will execute a Google Apps Script function.

### Import the Image
- Start by creating a new [google.sheets.com]() **sheet**.
- Click the **insert** tab, and select **Image** > **Image over cells**.
- Right+Click the image and normal-click the **horizontal ellipse︙**.
- Select > **Assign Script**.
- Input your function name, we'll use "special_function".

### Create the function
- Click the **Tools** and select **< > Script editor**
- In the new window, create your function & save (no need to deploy).
- Example:
  ```javascript
  function testy() {
    const cellA1 = SpreadsheetApp.getActiveSheet().setRange("A1")
    cellA1.setRange("...oh, HI!")
  }
  ```

### Authorize
Back in the sheet, clicking image the first time will ask for authorization. Don't be deterred, it's your app 😉.
- Log in, click _advanced_ and continue to _unsafe_.

### That's it! Click the image and see the action! Sky is the limit!
For more examples, copy the following sheet and open the **Script Editor** to see some other small.
- Link: https://docs.google.com/spreadsheets/d/1roA0oi6djVpbMxe8G-IV2e6CgWrlPrufyihtXLss_pA/edit?usp=sharing

### Questions?
- See 👉 [example tweet & discussion](https://twitter.com/BobMain49/status/1430339003803488256). And, feel free to reach out to **here** or **@bobmain49** on twitter.


----
## Additional Info

### Pass Arguments into the function added to an image
Sorry, unlike executing functions within the App Scripts code, we can't pass arguments when adding functions to images. However... 👇

##### Workaround
We can make a _relay_ functions that passes the argument we want. In the following example, we want the button to execute the function `special_function` with an argument of 4. The **workaround** is to make a function that dose that for us. So, by using `special_function4`, we pass the argument we want.
```javascript
function special_function(number) {
  console.log("This will do really cool things with "+number)
}

function special_function4() {
  special_function4(4)
}
```
