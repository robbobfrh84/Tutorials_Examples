class Three extends SPA {

  getDogs() {
    fetch("https://dog.ceo/api/breeds/list")
      .then( res => res.json())
      .then( data => this._update({dogs: data.message}))
      .catch( err => console.log("oops, looks like we got an error: ", err))
      .finally( ()=> console.log("finally, This function always runs..."))
  }

  html(data) {
    const dogs = this._data.dogs ? this._data.dogs : []
    return /*html*/`
      <div id="three">

        <div>${this._component('Navbar')}</div>
        🐕 PAGE THREE 🐕
        <br><br>

        <button spa="click=getDogs()"> Get Dogs API </button>

        ${
          dogs.map( (dog, i) => /*html*/`

              <div> ${dog} ${"🐕 x "+i+1} </div>

          `).join('')
        }

      </div>
    `
  }

}
