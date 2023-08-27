window.onload = ()=>{

  for (const number of document.querySelectorAll('.number')) {
    number.onclick = function(){
      if (result.textContent) clear.onclick()
      var num = oper.textContent ? num2 : num1
      num.textContent = num.textContent + this.value
    }
  }

  for (const operator of document.querySelectorAll('.operator')) {
    operator.onclick = function(){
      oper.textContent = this.value
      if (result.textContent) equal.onclick()
    }
  }

  equal.onclick = ()=>{
    var int1 = parseInt(num1.textContent)
    var int2 = parseInt(num2.textContent)
    switch(oper.textContent) {
      case '+': equals = int1 + int2; break
      case '-': equals = int1 - int2; break
      case 'x': equals = int1 * int2; break
      case '%': equals = int1 / int2; break
      case '^': equals = Math.pow(int1, int2); break
      default: equals = "Error"
    }
    result.textContent = equals
  }

  clear.onclick = ()=>{
    [num1,num2,oper,result].map( e => e.textContent = "")
  }

}
