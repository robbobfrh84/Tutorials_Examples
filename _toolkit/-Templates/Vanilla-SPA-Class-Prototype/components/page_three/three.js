SPA.prototype.three = {

  getDogs: function(){
    fetch("https://dog.ceo/api/breeds/list")
       .then( res => res.json())
       .then( data => this._update({dogs: data.message}))
       .catch( err => console.log("oops, looks like we got an error: ", err))
       .finally( ()=> console.log("finally, This function always runs..."))
  },

  html: function(){
    if (!this._data.dogs) this._data.dogs = []
    return /*html*/`
      <div id="three">

        <div>${this.spa._component('navbar')}</div>
        🐕 PAGE THREE 🐕
        <br><br>

        <button thisClick="getDogs()"> Get Dogs API </button>

        ${
          this._data.dogs.map( (dog, i) => /*html*/`

              <div> ${dog} ${"🐕 x "+i+1} </div>

          `).join('')
        }

      </div>
    `
  }

}
