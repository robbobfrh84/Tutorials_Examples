class Navbar extends SPA {

  localFunc(str, num, bool) {
    console.log("Local Function, param:", str, num+2, !!bool)
    this.count("Hi func2")
  }

  count(message) {
    if (!this._data.count) this._data.count = 0
    this._update({message, count: ++this._data.count})
    console.log("this :", this)
  }

  hover(string, count) {
    console.log('ok hover stuff here!')
    this._update({emoji: Array(count+1).join(string)})
  }

  html() {
    return /*html*/`
      <nav id="navbar">
        <button spaPage="Home">    home    </button>
        - - - - Menu:
        <button spaPage="Two">    two     </button>
        <button spaPage="Three">  three   </button>
        <button spaPage="Full">   full    </button>

        <br>
          ${this._data.count || ""}
          ${this._data.emoji || ""}
         <br>

        <button spa="click=localFunc('text', 9, false)"> Local Function </button>
        <button onClick="_global_function('🤓')"> Global Function </button>
        <span spa='mouseover=hover("🤓", 4)'> ! Hover ! <span>
      </nav>
    `
  }

}

function _global_function(emoji){
  alert(
    "Global Functions work as normal, "+
    "but won't automatically update components. "+
    "See Local function example for data flow "+emoji
  )
}
