/*
Autores:Diego Aragón,Roberto González,Alan Ricardo
Fecha de creación:02/10/2018
Fecha de ultima modificación:08/10/2018
Por quien fue modificado: Diego Aragón
Motivo de modificación: Detallar try catch en errores de registro.
*/
import React,{Component} from 'react';
import {View,TextInput,StyleSheet,TouchableOpacity,Text,Alert,ScrollView} from 'react-native';
import Header from './Header';
import firebase from 'firebase';
import BarraDeProgreso from '../Components/BarraDeProgreso';

/*
    Componente principal de Registro.js, vista y validaciones de registro.
*/
class Registro extends Component{
    /*
        Objeto de tipo estado del componente
    */
    state={
        nombre:"",
        email:"",
        contrasenia:"",
        confirmaContrasenia:"",
    };
    /*
        Función para modificar el estado del nombre
    */
    changeNombreHandler=(event)=>{
        const text = event;
        this.setState({
            nombre:text,
        });
    };
    /*
        Función para modifica el estado del email
    */
    changeEmailHandler=(event)=>{
        const text = event;
        this.setState({
            email: text,
        });
    };
    /*
        Función para modificar el estado de la contraseña
    */
    changeContrseniaHandler=(event)=>{
        const text = event;
        this.setState({
            contrasenia: text,
        });
    };
    /*
        Función para modificar el estado del campo "confirmar contraseña"
    */
    changeConfContraHandler = (event) => {
        const text = event;
        this.setState({
            confirmaContrasenia: text,
        });
    };
    /*
        Funcion que valida, crea y sube objeto tipo padre 
    */
    subirUsuario= async ()=>{
        let email = this.state.email.toLowerCase();
        let contrasenia = this.state.contrasenia;
        let nombre=this.state.nombre;
        if(this.state.contrasenia==this.state.confirmaContrasenia){//checa que las dos contraseñas sean iguales  
            errorGeneral=false;//Variable que indica que no hay error general al para crear objeto padre
            firebase.auth().signOut();//Función de firebase de signOut para evitar errores
            await firebase.auth().createUserWithEmailAndPassword(email, contrasenia).catch(error=>{//Función de firebase que crea usuarios
                let errorCode =error.code;//Catch de error que llegó
                errorGeneral=true;//indica que si hay un error
                /*
                    Imprime según el error que haya encontrado
                */
                if(errorCode=='auth/weak-password'){
                    alert("La constraseña tiene que ser mayor de 5 caracteres");
                }
                if(errorCode=='auth/invalid-email'){
                    alert("Email no valido");
                }
                if(errorCode=='auth/email-already-in-use'){
                    alert("Email ya registrado");
                }
            });
            if(!errorGeneral){//si no encuentra error
                firebase.auth().onAuthStateChanged((user)=> {//Cambia el estado de usuario
                    if (user) {
                        firebase.database().ref('Padres/' + user.uid).set({//segun el ID del padre, agrega su nombre y email
                            "Nombre": nombre,
                            "Mail": email
                        })
                        /*aqui va sendVerif no probado */
                    }
                    //user.sendEmailVerification().catch();//envía el email de verifiacion
                });
                /*Alert.alert("Email de verificacion", "Enviado", [{
                    text: 'Ok'
                }]);*/
                (() => this.props.navigation.navigate('Agregar'))();//función que navega a vista de Agregar hijo
            }
        }else{//Si las contraseñas no son iguales
            Alert.alert("Error de Registro", "Las contraseñas no concuerdan", [{
            text: 'Ok'
            }]);
        }        
    }
    render(){
        const login =()=> this.props.navigation.navigate('Login');//función de navegación a vista login
        const hijoLogin =()=>this.props.navigation.navigate('HijoLogin');//función de navegación a vista de Login hijo
        /*
            Vista de componente en JSX
        */
        return(
            <ScrollView contentContainerStyle={{width:"100%",height:"100%"}}>
            <View style={styles.div}>
                <Header/>
                <View style={styles.divRegistro}>
                    <View style={{width:"100%",alignItems:"center"}}>
                        <TextInput style={styles.input} maxLength={20}
                        placeholder = "   Nombre:" placeholderTextColor="#9e9e9e" 
                        onChangeText={this.changeNombreHandler} value={this.state.nombre}/>

                        <TextInput style={styles.input} maxLength={40} 
                        placeholder = "   Email:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeEmailHandler} value={this.state.email}/>

                        <TextInput style={styles.input} maxLength={20} secureTextEntry={true}
                        placeholder = "   Contraseña:" placeholderTextColor="#9e9e9e" 
                        onChangeText={this.changeContrseniaHandler} value={this.state.contrasenia}/>

                        <TextInput style={styles.input} maxLength={20} secureTextEntry={true}
                        placeholder = "   Confirmar Contraseña:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeConfContraHandler} value={this.state.confirmaContrasenia}/>     
                    </View>
                    <View style={{width:"100%",alignItems:"center"}}>
                        <TouchableOpacity style={styles.botonNaraja} onPress={this.subirUsuario}><Text style={{color:"#ffffff",fontSize:18}}>Registrarse</Text></TouchableOpacity>
                        <TouchableOpacity style={{marginBottom:20}} onPress={login}><Text style={{textDecorationLine:"underline",fontSize:18}}>¿Ya tienes cuenta?</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.botonAzul} onPress={hijoLogin}><Text style={{color:"#ffffff",fontSize:18}}>¿Eres hijo?</Text></TouchableOpacity>
                       
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
};
/*
    Hoja de estilos de JSX
*/
const styles = StyleSheet.create({
    div:{
        width:"100%",
        height:"100%",
        backgroundColor:"#fafafa",
        alignItems: "center",
        color:"#ffffff",
    },
    divRegistro:{
        width:"100%",
        height:"85%",
        marginTop:8,
        alignItems:"center"
    },
    input:{
        width:"90%",
        // minHeight:"20%",
        // maxHeight:"20%",
        height:50,
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
        marginBottom:10         
    },
    botonAzul: {
        backgroundColor: "#0776A0",
        width: 150,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        padding: 11,
        marginBottom: 10
    },
            
});

export default Registro;