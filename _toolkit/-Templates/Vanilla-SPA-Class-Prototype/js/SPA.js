class SPA {

  constructor() {
    this._body = document.getElementById('spaBody')
    this._render = []
    this._data = {}
  }

  _start({landingPage}) {
    this._landingPage = landingPage
    this._currentPage = landingPage
    window.addEventListener("hashchange", ()=>{
      let hash = window.location.hash.split("#")[1] || this._landingPage
      if (hash === this._landingPage) { history.replaceState(null, null, " ")
      } else { window.location.hash = '#'+hash }
      this._currentPage = hash
      this._go(hash)
    })
    this._go(window.location.hash.split("#")[1])
  }

  _go(page) {
    this._currentPage = page || this._currentPage
    this._body.innerHTML = this._component(this._currentPage)
    this._render_components()
  }

  _component(comp) {
    this._render.unshift(comp)
    this[comp].spa = this
    this[comp]._update = this._update.bind(this)
    this[comp]._component = this._component.bind(this)
    this[comp]._data = this._data
    return `<comp-${comp}>${this[comp].html.apply(this[comp])}</comp-${comp}>`
  }

  _update(data) {
    for (const key in data) {
      this._data[key] = data[key]
    }
    this._go()
  }

  _render_components() {
    while (this._render.length > 0) {
      const comp = this._render.shift()
      const elm = document.getElementsByTagName("comp-"+comp)[0]
      this._thisClick(comp, elm, 'thisClick')
    }
    this._spaPage('spaPage')
  }

  _spaPage(attr) {
    document.querySelectorAll('['+attr+']').forEach((elm)=>{
      const str = elm.getAttribute(attr).split(/\(|\)|'|"| |,/).filter(i=>i)
      elm.addEventListener('click', ()=> window.location.hash = str )
    })
  }

  _thisClick(comp, elms, listener){
    elms.querySelectorAll('['+listener+']').forEach((elm)=>{
      const str = elm.getAttribute(listener).split(/\(|\)|'|"| |,/).filter(i=>i)
      const func = str.shift()
      elm.addEventListener('click', ()=>{
        try { this[comp][func].apply(this[comp], this._args(str)) }
        catch(err) {
          if (err.message !== "Cannot read property 'apply' of undefined"){throw(err)}
        }
      })
    })
  }

  _args(str){
    return str.map(arg=>{
      if (arg === "false") arg = false
      else if(arg === "true") arg = true
      return parseInt(arg) || arg.toString()
    })
  }
}
