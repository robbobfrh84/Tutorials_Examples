spa.page.home = (META)=>{
  spa.component.navbar({preserve: true, id: "navBar"})

  spa.buildPage(META).innerHTML = `
    <div class="navPage-container">
      <div id="main" class="navPage">
        <h3> ⭐ Home ⭐ </h3>
        <hr>
        This is styled by home's css
      </div>
    </div>
  `

  spa.component.footer({preserve: true, id: "footer"})
}
