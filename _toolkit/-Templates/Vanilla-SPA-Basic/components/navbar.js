((page = document.getElementById('navbar'))=>{
  page.innerHTML = `
    <button class='home_menu' onclick='_page("home")'> Home </button>
    <div class='float-right'> Menu:
      <button class='home_menu' onclick='_page("two")'> Page 2 </button>
      <button class='home_menu' onclick='_page("three")'> Page 3 </button>
      <button class='home_menu' onclick='_page("full")'> Full </button>
    </div>
    <hr>
  `
})();
