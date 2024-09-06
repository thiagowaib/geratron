/**
 * Elementos do DOM
 */
const icoCopy        = document.getElementById("icoCopy");
const icoReload      = document.getElementById("icoReload");
const inpPassword    = document.getElementById("inpPassword");
const inpCount       = document.getElementById("inpCount");
const spanCount      = document.getElementById("range-value");
const arrRdStyle     = document.getElementsByClassName("rdStyle");
const arrChkAlphabet = document.getElementsByClassName("chkAlphabet");
const btnCopy        = document.getElementById("btnCopy");
const classifier     = document.getElementById("classifier");

/**
 * Parâmetros de Geração da Senha
 */
let minor   = true;
let major   = true; 
let numbers = true; 
let symbols = true;
let style   = 1;
let count   = 10;
let password = "";

/**
 * Verifica a força da senha, e atribui a cor para
 * a TAG classificadora de acordo
 */
const checkPasswordStrength = () => {
    if(password.length > 45 || symbols || (numbers && major)){
        classifier.style.backgroundColor = "#00FF00";
    } else if (password.length > 8 || numbers || major) {
        classifier.style.backgroundColor = "#FFFF00";
    } else {
        classifier.style.backgroundColor = "#FF0000";
    }
}

/**
 * Gera a senha a partir dos parâmetros definidos
 */
const generatePassword = () => {
    const alphabetMinor   = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const alphatbetMajor  = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const alphabetNumbers = ["0","1","2","3","4","5","6","7","8","9"]
    const alphabetSymbols = ["!","@","#","$","%","&","*","(",")","/","-","_","[","]","=","+",">","<"]

    let usedAlphabet = [];

    if(minor) { 
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetMinor); 
    }
    if(major) { 
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphatbetMajor); 
    }
    if(numbers) { 
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetNumbers); 
    }
    if(symbols) { 
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetSymbols); 
    }


    let pwd = "";
    for(let i = 0; i < count && (usedAlphabet.length > 0); i++) {
        let character = usedAlphabet[Math.floor(Math.random() * usedAlphabet.length)]

        while(style == 2 && ["I","l","i","L","1","0","o","O"].includes(character)) {
            character = usedAlphabet[Math.floor(Math.random() * usedAlphabet.length)];
        }

        pwd += character;
    }

    password = pwd;
    inpPassword.value = password;
    checkPasswordStrength();
}

/**
 * Copia a senha
 */
const copyPassword = () => {
    navigator.clipboard.writeText(password);
}

/**
 * INPUT do Seletor de Quantidade de Caracteres
 * (Atualiza o contador e gera uma nova senha)
 */
inpCount.oninput = () => {
    count = inpCount.value
    spanCount.innerHTML = ` = ${count}`;
    generatePassword()
};

/**
 * Atribui os inputs nos RadioButtons de Estilo
 * (Atualiza o estilo e gera uma nova senha)
 */
for(let i = 0; i<arrRdStyle.length; i++){
    const rdStyle = arrRdStyle[i];
    rdStyle.oninput = () => {
        style = rdStyle.value;
        generatePassword()
    }
}

/**
 * Atribui os inputs nos CheckBoxes de Alfabeto
 * (Atualiza o alfabeto e gera uma nova senha)
 */
for(let i = 0; i<arrChkAlphabet.length; i++){
    const chkAlphabet = arrChkAlphabet[i];

    chkAlphabet.oninput = () => {
        if(chkAlphabet.id === "minor") {
            minor = chkAlphabet.checked;
        }
        if(chkAlphabet.id === "major") {
            major = chkAlphabet.checked;
        }
        if(chkAlphabet.id === "numbers") {
            numbers = chkAlphabet.checked;
        }
        if(chkAlphabet.id === "symbols") {
            symbols = chkAlphabet.checked;
        }
        generatePassword();
    }
}

/**
 * Ao clicar no icone de Recarregar, gera uma nova senha
 */
icoReload.onclick = () => {
    generatePassword();
}

/**
 * Ao clicar no icone da Copia, copia a senha para a area de transferencia
 */
icoCopy.onclick = () => {
    copyPassword();
}

/**
 * Ao clicar no botao de Copiar, copia a senha para a area de transferencia
 */
btnCopy.onclick = () => {
    copyPassword();
}

/**
 * Ao carregar a tela, gera a primeira senha com os parâmetros default
 */
window.onload = () => {
    generatePassword();
}
