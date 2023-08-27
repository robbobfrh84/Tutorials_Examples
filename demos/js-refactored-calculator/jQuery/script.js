$(document).ready(function() {

  $(".number").on("click", function(){
    if ($("#result").text()) {
      $(".clear").trigger("click")
    }
    var number = $("#operator").text() ? $("#num2") : $("#num1")
    number.text(number.text()+this.value)
  })

  $(".operator").on("click", function(){
    $("#operator").text(this.value)
    if ($("#result").text()) {
      $(".equal").trigger("click")
    }
  })

  $(".equal").on("click", function(){
    var num1 = parseInt($("#num1").text())
    var num2 = parseInt($("#num2").text())
    switch($("#operator").text()) {
      case '+': equals = num1 + num2; break
      case '-': equals = num1 - num2; break
      case 'x': equals = num1 * num2; break
      case '%': equals = num1 / num2; break
      case '^': equals = Math.pow(num1, num2); break
      default: equals = "Error"
    }
    $("#result").text(equals)
  })

  $(".clear").on("click", function(){
    $("#num1, #num2, #operator, #result").empty()
  })

})
