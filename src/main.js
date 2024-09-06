// Importa os módulos do Electron
const { app, BrowserWindow } = require('electron')

//Faz uma tentativa de carregar o módulo de hot-reload do Electron
try {
  require('electron-reloader')(module)
} catch (_) {}

// ========================================================================================
// ========================================================================================
// ========================================================================================


// Método executado quando o Electron termina de carregar a aplicação
app.whenReady().then(() => {

  // TODO: Criar uma Janela da Aplicação e customizar seus parâmetros
  // ? dica 1: const janela  = new BrowserWindow({ ... });
  // ? dica 2: Para remover o menu Superior [file, edit, view...] => janela.removeMenu(); 
  // ? dica 3: Caminho do icone: __dirname + './assets/icon.png'
  const janela = null
  

  // TODO: Carregar o arquivo HTML default para a Janela Principal


  // Abre o DevTools quando o usuário aperta F1
  janela.webContents.on("before-input-event", (event, input) => {
    if(input.key === 'F1') {
      if(!janela.webContents.isDevToolsOpened()) {
        janela.webContents.openDevTools();
      }
    }
  })
})

// ========================================================================================
// ========================================================================================
// ========================================================================================

// No macOS, é comum recriar a janela no APP quando
// o icone da barra de tarefas é clicado, e não tem nenhuma outra janela aberat
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Finaliza a aplicação quando todas as janelas estão fechadas
// EXCETO no macOS, onde é comum para as aplicações ficarem ativas
// até o usuário explicitamente fechá-las através do CMD+Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})