/**
 * TODO: Recuperar os Elementos do DOM
 */

/**
 * TODO: Definir os Parâmetros de Geração da Senha
 * ? dica: minusc, maiusc, numeros, simbolos, modo, qtde, senha...
 */

/**
 * Gera a senha a partir dos parâmetros definidos
 */
const generatePassword = () => {
    // Definição dos alfabetos
    const alfabetoMinusc   = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const alfabetoMaiusc   = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const alfabetoNumeros  = ["0","1","2","3","4","5","6","7","8","9"]
    const alfabetoSimbolos = ["!","@","#","$","%","&","*","(",")","/","-","_","[","]","=","+",">","<"]

    let alfabetoUsado = [];

    /**
     * TODO: Montar o alfabeto utilizado de acordo com os parametros
     */


    /**
     * TODO: Caso os parametros sejam validos, iterar pela quantidade de caracteres esperada
     */
    let pwd = "";
    for(let i = 0; i < count && (alfabetoUsado.length > 0); i++) {
        //TODO: Selecionar um elemento do alfabeto disponivel
        // ? dica: Math.floor(Math.random() * alfabeto.length)
    }
}

/**
 * Ao carregar a tela, gera a primeira senha com os parâmetros default
 */
window.onload = () => {
    generatePassword();
}

/**
 * Copia a senha
 */
const copyPassword = () => {
    navigator.clipboard.writeText(password);
}

/**
 * TODO: INPUT do Seletor de Quantidade de Caracteres
 * ? dica: (Atualiza o contador e gera uma nova senha)
 */

/**
 * TODO: Atribui os inputs nos RadioButtons de Estilo
 * ? dica: (Atualiza o estilo e gera uma nova senha)
 */

/**
 * TODO: Atribui os inputs nos CheckBoxes de Alfabeto
 * ? dica: (Atualiza o alfabeto e gera uma nova senha)
 */