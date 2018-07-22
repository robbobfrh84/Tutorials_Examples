window.onload = ()=>{
  let setPage = window.location.hash
  setPage = setPage.split('#')[1]
  if (setPage) _page(setPage)
}
