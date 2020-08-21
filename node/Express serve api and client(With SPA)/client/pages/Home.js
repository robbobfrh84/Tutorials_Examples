class Home {

  _html() {

    let page = window.location.pathname

    return /*html*/`
      <section id="home">

        <h3>${this._data.message}</h3>
        <h3>${page}</h3>

        <a href="/"> home </a> <br>
        <a href="/page2"> page2 </a> <br>
        <a href="/page3"> page3 </a> <br>

        <br>

        <button spa="click=api"> API GET </button>

        <br><br>

        <textArea id="apiResponse" rows="10"></textArea>

      </section>
    `
  }

  api(page) {

    fetch("/api")
      .then( res => res.json()) // res.text()
      .then( data => {
        console.log('data', data)
        apiResponse.innerHTML = JSON.stringify(data, null, 2)
      })

    if (page === "" ) { return "" }
    return /*html*/`
      <div class="home_homeLink">
        <a href="/"> home </a>
      </div>
    `
  }

}
