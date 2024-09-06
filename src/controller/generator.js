const icoCopy        = document.getElementById("icoCopy");
const icoReload      = document.getElementById("icoReload");
const inpPassword    = document.getElementById("inpPassword");
const inpCount       = document.getElementById("inpCount");
const spanCount      = document.getElementById("range-value");
const arrRdStyle     = document.getElementsByClassName("rdStyle");
const arrChkAlphabet = document.getElementsByClassName("chkAlphabet");
const btnCopy        = document.getElementById("btnCopy");
const classifier     = document.getElementById("classifier");

let minor   = true;
let major   = true; 
let numbers = true; 
let symbols = true;
let style   = 1;
let count   = 10;
let password = "";

const checkPasswordStrength = () => {
    if(password.length > 45 || symbols || (numbers && major)){
        classifier.style.backgroundColor = "#00FF00";
    } else if (password.length > 8 || numbers || major) {
        classifier.style.backgroundColor = "#FFFF00";
    } else {
        classifier.style.backgroundColor = "#FF0000";
    }
}

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
    for(let i = 0; i < count; i++) {
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

const copyPassword = () => {
    navigator.clipboard.writeText(password);
}

inpCount.oninput = () => {
    count = inpCount.value
    spanCount.innerHTML = ` = ${count}`;
    generatePassword()
};

for(let i = 0; i<arrRdStyle.length; i++){
    const rdStyle = arrRdStyle[i];
    rdStyle.oninput = () => {
        style = rdStyle.value;
        generatePassword()
    }
}

for(let i = 0; i<arrChkAlphabet.length; i++){
    const chkAlphabet = arrChkAlphabet[i];

    if(chkAlphabet.id === "minor") {
        chkAlphabet.oninput = () => {
            if(chkAlphabet.checked || major || numbers || symbols) {
                minor = chkAlphabet.checked;
                generatePassword();
            } else {
                chkAlphabet.checked = !chkAlphabet.checked;
            }
        }
    }

    if(chkAlphabet.id === "major") {
        chkAlphabet.oninput = () => {
            if(minor || chkAlphabet.id || numbers || symbols) {
                major = chkAlphabet.checked;
                generatePassword();
            } else {
                chkAlphabet.checked = !chkAlphabet.checked;
            }
        }
    }

    if(chkAlphabet.id === "numbers") {
        chkAlphabet.oninput = () => {
            if(minor || major || chkAlphabet.id || symbols) {
                numbers = chkAlphabet.checked;
                generatePassword();
            } else {
                chkAlphabet.checked = !chkAlphabet.checked;
            }
        }
    }

    if(chkAlphabet.id === "symbols") {
        chkAlphabet.oninput = () => {
            if(minor || major || numbers || chkAlphabet.id) {
                symbols = chkAlphabet.checked;
                generatePassword();
            } else {
                chkAlphabet.checked = !chkAlphabet.checked;
            }
        }
    }
}

icoReload.onclick = () => {
    generatePassword();
}

icoCopy.onclick = () => {
    copyPassword();
}

btnCopy.onclick = () => {
    copyPassword();
}

window.onload = () => {
    generatePassword();
}

