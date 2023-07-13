class Two extends SPA {

  html(){
    return /*html*/`
      <div id="two">
        <div> ${this._component('Navbar')} </div>
        2️⃣ PAGE TWO 2️⃣
        <br>
        ${ this._data.dogs && this._data.dogs.length || ""}
      </div>
    `
  }

}
