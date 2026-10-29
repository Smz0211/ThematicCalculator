var operacao = "";
var res = 0;

function adicionar(ctd){
    if(ctd === "."){
        var ultimochar = document.getElementById("txtBox").value.split(/[+\-×÷()]/).pop();
        if(!ultimochar.includes(".")){
            if(document.getElementById("txtBox").value === "")
                document.getElementById("txtBox").value += "0.";
            else
                document.getElementById("txtBox").value += ctd;
        }
    }
    else if(ctd === "+" || ctd === "-" || ctd === "√(" || ctd === "∛("){
        var ultimochar = document.getElementById("txtBox").value.split(/[0123456789]/).pop();
        if(![".","+","-","÷","×","^","√", "∛"].includes(ultimochar)){
            document.getElementById("txtBox").value += ctd;
        }
    }
    else if(ctd === "^(" || ctd === "÷" || ctd === "×"){
        var ultimochar = document.getElementById("txtBox").value.slice(-1);
        if(document.getElementById("txtBox").value !== "" && ![".","+","-","÷","×","^","√", "∛", "("].includes(ultimochar)){
            document.getElementById("txtBox").value += ctd;
        }
    }
    else{
        document.getElementById("txtBox").value += ctd;
    }
}

function limpar(){
    document.getElementById("txtBox").value = "";
}
function igual() {
    let calculo = document.getElementById("txtBox").value;

    const mapa = {
        "arcsinh": "Math.asinh",
        "arccosh": "Math.acosh",
        "arctanh": "Math.atanh",

        "arcsin": "calcAsin",
        "arccos": "calcAcos",
        "arctan": "calcAtan",

        "sinh": "Math.sinh",
        "cosh": "Math.cosh",
        "tanh": "Math.tanh",

        "cosec": "calcCosec",
        "sec": "calcSec",
        "cot": "calcCot",

        "sin": "calcSin",
        "cos": "calcCos",
        "tan": "calcTan",

        "log": "Math.log10",
        "ln": "Math.log",
        "sqrt": "Math.sqrt",
        "abs": "Math.abs",

        "√": "Math.sqrt",
        "∛": "Math.cbrt",
        "÷": "/",
        "×": "*",
        "^": "**",
        "π": "Math.PI",
        "e": "Math.E",
        "%" : "*(1/100)"
    };

    const padrao =
        /arcsinh|arccosh|arctanh|arcsin|arccos|arctan|cosec|sinh|cosh|tanh|sqrt|abs|sec|cot|sin|cos|tan|log|ln|√|∛|÷|×|π|\^|%|\be\b/g;

    calculo = calculo.replace(
        padrao,
        token => mapa[token] ?? token
    );
    calculo = calculo.replace(
    /(\d+(?:\.\d+)?|\([^()]*\))!/g,
    "fatorial($1)"
);

    try {
        res = eval(calculo);
        document.getElementById("txtBox").value = res;
        console.log(calculo);
    }
    catch (erro) {
        document.getElementById("txtBox").value = "Erro";
        console.error("Expressão inválida:", calculo, erro);
    }
}

function umporx(){
    var x = parseFloat(document.getElementById("txtBox").value);
    document.getElementById("txtBox").value = 1/x;
}

function backspace(){
    document.getElementById("txtBox").value = document.getElementById("txtBox").value.slice(0,-1);
}
function trocaAngulo(){
    if(document.getElementById("btnAng").textContent === "rad" && document.getElementById("btnAngInv").textContent === "rad"){
        document.getElementById("btnAng").textContent = "deg";
        document.getElementById("btnAngInv").textContent = "deg";
    }
    else if(document.getElementById("btnAng").textContent === "deg" && document.getElementById("btnAngInv").textContent === "deg"){
        document.getElementById("btnAng").textContent = "rad";
        document.getElementById("btnAngInv").textContent = "rad"
    }
}

function convGraus(angulo){
    var tipo = document.getElementById("btnAng").textContent;
    if(tipo === "deg"){
        return angulo * Math.PI/180;
    }
    return angulo;
}

function convGrausInverso(angulo){
    var tipo = document.getElementById("btnAng").textContent;
    if(tipo === "deg"){
        return angulo * 180/Math.PI;
    }
    return angulo;
}

function calcSin(x){
    return Math.sin(convGraus(x));
}
function calcCos(x){
    return Math.cos(convGraus(x));
}
function calcTan(x){
    return Math.tan(convGraus(x));
}

function calcAsin(x){
    if(x < -1 || x > 1){
        return "invalid number";
    }
    return convGrausInverso(Math.asin(x));
}
function calcAcos(x){
    if(x < -1 || x > 1){
        return "invalid number";
    }
    return convGrausInverso(Math.acos(x));
}
function calcAtan(x){
    return convGrausInverso(Math.atan(x));
}

function calcSec(x){
    return 1/calcCos(x);
}
function calcCosec(x){
    return 1/calcSin(x);
}
function calcCot(x){
    return 1/calcTan(x);
}

function inv(){
    if(document.getElementById("matrizOpEspInv").style.display === "none"){
        document.getElementById("matrizOpEsp").style.display = "none"
        document.getElementById("matrizOpEspInv").style.display = "grid";
    }
    else if(document.getElementById("matrizOpEsp").style.display === "none"){
        document.getElementById("matrizOpEspInv").style.display = "none"
        document.getElementById("matrizOpEsp").style.display = "grid"
    }
}

function fatorial(x){
    var resultado = 1;
    if(x>0){
        for(var i = x; i>1; i--){
            resultado *= i;
        }
    return resultado;
    }
    else if(x === 0){
        return 1;
    }
    else{
        return "undefined";
    }
}   