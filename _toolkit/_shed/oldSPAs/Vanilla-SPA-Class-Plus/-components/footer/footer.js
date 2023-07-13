spa.component.footer = (META)=>{
  const year = new Date
  spa.buildComponent(META).innerHTML += `
    <footer id="main">  &copy; ${year.getFullYear()} Bob Main  </footer>
  `
}
