main = ()=>{

  const fs = require("pn/fs")
  const svg2png = require("svg2png")


// SLOWER! > However, It'll log each converstion and populate in dir 1-by-1
  // fs.readdir("svg", (err, files)=>{
  //   files.shift(files)
  //   next(files)
  // });
  // next = (files)=>{
  //   if (files.length) {
  //     const name = files[0].split('.svg')[0]
  //     fs.readFile('svg/'+files[0])
  //       .then(svg2png)
  //       .then(buffer => fs.writeFile("png/"+name+".png", buffer, ()=>{
  //         console.log('Converted '+name+'.svg to '+name+'.png...')
  //         files.shift(files)
  //         next(files)
  //       }))
  //       .catch(e => console.error(e));
  //   }
  // }

// FASTER! > Bulk Dump!
  fs.readdir("svgName256", (err, files)=>{
    if (err) throw err
    files.map( f => {
      const name = f.split('.svg')[0]
      fs.readFile('svgName256/'+f)
        .then(svg2png)
        .then(buffer => fs.writeFile("pngName256/"+name+".png", buffer, ()=>{
          console.log('Converted '+name+'.svg to '+name+'.png...')
        }))
        .catch(e => console.error(e));
    })
  });

// SINGLE FILE
  // fs.readFile("svg/aqua.svg")
  //   .then(svg2png)
  //   .then(buffer => fs.writeFile("test2.png", buffer))
  //   .catch(e => console.error(e));

}

main()
