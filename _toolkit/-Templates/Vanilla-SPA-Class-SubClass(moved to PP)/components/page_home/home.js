class Home extends SPA {

  html(){
    return /*html*/`
      <div id="home">
        <div>${this._component('Navbar')}</div>
        🏠 HOME PAGE 🏠
        <div> HomePage Message: ${this._data.message || ""} </div>
      </div>
    `
  }

}
