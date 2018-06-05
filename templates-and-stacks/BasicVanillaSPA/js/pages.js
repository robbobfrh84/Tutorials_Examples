_oldPage = 'page_landing'
page = (page)=>{
  console.log('Swap Page to', page)
  var newPage = document.getElementById(page)
  document.getElementById(_oldPage).style.display = 'none'
  newPage.style.display = 'block'
  window.location.hash = '#'+page
  _oldPage = page
}
