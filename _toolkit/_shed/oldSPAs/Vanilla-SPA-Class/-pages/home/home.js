spa.page.home = (META)=>{
  spa.component.navbar({preserve: true, id: "navBar"})

  spa.buildPage(META).innerHTML += `
    <div id='main' class='navPage'>
      <div>
        <h3> Home Page </h3>
      </div>
    </div>
  `

  spa.component.footer({preserve: true, id: "footer"})
}
