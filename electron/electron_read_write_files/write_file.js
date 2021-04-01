function writeFile(filename, name, number) {
  if (!fs.existsSync(filename)) {
    fs.writeFile(filename, '', (err) => {
       if (err) { console.log(err) }
    })
  }
  return fs.appendFileSync(filename, name + ',' + number + '\n')
}
