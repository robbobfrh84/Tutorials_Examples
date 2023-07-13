window.onload = ()=>{
  let setPage = window.location.hash
  setPage = setPage.split('#')[1]
  setPage ? _page(setPage) : _page("home")
  _set_year_to_footer(document.getElementById('my-custom-footer'))
}

_set_year_to_footer = (footer)=>{
  const year = new Date
  footer.innerHTML = /*html*/`
    <div> &copy; ${year.getFullYear()} Bob Main </div>
  `
}
