SPA.prototype.two = {

  html: function(){
    return /*html*/`
      <div id="two">
        <div> ${this.spa._component('navbar')} </div>
        2️⃣ PAGE TWO 2️⃣
        <br>
        ${ this._data.dogs && this._data.dogs.length || ""}
      </div>
    `
  }

}
