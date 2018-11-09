import React,{Component} from 'react';
import {View,Text,AsyncStorage,ScrollView,RefreshControl,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Header from './Header2';
import TareaN from '../Components/TareaHijoNuevo';
import Tarea from '../Components/TareaHijo';
import TareaP from '../Components/TareaHijoPendiente';
import TareaR from '../Components/TareaHijoRechazada';
import renderIf from '../renderIf';
import VerTareaH from './VerTareaH';
import VerTareaRechazadaH from './VerTareaRechazadaH';
class PantallaTareaH extends Component{
    state = {
        Tareas: [],
        hide:true,
        codigo:"",
        refreshing:false,
        detalle:false,
        titulo:"",
        descripcion:"",
        fecha:"",
        fechai:"",
        puntos:"",
        tipo:"",
        estado:"",
        diaDeHoy:20190101
    };
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.resp();
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
    changeDetalleHandler=()=>{
        detalle=!this.state.detalle
        this.setState({
            detalle:detalle
        })
        this.resp()
    }
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
    componentWillMount = async () => {
        await this.displayData()
        const dia=this.dia()
        let arr = []
        await firebase.database().ref('Hijos/' + this.state.codigo + '/Tareas').once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childSnapshot.forEach(function (tareasSnapshot) {
                    let newPost = tareasSnapshot.val();
                    if (newPost.fechai <=dia) { //en lugar del 2 va el value del dia de hoy
                        let Tarea = {
                            titulo: newPost.titulo,
                            fecha: newPost.fecha,
                            descripcion: newPost.descripcion,
                            puntos: newPost.puntos,
                            nuevo: newPost.nuevo,
                            fechai: newPost.fechai,
                            tipo: newPost.tipo
                        }
                        arr.push(Tarea)
                    }
                })
            })
        })
        this.setState({
            Tareas: arr,
            refreshing: false,
        })
    }
    cambioNuevaTarea=(arr,nombre)=>{
        firebase.database().ref('Hijos/' +this.state.codigo + "/Tareas/"+arr[1]+"/"+nombre+"/nuevo/").set({
            "nuevo": 0
        });
        
        this.llenarEstadoDeTarea(arr);
        
    }
    llenarEstadoDeTarea= (arr)=>{
        this.setState({
            titulo:arr[0],
            descripcion:arr[3],
            fecha:arr[2],
            fechai:arr[1],
            puntos:arr[4],
            tipo:arr[5],
            estado:arr[6]
        })
        this.changeDetalleHandler();
        return
    }
    resp = async () => {
        let arr = []
        const user = firebase.auth().currentUser;
        const dia=this.dia()
        await firebase.database().ref('Hijos/' + this.state.codigo + '/Tareas').once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childSnapshot.forEach(function (tareasSnapshot) {
                    let newPost = tareasSnapshot.val();
                    if (newPost.fechai <= dia) { //en lugar del 2 va el value del dia de hoy
                        let Tarea = {
                            titulo: newPost.titulo,
                            fecha: newPost.fecha,
                            descripcion: newPost.descripcion,
                            puntos: newPost.puntos,
                            nuevo: newPost.nuevo,
                            fechai: newPost.fechai,
                            tipo: newPost.tipo
                        }
                        arr.push(Tarea)
                    }
                })
            })
        })
        this.setState({
            Tareas: arr,
            refreshing:false,
        })
    }
    render(){
        let arr=this.state.Tareas.map((tarea,index)=>{
            let arreglo=[tarea.titulo,tarea.fechai,tarea.fecha,tarea.descripcion,tarea.puntos,tarea.tipo,tarea.nuevo.nuevo]
            if(tarea.nuevo.nuevo==1){
                return(
                     <TouchableOpacity onPress={()=>this.cambioNuevaTarea(arreglo,tarea.titulo)}>
                         <TareaN nombre={tarea.titulo} fecha={tarea.fecha} descripcion={tarea.descripcion} puntos={tarea.puntos} key={index}/>
                     </TouchableOpacity>
                );
            }else if (tarea.nuevo.nuevo==0){
                return(
                    <TouchableOpacity onPress={()=>this.llenarEstadoDeTarea(arreglo)}>
                        <Tarea nombre={tarea.titulo} fecha={tarea.fecha} descripcion={tarea.descripcion} puntos={tarea.puntos} key={index}/> 
                    </TouchableOpacity>
                );
            }else if(tarea.nuevo.nuevo==3){
                return(
                    <TouchableOpacity onPress={()=>this.llenarEstadoDeTarea(arreglo)}>
                        <TareaR nombre={tarea.titulo} fecha={tarea.fecha} descripcion={tarea.descripcion} puntos={tarea.puntos} key={index}/> 
                    </TouchableOpacity>   
                );
            }else{
                return(
                    <TareaP nombre={tarea.titulo} fecha={tarea.fecha} descripcion={tarea.descripcion} puntos={tarea.puntos} key={index}/>
                );
            }
        })
        let vista=<VerTareaH codigo={this.state.codigo} titulo={this.state.titulo} fechai={this.state.fechai} fecha={this.state.fecha} puntos={this.state.puntos} descripcion={this.state.descripcion} tipo={this.state.tipo} regresar={this.changeDetalleHandler}/>
        if(this.state.estado==3){
            vista=<VerTareaRechazadaH codigo={this.state.codigo} titulo={this.state.titulo} fechai={this.state.fechai} fecha={this.state.fecha} puntos={this.state.puntos} descripcion={this.state.descripcion} tipo={this.state.tipo} regresar={this.changeDetalleHandler}/>
        }
        return(
            <View style={{width:"100%",height:"100%",backgroundColor:"#fafafa",alignItems:"center"}}>
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <ScrollView style={{width:"100%"}}contentContainerStyle={{alignItems:"center"}} refreshControl={ 
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />} >
                    <Text style={{fontSize:24,alignSelf:"center"}}>Tareas Hijo</Text>
                    {renderIf(!this.state.detalle,arr)}
                    {renderIf(this.state.detalle,vista)}
                </ScrollView>
            </View>
        );
    }
};

export default PantallaTareaH;
