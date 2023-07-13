# Best Practices
Follow these guidelines to keep your Vanilla Single Page Application clear, readable and to avoid naming crossover errors.

...For better CSS reloading in terminal:
`lr-http-server -c-1`

### Developing rules
Renaming, moving or removing any of the specified files, folders, variables or methods may make the SPA not work correctly or at all.

Localized .css Files:
- For .css files to be localized, they *must* be in either `-components` or  `-pages` folders and those folders *must* sit at the root.
- Do not rename or move `-components` or `-pages`

Page's and component's `META` parameter.
- This file is find to modify, as long as the initial data is kept in place.
- Make sure and view that object locally to confirm you're not over-riding any of the build-in values that may interfere with the SPA class
