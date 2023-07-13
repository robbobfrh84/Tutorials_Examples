spa.page.two = (META)=>{
  spa.component.navbar({preserve: true, id: "navBar"})

  spa.buildPage(META).innerHTML += `
    <div id='main' class='navPage'>
      <h3> Page Two </h3>
    </div>
  `

  spa.component.footer({preserve: true, id: "footer"})
}
