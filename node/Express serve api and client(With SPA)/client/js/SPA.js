class SPA {

  constructor(params) {
    if (params) {
      Object.assign(this, params)
      this._body = document.getElementById('spaBody')
      this._render = []
      this._activeBuild = false
      this._previousPage = false
      this._htmlLoaded = []
      if (!this._hold) this._start()
    }
  }

  _start() {
    for (const key in this._components) {
      this[key] = this._components[key]
      this[key]._componentName = key
      this[key]._component = this._component.bind(this) // We need to add the _componet method and bind 'this' to it because we're accessting the spa scope to then call the function being nested
      this[key]._update = this._update.bind(this)
      this[key]._page = this._page.bind(this)
      this[key]._updateElm = this._updateElm.bind(this)
      this[key]._landingPage = this._landingPage
      this[key]._activePage = ()=>this._currentPage
      this[key]._previousPage = ()=>this._previousPage
      this[key]._data = this._data
      this[key]._go = this._go.bind(this)
    }
    window.addEventListener("hashchange", ()=>{
      this._page(window.location.hash.split("#")[1])
    })
    this._page(window.location.hash.split("#")[1])
  }

  _page(page) {
    this._htmlLoaded = []
    this._previousPage = this._currentPage
    let hash = page || this._landingPage
    if (hash === this._landingPage) { history.replaceState(null, null, " ")
    } else { window.location.hash = '#'+hash }
    this._currentPage = hash
    this._go(hash)
    this._htmlLoaded.forEach(h=>h())
  }

  _go(page) {
    if (this._activeBuild) {
      this._activeBuild = page // 👀 see 👇 that notes
    } else {
      this._activeBuild = page // this has to happen here because the nesting doesn't finish before we could set it outside
      this._currentPage = page || this._currentPage || this._landingPage
      this._body.innerHTML = this._component(this._currentPage)
      this._renderComponents()
      const redirectPage = this._activeBuild
      this._activeBuild = false
      if (redirectPage !== page) {
        this._go(redirectPage)
      }
    }
  }

  _component(componentName, args) {
    this._render.unshift(componentName)
    const content = this[componentName]._html(args)
    if (this[componentName]._htmlLoaded) {
      this._htmlLoaded.push(this[componentName]._htmlLoaded.bind(this[componentName]))
    }
    return /*html*/`
      <component-${componentName}> ${content} </component-${componentName}>
    `
  }

  _update(data) {
    for (const key in data) {
      this._data[key] = data[key]
    }
    this._go()
  }

  _renderComponents() {
    while (this._render.length > 0) {
      const comp = this._render.shift()
      const elms = document.getElementsByTagName("component-"+comp)
      const arrElms = [... elms]
      arrElms.forEach( elm => this._spaEvent(comp, elm))
    }
    this._spaPage('spaPage')
  }

  _spaPage(attr) {
    document.querySelectorAll('['+attr+']').forEach((elm)=>{
      const str = elm.getAttribute(attr).split(/\(|\)|'|"| |,/).filter(i=>i)
      elm.addEventListener('click', ()=> window.location.hash = str )
    })
  }

  _spaEvent(comp, elms) {
    elms.querySelectorAll('[spa]').forEach((elm)=>{
      const events = elm.getAttribute("spa").split("&&")
      for (let evt of events) {
        evt = evt.trim()
        evt = evt.split(" ").join("")
        let [ htmlEvent, str ] = evt.split("=")
        str = str.split(/\(|\)|'|"| |\n|,/).filter(i=>i)
        const method = str.shift()
        elm.addEventListener(htmlEvent, ()=>{
          this[comp][method].apply(this[comp], this._args(str))
        })
      }
      elm.removeAttribute("spa")

    })
  }

  _updateElm(elm, html) {
    elm.innerHTML = html
    this._spaEvent(this._currentPage, elm)
  }

  _args(str){
    return str.map(arg=>{
      if (arg === "false") return false
      else if (arg === "true") return true
      return parseInt(arg) || arg.toString()
    })
  }

}
