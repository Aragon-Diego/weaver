/*
Autores:Diego Aragón,Roberto González,Alan Ricardo
Fecha de creación:02/10/2018
Fecha de ultima modificación:05/10/2018
Por quien fue modificado: Diego Aragón
Motivo de modificación: Agregar asyncs y awaits a funciónes de firebase.
*/
import React,{Component} from 'react';
import {View,TextInput,StyleSheet,TouchableOpacity,Text,Alert} from 'react-native';
import Header from './Header';
import firebase from 'firebase';
/*
    Componente principal de Login.js.
    Vista de Login de padre, + función para hacer login
*/
class Login extends Component{
    /*
        Objeto de tipo estado de componente
    */
    state={
        email:"",
        contrasenia:""
    };
    /*
        Función para cambiar el estado de email
    */
    changeEmailHandler=(event)=>{
        const text=event;
        this.setState({
            email:text
        });
    };
    /*
        Función para cambiar el estado de la contraseña
    */
    changeContraseniaHandler=(event)=>{
        const text=event;
        this.setState({
            contrasenia:text
        });
    };
    /*
        Función que valida el el login de usuario padre
    */
    entrarLogin=async ()=>{
        let email=this.state.email.toLowerCase();
        let contrasenia=this.state.contrasenia;
        let errorGeneral=false;//variable que indica si hay algun tipo de error en la funcio de singIn
        firebase.auth().signOut();//Se llama a esta función para evitar errores
        await firebase.auth().signInWithEmailAndPassword(email, contrasenia).catch(error=>{//Función de SingIn de firebase
            errorGeneral = true;//cambia a que si hay error
            Alert.alert("Error de Inicio de Sesión", "No está registrado este email o la contraseña esta equivocada.", [{
                text: 'Ok'
            }]);//componente de alerta.
        });     
        if (!errorGeneral) {//si no hay error general, ir a vista de agregar, con usuario ya ingresado
            (() => this.props.navigation.navigate('Agregar'))();
        } 
    }
    /*
        función para resetear contraseña 
    */
    resetDePassword=async ()=>{
        const email=this.state.email;
        await firebase.auth().sendPasswordResetEmail(email).then(()=>{//función de firebase para resetear contraseña
            Alert.alert("Cambio de contraseña", "Se le envió un mail a su correo con las instrucciones.", [{
            text: 'Ok'
            }]).catch(()=>
                alert("Pon tu email en el campo de arriba")
            );
        })
    }
    render(){
        /*
            Vista de Login.js con JSX
        */
        return(
            <View style={styles.div}>
                <Header/>
                <View style={styles.divLogin}>
                    <View style={{width:"100%",alignItems:"center"}}>
                        <TextInput style={styles.input} maxLength={40}
                        placeholder = "   Email:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeEmailHandler} value={this.state.email}/>
                        <TextInput style={styles.input} secureTextEntry={true}
                        placeholder = "   Contraseña:" placeholderTextColor="#9e9e9e" maxLength={20}
                        onChangeText={this.changeContraseniaHandler} value={this.state.contrasenia}/>    
                    </View>
                    <View style={{with:"100%",alignItems:"center"}}>
                        <TouchableOpacity style={styles.botonNaraja} onPress={this.entrarLogin}><Text style={{color:"#ffffff",fontSize:18}}>Entrar</Text></TouchableOpacity>
                        <TouchableOpacity style={{marginBottom:40,alignItems:"center"}} onPress={this.resetDePassword}><Text style={{textDecorationLine:"underline",fontSize:18}}>¿Olvidaste tu contraseña?</Text></TouchableOpacity>
                        <TouchableOpacity style={{marginBottom:20}} onPress={() => this.props.navigation.navigate('Registro')}><Text style={{textDecorationLine:"underline",fontSize:18}}>¿No tienes cuenta?</Text></TouchableOpacity>
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
    divLogin:{
        width:"100%",
        height:"85%",
        marginTop:8,
        alignItems:"center"
    },
    input:{
        width:"90%",
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
        marginTop: 10,
        marginBottom:15    
    },       
});

export default Login;