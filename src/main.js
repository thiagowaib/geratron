// Importa os módulos do Electron
const { app, BrowserWindow } = require('electron')

//Faz uma tentativa de carregar o módulo de hot-reload do Electron
try {
  require('electron-reloader')(module)
} catch (_) {}

/**
 * Cria a Janela principal da Aplicação
 */
const createWindow = () => {
  // Cria uma Janela da Aplicação
  const mainWindow = new BrowserWindow({
    width: 1024,           // Largura Padrão da Janela
    height: 768,           // Altura Padrão da Janela
    icon: __dirname + './assets/icon.png',  // Icone da Aplicação
    movable: true,          // A Janela pode ser movida?
    resizable: false,       // A Janela pode ter suas dimensões redimensiondas?
    minimizable: true,      // A Janela pode ser Minimizada?
    maximizable: false,     // A Janela pode ser Maximizada?
  });

  // Remove o Menu Superior [FILE, EDIT, VIEW, WINDOW, HELP]
  mainWindow.removeMenu();

  // Carrega o arquivo HTML default para a Janela Principal
  mainWindow.loadFile('./src/view/generator.html');

  // Abre o DevTools quando o usuário aperta F1
  mainWindow.webContents.on("before-input-event", (event, input) => {
    if(input.key === 'F1') {
      if(!mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.webContents.openDevTools();
      }
    }
  })
}

// Método executado quando o Electron termina de carregar a aplicação
app.whenReady().then(() => {

  createWindow(); // Cria a Janela principal da Aplicação

  // No macOS, é comum recriar a janela no APP quando
  // o icone da barra de tarefas é clicado, e não tem nenhuma outra janela aberat
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Finaliza a aplicação quando todas as janelas estão fechadas
// EXCETO no macOS, onde é comum para as aplicações ficarem ativas
// até o usuário explicitamente fechá-las através do CMD+Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})