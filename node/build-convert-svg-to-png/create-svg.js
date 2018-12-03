main = ()=>{

  const fs = require('fs')
  const colors = require('./colors.json')

  colors.map(c => {
    const fileName = c.name+'.svg'

    fs.writeFile('svgName256/'+fileName, `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="256" viewPort="0 0 256 256">
  <defs>
    <filter id="f1" x="-40%" y="-40%" height="200%" width="200%">
      <feOffset result="offOut" in="SourceAlpha" dx="8" dy="8" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="8" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
    <filter id="f2" x="0" y="0" width="200%" height="200%">
      <feDropShadow dx="5" dy="5" stdDeviation="10" flood-color="rgba(155,152,90,0.9)" flood-opacity="1" />
    </filter>
  </defs>
  <circle r="116" cx="118" cy="118" style="fill: ${c.name};" filter="url(#f1)" />
  <text rotate="8" x="210" y="225" font-family="Verdana" filter="url(#f2)" font-size="26" fill='#444'>
    <tspan> ${c.name} </tspan>
  </text>
</svg>`

// 256x256
//     fs.writeFile('svg256/'+fileName, `
// <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="256" height="256" viewPort="0 0 256 256">
//   <defs>
//     <filter id="f1" x="-40%" y="-40%" height="200%" width="200%">
//       <feOffset result="offOut" in="SourceAlpha" dx="8" dy="8" />
//       <feGaussianBlur result="blurOut" in="offOut" stdDeviation="8" />
//       <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
//     </filter>
//   </defs>
//   <circle r="116" cx="118" cy="118" style="fill: ${c.name};" filter="url(#f1)" />
// </svg>`

// 32x32
//     fs.writeFile('svg32/'+fileName, `
// <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewPort="0 0 32 32">
//   <defs>
//     <filter id="f1" x="-40%" y="-40%" height="200%" width="200%">
//       <feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />
//       <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
//       <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
//     </filter>
//   </defs>
//   <circle r="6" cx="14" cy="14" style="fill: ${c.name};" filter="url(#f1)" />
// </svg>`

    , (err, res)=>{
      if (err) throw err
      console.log('Created new file: '+c.name+'.svg')
    })
  })

}

main();
