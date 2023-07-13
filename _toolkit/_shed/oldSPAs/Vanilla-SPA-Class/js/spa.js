class Single_Page_Application {

  constructor() {
    this.page = {},
    this.component = {},
    this.rebuildPage = true
  }

  start(params) {
    this.newDiv(document.body, 'spaBody')
    this.newDiv(document.body, 'spaFullBody')
    this.onload = true
    let setPage = window.location.hash.split('#')[1]
    window.location.hash = ''
    setPage ? this.setPage(setPage) : this.setPage(params.landingPage, true)
  }

  setPage(page, onload)  {
    this.currentPage = page
    window.location.hash = '#'+page
    if (onload) this.page[page]({ id: page, parent: ".spa-css-"+page })
  }

  hashChange(event) {
    const page = window.location.hash.split('#')[1]
    if (window.location.hash !== '#'+this.currentPage) {
      this.currentPage = window.location.hash.split('#')[1]
    }
    if (!this.onload) {
      const cp = this.currentPage
      this.page[cp]({ id: page, parent: ".spa-css-"+cp })
    }
    this.onload = false
  }

  buildPage(params) {
    const sfullB = document.getElementById('spaFullBody')
    const sBody = document.getElementById('spaBody')
    if (params.fullPage) {
      while (sfullB.hasChildNodes()) { sfullB.removeChild(sfullB.lastChild) }
      return this.setSwapPage(params, spaFullBody)
    } else {
      let ap = document.getElementById('activePage')
      if (ap) { while (ap.hasChildNodes()) { ap.removeChild(ap.lastChild) } }
      else { ap = this.newDiv(sBody, 'activePage') }
      return this.setSwapPage(params, ap)
    }
  }

  setSwapPage(params, page) {
    this.classSwap(params, page)
    spaFullBody.style.display = params.fullPage ? '' : 'none'
    spaBody.style.display = params.fullPage ? 'none' : ''
    return page
  }

  buildComponent(params) {
    params.parent = '.spa-css-'+params.id
    if (params.preserve && document.getElementById(params.id)) {
      return false
    } else {
      const spaBody = document.getElementById('spaBody')
      const component = document.createElement('div')
      if (params.preserve) component.id = params.id
      params.className = 'spa-css-'+params.id
      component.classList.add(params.className)
      spaBody.appendChild(component)
      return component
    }
  }

  localizeCss() {
    for (const sheet of document.styleSheets) {
      if (sheet.href.split('-components').length > 1
      || sheet.href.split('-pages').length > 1) {
        let id = sheet.href.split('/').pop();
        const len = sheet.cssRules.length
        for (var i = 0; i < len; i++) {
          const rule = sheet.cssRules[i].cssText
          sheet.deleteRule(i)
          sheet.insertRule('.'+'spa-css-'+id.split('.css')[0]+' '+rule, i);
        }
      }
    }
  }

  classSwap(params, activePage) {
    params.className = 'spa-css-'+params.id
    activePage.classList.add(params.className)
    activePage.classList.remove('spa-css-'+this.previousCss)
    this.previousCss = params.id
  }

  newDiv(parent, id) {
    const newElm = document.createElement('div')
    newElm.id = id
    parent.appendChild(newElm)
    return newElm
  }

}
