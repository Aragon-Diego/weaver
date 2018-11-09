import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Header from './Header2';
import Tarea from '../Components/TareaPendiente';
import renderIf from '../renderIf';
import TareaPendiente from './VerTareaPendiente';

let arr = [];
class PantallaTareasP extends Component{
    state = {
        tareas: [],
        detalles:false,
        titulo:"",
        puntos:"",
        descripcion:"",
        codigo:"",
        nombre:"",
        fechai:""
    };
    dia=()=>{
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + "" + mm + "" + dd;
        return today;
    }
    componentWillMount=async()=>{
        let arr = []
        let cod=[]
        const user = firebase.auth().currentUser;
        const dia = this.dia()
        await firebase.database().ref('Hijos/').once("value").then(function (snapshotP) {
            snapshotP.forEach(function (cSnapshot) {
                if (cSnapshot.val().Padre == user.uid) {
                    cod.push([cSnapshot.key, cSnapshot.val().Nombre])
                }
            });
        });
        for(i=0;i<cod.length;i++){
            await firebase.database().ref('Hijos/' +cod[i][0]+ '/Tareas').once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    childSnapshot.forEach(function (tareasSnapshot) {
                        let newPost = tareasSnapshot.val();
                        if (newPost.fecha <= dia) { //en lugar del 2 va el value del dia de hoy
                            let Tarea = {
                                titulo: newPost.titulo,
                                nombre:cod[i][1],
                                fecha:newPost.fecha 
                            }
                            arr.push(Tarea)
                        }
                    })
                })
            })
        }
        this.setState({
            tareas:arr,
        })
    }
    render=()=>{
        let arr = this.state.tareas.map((tarea, index) => {
            return (
                <Tarea key={index} titulo={tarea.titulo} puntos={tarea.puntos} descripcion={tarea.descripcion} codigo={tarea.codigo} nombre={tarea.nombre+" "+tarea.fecha } fechai={tarea.fechai}/>
            );
        });
        return(
            
            <View style={{width:"100%",height:"100%",backgroundColor:"#fafafa",alignItems:"center"}}> 
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <Text style={{fontSize:24}}>Tareas expiradas</Text>
                {arr}    
            </View> 
        );
    }
};

export default PantallaTareasP;