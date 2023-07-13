spa.component.navbar = (META)=>{

  spa.buildComponent(META).innerHTML += `
    <nav id="main">
      <div id="navBar">
        <button class='navBtn navBtn-active' name="home"> Home </button>
        <div class='float-right'> Menu:
          <button class='navBtn' name="two"> Page 2 </button>
          <button class='navBtn' name="three"> Page 3 </button>
          <button class='navBtn' name="full"> Full </button>
        </div>
      </div>
    </nav>
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

}
