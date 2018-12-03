main = ()=>{

  const fs = require('fs')
  fs.readdir("test", (err, files)=>{
    if (err) throw err
    files.map( f => {
      console.log(f)
      // const n = f.split('.jpg')[0]
      // if (n >= 45 && n <= 48) {
      //   console.log(f)
      //   fs.rename('test/'+f, 'remove/'+f, (err) => {
      //     if (err) throw err;
      //     console.log('Rename complete!');
      //   });
      // }

    })
  });

}

main();
