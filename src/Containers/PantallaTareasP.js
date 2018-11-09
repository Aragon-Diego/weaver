import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity,RefreshControl} from 'react-native';
import firebase from 'firebase';
import Header from './Header2';
import Tarea from '../Components/Tarea';
import renderIf from '../renderIf';
import AgregarTarea from  './AgregarTarea';
import EditarTareas from './EditarTarea';

let arr = [];
class PantallaTareasP extends Component{
    state = {
        tareas: [],
        hideAgregar:true,
        hideEditar:true,
        count:0,
        titulo:"",
        puntos:"",
        fecha:"",
        fechai:"",
        tipo:"",
        descripcion:"",
        refreshing: false
        
    };
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.resp();
    }
    buttonchange=(arr)=>{
        this.setState({
            hideEditar:!this.state.hideEditar,
            titulo:arr[0],
            puntos:arr[2],
            tipo:arr[3],
            descripcion:arr[4],
            fecha:arr[1],
            fechai:arr[5]
        })
    };
    componentWillMount=async()=>{
        let arr = []
        const user = firebase.auth().currentUser;
        await firebase.database().ref('Padres/' + user.uid + "/Tareas/").on("child_added", (snapshot, prevChildKey) => {
            let newPost = snapshot.val();
            let tarea = {
                titulo: newPost.titulo,
                fecha: newPost.fecha,
                fechai: newPost.fechai,
                puntos: newPost.puntos,
                descripcion: newPost.descripcion,
                tipo: newPost.tipo,
                categoria:newPost.categoria
            }
            arr.push(tarea)
        })
        this.setState({
            tareas:arr,
            refreshing: false,
        })
    };
    resp = async () => {
        let arr = []
        const user = firebase.auth().currentUser;
        await firebase.database().ref('Padres/' + user.uid + "/Tareas/").on("child_added", (snapshot, prevChildKey) => {
            let newPost = snapshot.val();
            let tarea = {
                titulo: newPost.titulo,
                fecha: newPost.fecha,
                fechai: newPost.fechai,
                puntos: newPost.puntos,
                descripcion: newPost.descripcion,
                tipo: newPost.tipo,
                categoria: newPost.categoria
            }
            arr.push(tarea)
        })
        this.setState({
            tareas: arr,
            refreshing: false,
        })
    };
    render=()=>{
        
        let estilo = [{
            backgroundColor: "#0776A0",
            width: 150,
            height: 50,
            borderRadius: 5,
            alignItems: "center",
            padding: 11,
            marginTop: 20,
            marginBottom: 15
        },{color:"white",fontSize:18}];
        let otros=[];
        let salida=[];
        let limpieza=[];
        let higienePersonal=[];
        let escuela=[];
        let cocina=[];
        
        for(let i=0;i<this.state.tareas.length;i++){
            if(this.state.tareas[i].categoria=="otros"){
                otros.push(this.state.tareas[i])
            }
            else if (this.state.tareas[i].categoria == "salida") {
                salida.push(this.state.tareas[i])
            }
            else if (this.state.tareas[i].categoria == "limpieza") {
                limpieza.push(this.state.tareas[i])
            }
            else if (this.state.tareas[i].categoria == "higienePersonal") {
                higienePersonal.push(this.state.tareas[i])
            }
            else if (this.state.tareas[i].categoria == "escuela") {
                escuela.push(this.state.tareas[i])
            } else if (this.state.tareas[i].categoria == "cocina") {
                cocina.push(this.state.tareas[i])
            }
        }
        let arrOtro=otros.map((tarea,index)=>{return(
            <View style={{width:"100%"}}>
                <Tarea tipo={tarea.tipo} descripcion={tarea.descripcion} 
                puntos={tarea.puntos} nombre={tarea.titulo} fecha={tarea.fecha}
                fechai={tarea.fechai} key={index} clicks={this.buttonchange} />
            </View>
            )}
        );
        let arrLimpieza=limpieza.map((tarea,index)=>{return(
            <View style={{width:"100%"}}>
                <Tarea tipo={tarea.tipo} descripcion={tarea.descripcion} 
                puntos={tarea.puntos} nombre={tarea.titulo} fecha={tarea.fecha}
                fechai={tarea.fechai} key={index} clicks={this.buttonchange} />
            </View>
            )}
        );
        let arrHigiene=higienePersonal.map((tarea,index)=>{return(
            <View style={{width:"100%"}}>
                <Tarea tipo={tarea.tipo} descripcion={tarea.descripcion} 
                puntos={tarea.puntos} nombre={tarea.titulo} fecha={tarea.fecha}
                fechai={tarea.fechai} key={index} clicks={this.buttonchange} />
            </View>
            )}
        );
        let arrSalida=salida.map((tarea,index)=>{return(
            <View style={{width:"100%"}}>
                <Tarea tipo={tarea.tipo} descripcion={tarea.descripcion} 
                puntos={tarea.puntos} nombre={tarea.titulo} fecha={tarea.fecha}
                fechai={tarea.fechai} key={index} clicks={this.buttonchange} />
            </View>
            )}
        );
        let arrEscuela=escuela.map((tarea,index)=>{return(
            <View style={{width:"100%"}}>
                <Tarea tipo={tarea.tipo} descripcion={tarea.descripcion} 
                puntos={tarea.puntos} nombre={tarea.titulo} fecha={tarea.fecha}
                fechai={tarea.fechai} key={index} clicks={this.buttonchange} />
            </View>
            )}
        );
        let arrCocina=cocina.map((tarea,index)=>{return(
            <View style={{width:"100%"}}>
                <Tarea tipo={tarea.tipo} descripcion={tarea.descripcion} 
                puntos={tarea.puntos} nombre={tarea.titulo} fecha={tarea.fecha}
                fechai={tarea.fechai} key={index} clicks={this.buttonchange} />
            </View>
            )}
        );
        return(
            <View style={{width:"100%",height:"100%",backgroundColor:"#fafafa",alignItems:"center"}}> 
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <ScrollView style={{overflow:"hidden",width:"100%"}} contentContainerStyle={{flexGrow:1}} refreshControl={ 
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />}
                >
                <Text style={{fontSize:24,alignSelf:"center"}}>Tareas</Text>
                {renderIf(this.state.hideAgregar && this.state.hideEditar,
                    <View style={{width:"100%",height:"100%",alignItems:"center"}}>
                        {renderIf(arrCocina.length!=0,<View>
                             <Text>Cocina:</Text>
                             {arrCocina}
                             </View>
                             )}
                        {renderIf(arrEscuela.length!=0,<View>
                             <Text>Escuela:</Text>
                             {arrEscuela}
                             </View>
                             )}
                        {renderIf(arrHigiene.length!=0,<View>
                             <Text>Higiene personal:</Text>
                             {arrHigiene}
                             </View>
                             )}
                        {renderIf(arrLimpieza.length!=0,<View>
                             <Text>Limpieza:</Text>
                             {arrLimpieza}
                             </View>
                             )}
                        {renderIf(arrSalida.length!=0,<View>
                             <Text>Salidas:</Text>
                             {arrSalida}
                             </View>
                             )}
                        {renderIf(arrOtro.length!=0,<View>
                             <Text>Otros:</Text>
                             {arrOtro}
                             </View>
                             )}
                        <TouchableOpacity onPress={()=>this.setState({hideAgregar:false})}style={estilo[0]}><Text style={estilo[1]}>Agregar</Text></TouchableOpacity>                          
                    </View>
                )}
                {renderIf(!this.state.hideAgregar && this.state.hideEditar,
                    <View style={{width:"100%",height:"100%",alignItems:"center"}}>
                        <AgregarTarea/>         
                        <TouchableOpacity onPress={()=>this.setState({hideAgregar:true})}style={{marginTop:10,marginBottom:20}}><Text style={{textDecorationLine:"underline",fontSize:18}}>Regresar</Text></TouchableOpacity>
                    </View>
                )}
                {
                    renderIf(!this.state.hideEditar && this.state.hideAgregar,
                    <View style={{width:"100%",height:"100%",alignItems:"center"}}> 
                        <EditarTareas titulo={this.state.titulo}fechai={this.state.fechai} fecha={this.state.fecha} tipo={this.state.tipo} puntos={this.state.puntos} descripcion={this.state.descripcion}/>
                        <TouchableOpacity onPress={()=>this.setState({hideEditar:true})}style={{marginTop:10,marginBottom:20}}><Text style={{textDecorationLine:"underline",fontSize:18}}>Regresar</Text></TouchableOpacity>
                    </View>
                )}
                </ScrollView>
            </View> 
        );
    }
};

export default PantallaTareasP;