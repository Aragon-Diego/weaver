/*
Autores:Diego Aragón,Roberto González,Alan Ricardo
Fecha de creación:04/10/2018
Fecha de ultima modificación:05/10/2018
Por quien fue modificado: Diego Aragón
Motivo de modificación: Arreglar vista con fonts grandes y margin entre los componentes
*/
import React,{Component} from 'react';
import {View,TextInput,StyleSheet,TouchableOpacity,Text,Image,AsyncStorage} from 'react-native';
import Header from './Header2';
import firebase from 'firebase';
import Tarea from '../Components/TareaHijo';
/*
    Componente principal de HijoVista.js
    Toma como props el nombre del hijo a desplegar y el nombre de su padre
*/
class HijoVista extends Component{
    state={
        codigo:"Pantalla hijo",
        pendientes:"",
        titulo:"",
        fecha:"",
    }
    dia = () => {
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
    componentWillMount=async ()=>{
         await this.displayData()
        let nino={}
        let tarea={}
        const dia = this.dia()
        let pendientes = 0;
        await firebase.database().ref('Hijos/' + this.state.codigo + '/Tareas').once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childSnapshot.forEach(function (tareasSnapshot) {
                    let newPost = tareasSnapshot.val();
                    if (newPost.fechai <= dia) { //en lugar del 2 va el value del dia de hoy
                        pendientes = pendientes + 1
                    }
                })
            })
        })
        await firebase.database().ref("Hijos/"+this.state.codigo).once("value", (snap) => {
            let titulo
            let snap4=""
            if(snap.child("Tareas").exists()){
                let snap2=snap.child("Tareas");
                let fecha=Object.keys(snap2.val())[0];
                if(fecha<=dia){
                    let snap3=snap2.child(fecha)
                    titulo=Object.keys(snap3.val())[0];
                    snap4 = snap3.child(titulo).val().fecha
                }else{
                    titulo="No hay tarea próxima";    
                }
            }else{
                titulo="No hay tarea próxima";

            }
            nino={
                puntos:snap.child("puntos").val().puntos,
                pendientes:pendientes,
                titulo:titulo,
                fecha:snap4        
            }
        });
        this.setState({
            puntos:nino.puntos,
            pendientes:nino.pendientes,
            titulo:nino.titulo,
            fecha:nino.fecha
        })
    }
    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            this.setState({
                codigo: user
            })
        } catch (error) {

        }
    }
    render(){
        //funcion  para navegar a pantalla Registro
        /*
            Vista HijoVista con JSX
        */
        return(
            <View style={styles.div}>
            <View style={{width:"100%",height:"100%",backgroundColor:"#fafafa",alignItems:"center"}}>
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <View style={{alignContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
                    <View style={{alignContent:"center",alignItems:"center",width:"100%",height:"30%"}}>
                        <Text style={{fontSize:32,color:"black"}}>Mis puntos</Text>
                        <Text style={{fontSize:100,color:"#0776A0"}}>{this.state.puntos}</Text>
                    </View>
                    <View style={{alignContent:"center",alignItems:"center",width:"100%",height:"15%"}}>
                        <Text style={{fontSize:28,color:"black"}}>{"Tareas pendientes: "+this.state.pendientes}</Text>
                    </View>
                    <View style={{alignContent:"center",alignItems:"center",width:"100%",height:"25%"}}>
                        <Text style={{fontSize:28,color:"black"}}>Próxima tarea:</Text>
                        <Tarea nombre={this.state.titulo} fecha={this.state.fecha}/>    
                    </View>
                </View>
            </View>
                
            </View>

        );   
    }

};
/*
    Hoja de estilos para JSX
*/
const styles = StyleSheet.create({
    div:{
        width:"100%",
        height:"100%",
        backgroundColor:"#fafafa",
        alignItems: "center",
        color:"#ffffff",
    },
    divHijoVista:{
        width:"100%",
        height:"85%",
        marginTop:8,
        alignItems:"center"
    },
    input:{
        width:"90%",
        height: "100%",
        fontSize:18,
        borderStyle:"solid",
        borderWidth:3,
        borderColor:"#9e9e9e",
        borderRadius: 5,
        marginBottom:10,
    },
    botonAzul: {
        backgroundColor: "#0776A0",
        width: 150,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        padding:11,
        marginTop: 20,
        marginBottom:15
    },

});

export default HijoVista;
