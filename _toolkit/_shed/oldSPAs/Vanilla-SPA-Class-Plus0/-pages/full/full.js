spa.page.full = (META)=>{
  META.fullPage = true
  spa.buildPage(META).innerHTML += `
    <div id='full'>
      <h3 class='title'> FULL PAGE </h3>
      <button onclick="window.history.back()">back</button>
    </div>
  `
}
