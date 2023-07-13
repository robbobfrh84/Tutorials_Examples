spa.component.navbar = (META)=>{

  spa.buildComponent(META).innerHTML += `
    <nav id="navBar">
      <div id="navBar-body">
        <button class='navBtn navBtn-active' onClick="spa.buildPage('home')">
          home
        </button>
        <div class='float-right'> Menu:
          <button class='navBtn' onClick="spa.setPage('two')"> two </button>
          <button class='navBtn' onClick="spa.setPage('three')"> three </button>
          <button class='navBtn' onClick="spa.setPage('full')"> full </button>
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
  //
  // for (const button of document.querySelectorAll(META.parent+" .navBtn")) {
  //   button.onclick = function(event){
  //     spa.setPage(this.name)
  //     set_page_to_nav(this)
  //   }
  // }

  set_page_to_nav()

}
