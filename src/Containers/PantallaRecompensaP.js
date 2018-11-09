import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Header from './Header2';
import Recompensas from './Recompensas';
import renderIf from '../renderIf';
import AgregarRecompensas from  './AgregarRecompensas';
import EditarRecompensas from './EditarRecompensas';
let arr = [];
class PantallaRecompensaP extends Component{
    state = {
        Recompensas: [],
        hideAgregar:true,
        hideEditar:true,
        count:0,
        titulo:"",
        puntos:"",
        descripcion:"",
    };

    buttonchange=(arr)=>{
        this.setState({
            hideEditar:!this.state.hideEditar,
            titulo:arr[0],
            puntos:arr[1],
            descripcion:arr[2],
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
        return(
            
            <View style={{width:"100%",height:"100%",backgroundColor:"#fafafa",alignItems:"center"}}> 
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <Text style={{fontSize:24}}>Recompensas</Text>
                {renderIf(this.state.hideAgregar && this.state.hideEditar,
                    <View style={{width:"100%",height:"100%",alignItems:"center"}}>
                        <Recompensas clicks={this.buttonchange}/>   
                        <TouchableOpacity onPress={()=>this.setState({hideAgregar:false})}style={estilo[0]}><Text style={estilo[1]}>Agregar</Text></TouchableOpacity>                          
                    </View>
                )}
                {renderIf(!this.state.hideAgregar && this.state.hideEditar,
                    <View style={{width:"100%",height:"100%",alignItems:"center"}}>
                        <AgregarRecompensas/>         
                        <TouchableOpacity onPress={()=>this.setState({hideAgregar:true})}style={{marginTop:20}}><Text style={{textDecorationLine:"underline"}}>Regresar</Text></TouchableOpacity>
                    </View>
                )}
                {
                    renderIf(!this.state.hideEditar && this.state.hideAgregar,
                    <View style={{width:"100%",height:"100%",alignItems:"center"}}> 
                        <EditarRecompensas titulo={this.state.titulo} fecha={this.state.fecha} tipo={this.state.tipo} puntos={this.state.puntos} descripcion={this.state.descripcion}/>
                        <TouchableOpacity onPress={()=>this.setState({hideEditar:true})}style={{marginTop:20}}><Text style={{textDecorationLine:"underline"}}>Regresar</Text></TouchableOpacity>
                    </View>
                )}
            </View> 
        );
    }
};

export default PantallaRecompensaP;