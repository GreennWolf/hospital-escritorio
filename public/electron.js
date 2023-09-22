const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const electron = require('electron');
const app = electron.app;
const {screen } = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain

const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

let mainWindow;
let crearUserWindow;
let editUserWindow;
let crearCargoWindow;
let editCargoWindow;
let crearTipoWindow;
let editTipoWindow;
let crearAreaWindow;
let editAreaWindow;
let crearZonaWindow;
let editZonaWindow;
let crearObraSocialWindow;
let editObraSocialWindow;
let selectUserWindow;
let crearFichaWindow;
let editFichaWindow;
let detallesFichaWindow;
let crearEnfermedadWindow;
let editEnfermedadWindow;
let configWindows;
let AlarmaPantallaWindows = null;

function createWindow() {
  const displays = screen.getAllDisplays();

  // Utiliza la segunda pantalla (índice 1) como la pantalla objetivo
  const targetDisplay = displays[0];
  mainWindow = new BrowserWindow({
    width: targetDisplay.bounds.width,
    height: targetDisplay.bounds.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
  },
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);
}

function createUserWindows(){
  crearUserWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear Usuario'
});
crearUserWindow.loadURL(isDev ? 'http://localhost:3000#/crearUsuario' : `file://${path.join(__dirname, '../build/index.html')}#/crearUsuario`);

crearUserWindow.on('closed', ()=>{
    crearUserWindow = null;
});
}

function editUserWindows(id){
  editUserWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar Usuario'
});
editUserWindow.loadURL(isDev ?`http://localhost:3000#/editarUsuario/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/editarUsuario/${id}`);

editUserWindow.on('closed', ()=>{
    editUserWindow = null;
});
}

function createCargoWindows(){
  crearCargoWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear Cargo'
});
crearCargoWindow.loadURL(isDev ? 'http://localhost:3000#/crearCargo' : `file://${path.join(__dirname, '../build/index.html')}#/crearCargo`);

crearCargoWindow.on('closed', ()=>{
    crearCargoWindow = null;
});
}

function editCargoWindows(id){
  editCargoWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar Cargo'
});
editCargoWindow.loadURL(isDev ?`http://localhost:3000#/editarCargo/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/editarCargo/${id}`);

editCargoWindow.on('closed', ()=>{
    editCargoWindow = null;
});
}
function createTipoWindows(){
  crearTipoWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear Tipo'
});
crearTipoWindow.loadURL(isDev ? 'http://localhost:3000#/crearTipo' : `file://${path.join(__dirname, '../build/index.html')}#/crearTipo`);

crearTipoWindow.on('closed', ()=>{
    crearTipoWindow = null;
});
}

function editTipoWindows(id){
  editTipoWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar Tipo'
});
editTipoWindow.loadURL(isDev ?`http://localhost:3000#/editarTipo/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/editarTipo/${id}`);

editTipoWindow.on('closed', ()=>{
    editTipoWindow = null;
});
}
function createAreaWindows(){
  crearAreaWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear Area'
});
crearAreaWindow.loadURL(isDev ? 'http://localhost:3000#/crearArea' : `file://${path.join(__dirname, '../build/index.html')}#/crearArea`);

crearAreaWindow.on('closed', ()=>{
    crearAreaWindow = null;
});
}

function editAreaWindows(id){
  editAreaWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar Area'
});
editAreaWindow.loadURL(isDev ?`http://localhost:3000#/editarArea/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/editarArea/${id}`);

editAreaWindow.on('closed', ()=>{
    editAreaWindow = null;
});
}
function createZonaWindows(){
  crearZonaWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear Zona'
});
crearZonaWindow.loadURL(isDev ? 'http://localhost:3000#/crearZona' : `file://${path.join(__dirname, '../build/index.html')}#/crearZona`);

crearZonaWindow.on('closed', ()=>{
    crearZonaWindow = null;
});
}

function selectUserWindows(id){
  selectUserWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Asignar Personal'
});
selectUserWindow.loadURL(isDev ?`http://localhost:3000#/SelectUsuario/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/SelectUsuario/${id}`);

selectUserWindow.on('closed', ()=>{
    selectUserWindow = null;
});
}

function editZonaWindows(id){
  editZonaWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar Zona'
});
editZonaWindow.loadURL(isDev ?`http://localhost:3000#/editarZona/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/editarZona/${id}`);

editZonaWindow.on('closed', ()=>{
    editZonaWindow = null;
});
}

function createObraSocialWindows(){
  crearObraSocialWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear ObraSocial'
});
crearObraSocialWindow.loadURL(isDev ? 'http://localhost:3000#/crearObraSocial' : `file://${path.join(__dirname, '../build/index.html')}#/crearObraSocial`);

crearObraSocialWindow.on('closed', ()=>{
    crearObraSocialWindow = null;
});
}

function editObraSocialWindows(id){
  editObraSocialWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar ObraSocial'
});
editObraSocialWindow.loadURL(isDev ?`http://localhost:3000#/editarObraSocial/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/editarObraSocial/${id}`);

editObraSocialWindow.on('closed', ()=>{
    editObraSocialWindow = null;
});
}

function createFichaWindows(){
  crearFichaWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear Ficha'
});
crearFichaWindow.loadURL(isDev ? 'http://localhost:3000#/crearFicha' : `file://${path.join(__dirname, '../build/index.html')}#/crearFicha`);

crearFichaWindow.on('closed', ()=>{
    crearFichaWindow = null;
});
}

function editFichaWindows(id){
  editFichaWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar Ficha'
});
editFichaWindow.loadURL(isDev ?`http://localhost:3000#/editarFicha/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/editarFicha/${id}`);

editFichaWindow.on('closed', ()=>{
    editFichaWindow = null;
});
}
function detallesFichaWindows(id){
  detallesFichaWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:800,
    height:730,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar Ficha'
});
detallesFichaWindow.loadURL(isDev ?`http://localhost:3000#/detallesFicha/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/detallesFicha/${id}`);

detallesFichaWindow.on('closed', ()=>{
    detallesFichaWindow = null;
});
}

function createEnfermedadWindows(){
  crearEnfermedadWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear Enfermedad'
});
crearEnfermedadWindow.loadURL(isDev ? 'http://localhost:3000#/crearEnfermedad' : `file://${path.join(__dirname, '../build/index.html')}#/crearEnfermedad`);

crearEnfermedadWindow.on('closed', ()=>{
    crearEnfermedadWindow = null;
});
}

function editEnfermedadWindows(id){
editEnfermedadWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Editar Enfermedad'
});
editEnfermedadWindow.loadURL(isDev ?`http://localhost:3000#/editarEnfermedad/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/editarEnfermedad/${id}`);

editEnfermedadWindow.on('closed', ()=>{
editEnfermedadWindow = null;
});
}

function createConfigWindows(){
  configWindows = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
    },
    width:600,
    height:530,
    resizable:false,
    autoHideMenuBar:true,
    alwaysOnTop:true,
    parent:mainWindow,
    modal:true,
    title: 'Crear Tipo'
});
configWindows.loadURL(isDev ? 'http://localhost:3000#/config' : `file://${path.join(__dirname, '../build/index.html')}#/config`);

configWindows.on('closed', ()=>{
    configWindows = null;
});
}

function createAlarmaPantallaWindows(id) {
  // Comprobar si la ventana ya está abierta y cerrarla si es necesario
  if (AlarmaPantallaWindows !== null) {
    AlarmaPantallaWindows.close();
  }

  const displays = screen.getAllDisplays();

  // Verifica si hay al menos dos pantallas disponibles
  if (displays.length < 2) {
    console.warn('No se encontraron dos pantallas. Abriendo la ventana en la pantalla principal.');
  }

  // Utiliza la segunda pantalla (índice 1) como la pantalla objetivo
  const targetDisplay = displays.length >= 2 ? displays[1] : displays[0];

  AlarmaPantallaWindows = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    },
    width: targetDisplay.bounds.width,
    height: targetDisplay.bounds.height,
    x: targetDisplay.bounds.x,
    y: targetDisplay.bounds.y,
    // fullscreen: true,
    resizable: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    parent: mainWindow,
    title: 'ALARMA AZUL'
  });

  AlarmaPantallaWindows.loadURL(isDev ? `http://localhost:3000#/AlarmaPantalla/${id}` : `file://${path.join(__dirname, '../build/index.html')}#/AlarmaPantalla/${id}`);

  AlarmaPantallaWindows.on('closed', () => {
    AlarmaPantallaWindows = null;
  });
}

function guardarConfiguracion(ip, puerto) {
  const configuracion = [{
    ip: ip,
    puerto: puerto,
  }];
  const filePath = path.join(__dirname, '..', 'src', 'Config', 'settings.json');
  console.log(filePath,'direccion')

  // Convierte los datos a formato JSON
  const jsonConfiguracion = JSON.stringify(configuracion, null, 2);

  try {
    // Escribe los datos en el archivo
    fs.writeFileSync(filePath, jsonConfiguracion, 'utf-8');
    console.log('Archivo de configuración guardado con éxito.');
  } catch (error) {
    console.error('Error al guardar el archivo de configuración:', error);
  }
}

function listarPuertosSerie() {
  SerialPort.list()
    .then((puertos) => {
      // Enviar la lista de puertos a la ventana renderizada
      mainWindow.webContents.send('puertos-serie',puertos);
      // console.log(puertos)
    })
    .catch((error) => {
      console.error('Error al listar los puertos serie:', error);
    });
}

function enviarYRecibirDatos(puertoSerie, data) {
const port = new SerialPort({ path:puertoSerie, baudRate: 9600 })

const parser = new ReadlineParser()

port.pipe(parser)

parser.on('data', (line) => {
  console.log('Arduino Dice: ' + line)

  // Convertir el objeto a una cadena JSON
  let datos = JSON.stringify(data)
  
  // Enviar la cadena JSON al Arduino
  port.write(datos)
})


}


const templateMenu = [
  {
      label:'File',
      submenu:[
          {
            label:'Cerrar Sesion',
            click(){
              mainWindow.loadURL(isDev ? 'http://localhost:3000#/' : `file://${path.join(__dirname, '../build/index.html')}`);
            }
          },
          {
            label:'Configuracion',
            async click(){
                createConfigWindows()
            } 
          },
          {
              label:'Exit',
              accelerator:process.platform =='darwin' ? 'command+Q':'Ctrl + Q',
              click(){
                  app.quit();
              }
          }
      ]
  },
];

if(process.platform == 'darwin'){
  templateMenu.unshift({
      label: app.getName()
  });
}

if(process.env.NODE_ENV !== 'production'){
  templateMenu.push({
      label:'DevTools',
      submenu:[
          {
              label:'Show/Hide Dev Tools',
              accelerator:'Ctrl+D',
              click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
              }
          },
          {
              role:'reload'
          }
      ]
  })
}

app.on('ready', createWindow);

ipcMain.on('crearUsuario',()=>{
  createUserWindows()
})

ipcMain.on('editarUsuario',(e,id)=>{
  // console.log('id:' + id) 
  editUserWindows(id)
})

ipcMain.on('crearCargo',()=>{
  createCargoWindows()
})

ipcMain.on('editarCargo',(e,id)=>{
  // console.log('id:' + id) 
  editCargoWindows(id)
})
ipcMain.on('crearTipo',()=>{
  createTipoWindows()
})

ipcMain.on('editarTipo',(e,id)=>{
  // console.log('id:' + id) 
  editTipoWindows(id)
})
ipcMain.on('crearArea',()=>{
  createAreaWindows()
})

ipcMain.on('editarArea',(e,id)=>{
  // console.log('id:' + id) 
  editAreaWindows(id)
})

ipcMain.on('selectUser',(e,id)=>{
  // console.log('id:' + id) 
  selectUserWindows(id)
})

ipcMain.on('crearZona',()=>{
  createZonaWindows()
})

ipcMain.on('editarZona',(e,id)=>{
  // console.log('id:' + id) 
  editZonaWindows(id)
})

ipcMain.on('crearFicha',()=>{
  createFichaWindows()
})

ipcMain.on('editarFicha',(e,id)=>{
  // console.log('id:' + id) 
  editFichaWindows(id)
})


ipcMain.on('detallesFicha',(e,id)=>{
  // console.log('id:' + id) 
  detallesFichaWindows(id)
})

ipcMain.on('crearEnfermedad',()=>{
  createEnfermedadWindows()
})

ipcMain.on('editarEnfermedad',(e,id)=>{
  // console.log('id:' + id) 
  editEnfermedadWindows(id)
})


ipcMain.on('crearObraSocial',()=>{
  createObraSocialWindows()
})

ipcMain.on('editarObraSocial',(e,id)=>{
  // console.log('id:' + id) 
  editObraSocialWindows(id)
})

ipcMain.on('openConfigWindows',()=>{
  createConfigWindows()
})

ipcMain.on('AlarmaAzul',(e,id)=>{
  createAlarmaPantallaWindows(id)
})

ipcMain.on('getPantallas',()=>{
  const displays = screen.getAllDisplays();
  // console.log(displays)
  mainWindow.webContents.send('getPantallas',displays);
})

ipcMain.on('Configurar',(e,data)=>{
  const {ip,puerto} = data 
  guardarConfiguracion(ip,puerto)
  mainWindow.reload()
})

ipcMain.on('configurarArduino',(e,data)=>{
  const {puerto,idzona,idarea} = data
  let datos = {
    idarea,
    idzona
  }
  enviarYRecibirDatos(puerto,datos)
})

ipcMain.on('getPuertos',()=>{
  listarPuertosSerie()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});






//---------------------- ARDUINO EJEMPLO ----------------------------
// const { SerialPort } = require('serialport');

// async function listSerialPorts() {
//   try {
//     const ports = await SerialPort.list();
//     if (ports.length === 0) {
//       console.log('No se encontraron puertos serie disponibles.');
//     } else {
//       console.log('Puertos serie disponibles:');
//       ports.forEach((port) => {
//         console.log(`Nombre: ${port.path}, Fabricante: ${port.manufacturer || 'Desconocido'}`);
//       });
//     }
//   } catch (error) {
//     console.error('Error al listar los puertos serie:', error);
//   }
// }

// async function sendDataToArduino(portPath, data) {
//   const port = new SerialPort({path:portPath,baudRate:9600})

//   port.on('open', () => {
//     console.log(`Puerto serie abierto en ${portPath}`);
//   });

//   port.on('data', (receivedData) => {
//     const dataParts = receivedData.toString().split(',');
//     if (dataParts.length === 2) {
//       const dato1 = dataParts[0];
//       const dato2 = dataParts[1];
//       console.log(`Dato1 recibido desde Arduino: ${dato1}`);
//       console.log(`Dato2 recibido desde Arduino: ${dato2}`);
//     } else {
//       console.error('Formato de datos incorrecto.');
//     }
//   });

//   port.on('error', (err) => {
//     console.error('Error en el puerto serie:', err);
//   });

//   port.write(data, (err) => {
//     if (err) {
//       console.error('Error al enviar datos:', err);
//     } else {
//       console.log(`Datos enviados correctamente a Arduino: ${data}`);
//     }
//   });
// }

// // Ejemplo de uso
// const puertoSeleccionado = 'COM10'; // Reemplaza con el nombre del puerto serie seleccionado
// const datosParaArduino = 'Hola, Arduino!'; // Reemplaza con los datos que deseas enviar



  
// listSerialPorts()
// sendDataToArduino(puertoSeleccionado, datosParaArduino);
