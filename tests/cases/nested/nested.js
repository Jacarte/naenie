

const main = function(){
    var a = 12;
    var b = 2*32 + 2;
    var d = false || true
    var e = 1 || 2  // Boolean operators

    var f = 2^5 < 23.3 == 12

    var c = a + b *129.45 - a + 100.5 + Math.random() + b + a;
}


if(typeof(module) !== 'undefined')
    module.exports = main