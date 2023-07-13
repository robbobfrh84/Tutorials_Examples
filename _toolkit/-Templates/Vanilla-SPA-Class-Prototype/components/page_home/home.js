SPA.prototype.home = {

  html: function(){
    return /*html*/`
      <div id="home">
        <div>${this._component('navbar')}</div>
        🏠 HOME PAGE 🏠
        <div> HomePage Message: ${this._data.message || ""} </div>
      </div>
    `
  }

}
