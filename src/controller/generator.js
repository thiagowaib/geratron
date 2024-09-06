/**
 * Elementos do DOM
 */
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
let count   = 16;
let password = "";

/**
 * Verifica a força da senha, e atribui a cor para
 * a TAG classificadora de acordo
 * 
 * Forte :: Possui 3 Alfabetos Diferentes || >32 caracteres
 * Medio :: Possui 2 Alfabetos Diferentes || >16 caracteres
 * Fraco :: Possui 1 Alfabeto             || <16 caracteres
 */
const checkPasswordStrength = () => {
    let qtdeAlfabetos = 0;
    // No Javascript TRUE = 1 e FALSE = 0
    qtdeAlfabetos += minor
    qtdeAlfabetos += major
    qtdeAlfabetos += numbers
    qtdeAlfabetos += symbols

    if(password.length >= 32 || (password.length >= 16 && qtdeAlfabetos >= 3)) {
        classifier.style.backgroundColor = "#00FF00";
    } else if (password.length >= 16 || (password.length >= 8 && qtdeAlfabetos >= 2)) {
        classifier.style.backgroundColor = "#FFFF00";
    } else {
        classifier.style.backgroundColor = "#FF0000";
    }
}

/**
 * Gera a senha a partir dos parâmetros definidos
 */
const generatePassword = () => {
    // Definição dos alfabetos
    const alphabetMinor   = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const alphatbetMajor  = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const alphabetNumbers = ["0","1","2","3","4","5","6","7","8","9"]
    const alphabetSymbols = ["!","@","#","$","%","&","*","(",")","/","-","_","[","]","=","+",">","<"]

    let usedAlphabet = [];

    /**
     * Monta o alfabeto utilizado de acordo com os parametros
     */
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


    /**
     * Caso os parametros sejam validos, itera pela quantidade de caracteres esperada
     */
    let pwd = "";
    for(let i = 0; i < count && (usedAlphabet.length > 0); i++) {
        // Seleciona um elemento do alfabeto disponivel
        let character = usedAlphabet[Math.floor(Math.random() * usedAlphabet.length)]

        // No modo de acessibilidade, evita escolher caracteres ambíguos (facilmente confundidos)
        while(style == 2 && ["I","l","1","0","o","O"].includes(character)) {
            character = usedAlphabet[Math.floor(Math.random() * usedAlphabet.length)];
        }

        // Concatena o caractere escolhido
        pwd += character;
    }

    // Define a senha e avalia sua força
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

        if(password == "") {
            chkAlphabet.checked = !chkAlphabet.checked;
            chkAlphabet.dispatchEvent(new Event('input'));
        }
    }
}

/**
 * Ao clicar no icone de Recarregar, gera uma nova senha
 */
icoReload.onclick = () => {
    generatePassword();
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
