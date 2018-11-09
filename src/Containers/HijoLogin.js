/*
Autores:Diego Aragón,Roberto González,Alan Ricardo
Fecha de creación:02/10/2018
Fecha de ultima modificación:05/10/2018
Por quien fue modificado: Diego Aragón
Motivo de modificación: Agregar vista de HijoVista
*/
import React,{Component} from 'react';
import {View,TextInput,StyleSheet,TouchableOpacity,Text,Image,AsyncStorage,Alert} from 'react-native';
import Header from './Header';
import firebase from 'firebase';

/*
    Componente principal de archivo.
    Vista de login hijo.
*/
class HijoLogin extends Component{
    /*
        Obejto de tipo estado inicializado
    */
    state={
        codigo:"",
        nombre:"",
        papa:"",
    };
    /*
        funcion que modifica el códigodel estado
    */
    changeCodigoHandler=(event)=>{
        const text = event;
        this.setState({
            codigo:text
        })
    };
    /*
        Funcion asincrona para saber sí hijo está en la base de datos.
        En caso de estarlo,cambio de vista a HijoVista dandole de props 
        el nombre de hijo y el nombre del padre
    */
    checkExist=async ()=>{
        const codigo=this.state.codigo;
        await this.saveData();
        await firebase.database().ref('Hijos/').once("value", async(snapshot)=>{
            if(snapshot.child(codigo).exists()){
                let nombre='';
                let papa='';
                await firebase.database().ref('Padres/').once("value", (snapshot2) => {
                    nombre=snapshot.child(codigo).val().Nombre;//snapshot para sacar el nombre del hijo según su código
                    papa=snapshot2.child(snapshot.child(codigo).val().Padre).val().Nombre;//snapshot para sacar el nombre del padre según el código del hijo
                });
                (() => this.props.navigation.navigate('HijoVista'))();//cambio de vista a HijoVista con propsnombre y nombre padre
            }else{
                Alert.alert("Error de acceso","No existe hijo con ese codigo");
            }
        });
    }
    render(){
        const registro = () => this.props.navigation.navigate('Registro');// funcion de navegacion a registro.
        /*
            Vista Login hijo con JSX
        */
        
        return(
            <View style={styles.div}>
                <Header/>
                <View style={styles.divHijoLogin}>
                    <View style={{width:"100%",alignItems:"center"}}>
                        <Text style={{color:"black",fontSize:40}}>Acceso Hijo</Text>
                    </View>
                    <View style={{width:"100%",marginTop:35,alignItems:"center"}}>
                        <TextInput style={styles.input} maxLength={6}
                        placeholder = "   Código:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeCodigoHandler} value={this.state.codigo}/>
                    </View>
                    <View style={{with:"100%",alignItems:"center"}}>
                        <TouchableOpacity style={styles.botonAzul} onPress={this.checkExist}><Text style={{color:"#ffffff",fontSize:18}}>Acceder</Text></TouchableOpacity>
                        <TouchableOpacity style={{marginBottom:20}} onPress={()=>Alert.alert("Preguntale a padre sobre el código","")}><Text style={{textDecorationLine:"underline",fontSize:18}}>¿No tienes código?</Text></TouchableOpacity>
                        <TouchableOpacity style={{marginBottom:20}} onPress={registro}><Text style={{textDecorationLine:"underline",fontSize:18}}>¿No eres hijo?</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
             
        );
    }
    saveData=async()=>{
        let user = this.state.codigo;
        await AsyncStorage.setItem('user', user);
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
    divHijoLogin:{
        width:"100%",
        height:"85%",
        marginTop:8,
        alignItems:"center"
    },
    input:{
        width:"90%",
        height: 50,
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

export default HijoLogin;