


var a = 10

function setVariable(name, value){
    console.log("Setting ", name, value);

    return value
}

function readVariable(name, value){

    console.log("Reading ", name, value);

    return value;
}

function wrapWrite(){

}

var b = setVariable("B", readVariable("a", a) + 20)


