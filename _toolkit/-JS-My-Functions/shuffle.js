//shuffle an array
function shuffle(o){
    for(var j,x,i = o.length; i; j=Math.floor(Math.random()*i), x=o[--i], o[i] = o[j], o[j] = x);
    return o;
}
y = shuffle([2,3,4,5,6,7,8,9,"j","q","k","a"]);
