spa.page.three = (META)=>{
  spa.component.navbar({preserve: true, id: "navBar"})

  spa.buildPage(META).innerHTML += `
    <div class="navPage-container">
      <div id="three" class="navPage">
        <h3 class='title'> Page Three </h3>
        This is styled by three's css
        <hr>
        <button id='home-btn' class='navBtn navBtn-active' name="home"> Home </button>
        <div>
          <button class='navBtn' name="two"> Page 2 </button>
          <button class='navBtn' name="three"> Page 3 </button>
          <button class='navBtn' name="full"> Full </button>
        </div>
      </div>
    </div>
  `

  set_page_to_nav = ()=>{
    for (const btn of document.querySelectorAll(META.parent+" .navBtn")) {
      btn.classList.remove('navBtn-active')
      if (btn.name === spa.currentPage) {
        btn.classList.add('navBtn-active')
      }
    }
  }

  for (const button of document.querySelectorAll(META.parent+" .navBtn")) {
    button.onclick = function(event){
      spa.setPage(this.name)
      set_page_to_nav(this)
    }
  }

  set_page_to_nav()

  spa.component.footer({preserve: true, id: "footer"})
}
