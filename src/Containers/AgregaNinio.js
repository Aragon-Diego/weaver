/*
Autores:Diego Aragón,Roberto González,Alan Ricardo
Fecha de creación:02/10/2018
Fecha de ultima modificación:08/10/2018
Por quien fue modificado: Diego Aragón
Motivo de modificación: Quitar caracteres dificiles en código de niño, quitar niños con nombre "".
*/
import React,{Component} from 'react';
import {View,TextInput,StyleSheet,TouchableOpacity,Text,Alert} from 'react-native';
import Header from './Header2';
import firebase from 'firebase';
/*
    Componente principal de AgregarNinio.js
*/
class AgregaNinio extends Component{
    /*
        Objeto de estado del componente
    */
    state={
        nombre:""
    }
    /*
        Función para generar al hijo, crearlo, validar y subir al la base de datos
    */
    generateHijo=()=>{
        const idHijo= this.generarCodigo(); //llamada a generar el código de niño string de 6 caracteres
        const nombre=this.state.nombre;
        if(nombre===""){//valida que el nombre del hijo no esté vacío
            Alert.alert("Hijo NO agregado", "error, el nombre está vacio", [{
                text: 'Ok'
            }]);
        }else{
            firebase.database().ref('Hijos/' + idHijo).set({ //sube objeto hijo a firebase
                "Nombre": nombre,
                "Padre": firebase.auth().currentUser.uid,//agrega el id de padre
                "puntos":{
                    puntos:0
                },
                "total": {
                    total: 0
                },
                "cant": {
                    cant: 0
                },
            });
            Alert.alert("Hijo agregado con exito", "Codigo de acceso: " + idHijo, [{
                text: 'Ok'
            }]);
            this.setState({
                nombre:"",
            });
        }
    }
    /*
        Regresa un código string de 6 caracteres aleatorios
    */
    generarCodigo=()=>{
        let text = "";
        let possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghstwxyz123456789";
        for (let i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    /*
        Función de cambio de estado de estado
    */
    changeNombreHandler=(event)=>{
        const text = event;
        this.setState({nombre:text});
    }
    render(){
        const registro = () => this.props.navigation.navigate('Registro');//función de navegacion a vista registro
        /*
            Vista de componente en JSX
        */
        return(
            <View style={styles.div}>
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <View style={styles.divAgregar}>
                    <View style={{width:"100%",height:"10%",alignItems:"center"}}>
                        <Text style={{fontSize:24}}>Agregar hijo</Text>
                    </View>
                    <View style={{width:"100%",height:50,marginTop:35,alignItems:"center"}}>
                        <TextInput style={styles.input} maxLength={20}
                        placeholder = "   Nombre:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeNombreHandler} value={this.state.nombre}/>
                    </View>
                    <View style={{with:"100%",height:"80%",alignItems:"center"}}>
                        <TouchableOpacity style={styles.botonNaraja} onPress={this.generateHijo} ><Text style={{color:"#ffffff",fontSize:18}}>Agregar</Text></TouchableOpacity>
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
    divAgregar:{
        width:"100%",
        height:"85%",
        marginTop:8,
        alignItems:"center"
    },
    input:{
        width:"90%",
        height:"100%",
        fontSize:18,
        borderStyle:"solid",
        borderWidth:3,
        borderColor:"#9e9e9e",
        borderRadius: 5,
        marginBottom:10,
    },
    botonNaraja:{
        backgroundColor:"#ff8500",
        width:150,
        height:50,
        borderRadius:5,
        alignItems:"center",
        padding:11,
        marginTop: 20,
        marginBottom:15    
    },       
});

export default AgregaNinio;