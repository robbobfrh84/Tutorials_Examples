### Node.js Application to Build SVGs from .json file and convert them to PNGs

The application includes two Node.js Applications

- #### `create-svg.js`
  - Run in terminal from this dir as $`node create-svg.js`.
  - Builds simple SVG files of a circle of the color for each color included in the colors.json file(141 files Colors === **141 .svgs!**) and saves them in the `/svg` folder

- #### `convert-svg2png.js`
  - Raun in terminal from this dir as $`convert-svg2png.js`.
  - Converts all svgs to pngs with size set as argument into `/png` folder

**ISSUE:** I couldn't get the resize to png to work so instead I resized the svg first.

**NOTE:** after doing this I discovered that it takes awhile for each convert. However I found that there's another module for bulk > https://www.npmjs.com/package/svg2png-many
