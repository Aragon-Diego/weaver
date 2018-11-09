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
    componentWillMount=()=>{
        let arr = []
        const user = firebase.auth().currentUser;
        firebase.database().ref('Padres/' + user.uid + "/TareasPendientes/").on("child_added", (snapshot, prevChildKey) => {
            let newPost = snapshot.val();
            let tarea = {
                titulo: newPost.titulo,
                puntos: newPost.puntos,
                descripcion: newPost.descripcion,
                codigo:newPost.codigo,
                nombre:newPost.nombre,
                fechai:newPost.fechai
            }
            arr.push(tarea)
        })
        this.setState({
            tareas:arr,
        })
    }
    cambiarDetalleHandler=()=>{
        this.setState({
            detalles:!this.state.detalles
        });
    }
    cambiarEstadoHandler=(tarea)=>{
        this.setState({
            titulo:tarea.titulo,
            puntos:tarea.puntos,
            descripcion:tarea.descripcion,
            codigo:tarea.codigo,
            nombre:tarea.nombre,
            fechai:tarea.fechai
        });
        this.cambiarDetalleHandler();
    }
    render=()=>{
        let arr = this.state.tareas.map((tarea, index) => {
            return (
                <TouchableOpacity onPress={()=>this.cambiarEstadoHandler(tarea)}>
                    <Tarea key={index} titulo={tarea.titulo} puntos={tarea.puntos} descripcion={tarea.descripcion} codigo={tarea.codigo} nombre={tarea.nombre} fechai={tarea.fechai}/>
                </TouchableOpacity>
            );
        });
        return(
            
            <View style={{width:"100%",height:"100%",backgroundColor:"#fafafa",alignItems:"center"}}> 
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <Text style={{fontSize:24}}>Tareas Pendientes</Text>
                {renderIf(!this.state.detalles,arr)}
                {renderIf(this.state.detalles,<TareaPendiente codigo={this.state.codigo} 
                descripcion={this.state.descripcion} nombre={this.state.nombre} 
                puntos={this.state.puntos} titulo={this.state.titulo} fechai={this.state.fechai} regresar={this.cambiarDetalleHandler}/> )}    
            </View> 
        );
    }
};

export default PantallaTareasP;