//Entrie window Key events! this example uses two keys at once us ASCII for most keys pressed!
document.onkeydown = function(event) {
    event = event || window.event
    if (event.ctrlKey && event.keyCode === 77) {
        exampleFunction()
        alert('you pressed CNTL+m')
    }
}
