spa.page.two = (META)=>{

  // spa.component.navbar({preserve: true, id: "navBar"})

  spa.buildPage(META).innerHTML = `
    <div class="navPage-container">
    ${spa.buildPage({preserve: true, id: "navBar"})}
      <div id="two" class="navPage">
        <h3> Page Two </h3>
        This is styled by two's css
        <hr><br><hr><br><hr><br><hr><br><hr><br><hr><br>
        <hr><br><hr><br><hr><br><hr><br><hr><br><hr><br>
      </div>
    </div>
  `

  spa.component.footer({preserve: true, id: "footer"})
}
