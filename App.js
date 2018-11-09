/*
Autores:Diego Aragón,Roberto González,Alan Ricardo
Fecha de creación:02/10/2018
Fecha de ultima modificación:05/10/2018
Por quien fue modificado: Diego Aragón
Motivo de modificación: Agregar vista de HijoVista
*/
import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import firebase from 'firebase';
import {createSwitchNavigator,createDrawerNavigator} from 'react-navigation';
import Registro from './src/Containers/Registro';
import Login from './src/Containers/Login';
import AgregarNinio from './src/Containers/AgregaNinio';
import HijoLogin from './src/Containers/HijoLogin';
import HijoVista from './src/Containers/HijoVista';
import PrincipalP from './src/Containers/PrincipalP';
import PTareaP from './src/Containers/PantallaTareasP';
import PTareaH from './src/Containers/PantallaTareasH';
import PRecompensaP from './src/Containers/PantallaRecompensaP';
import PRecompensaH from './src/Containers/PantallaRecompensaH';
import PTareaPendiente from './src/Containers/PantallaPendientes';
import MisRecompensas from './src/Containers/PantallaRecompensaCompradas';
import PTareaExpirada from './src/Containers/PantallaTareaExpirada';
console.disableYellowBox = true

/*
  Objeto que controla la vista en la que se navegará
*/
const DrawerRoot = createDrawerNavigator(
  {
    Progreso: { screen: PrincipalP },
    Tareas: { screen: PTareaP },
    Recompensas:{screen:PRecompensaP},
    AgregarHijo:{screen:AgregarNinio},
    TareasPendientes:{screen:PTareaPendiente},
    TareasExpiradas:{screen:PTareaExpirada}
  },
  {
    initialRouteName: "Progreso",//se inicializa en la vista de registro
  }
);

const DrawerRootHijo = createDrawerNavigator(
  {
    Progreso: { screen: HijoVista },
    Tareas: { screen: PTareaH },
    Recompensas: { screen: PRecompensaH },
    MisRecompensas:{screen:MisRecompensas}
  //  Recompensas:{screen:PReconpensaP}

  },
  {
    initialRouteName: "Progreso",//se inicializa en la vista de registro
  }
);

const SwitchRoot= createSwitchNavigator(
  {
    Registro:Registro,
    Login:Login,
    Agregar:DrawerRoot,
    HijoLogin:HijoLogin,
    HijoVista:DrawerRootHijo,
    // PrincipalPapa:PrincipalPapa
  },
  {
    initialRouteName:"HijoVista",//se inicializa en la vista de registro
  }
);
// const DrawerRoot = createDrawerNavigator(
//   {
//     Home:{
//       screen:PrincipalPapa,
//     }
//   }
// );
/*
  Componente principal que se renderiza en index.js.
  Toma el objeto SwitchRoot como hijo y lo renderiza.
*/
export default class App extends Component<Props> {
  componentWillMount=()=>{//Funcion que corre al iniciar la app
    BackHandler.addEventListener('hardwareBackPress', ()=>{ return true});//desactiva el boton de back en android
    /*
      Api de coneccion con firebase. Se inicia al correr la funcion
     */
    firebase.initializeApp({
      apiKey: "AIzaSyAUp54UAsJoe1kSfFvJr0N2fEKtybTewb8",
      authDomain: "weaver-69.firebaseapp.com",
      databaseURL: "https://weaver-69.firebaseio.com",
      projectId: "weaver-69",
      storageBucket: "weaver-69.appspot.com",
      messagingSenderId: "753386429646"
    });
  }

  render() {
    return (
      <SwitchRoot/>
    );
  }
}
