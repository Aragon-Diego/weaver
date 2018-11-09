import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native';
import firebase from 'firebase';
class AgregarTarea extends Component{
    state={
       titulo:"",
       puntos:"",
       descrip: "",
    }
    componentWillMount=()=>{
        this.setState({
            titulo:this.props.titulo,
            descrip:this.props.descripcion,
            puntos:this.props.puntos
        })
    }
    changeTituloHandler=(text)=>{
        this.setState({
            titulo:text
        });
    };
    changePuntosHandler=(text)=>{
        let punt = text;
        if (parseInt(punt) < 0) {
            Alert.alert("Error al agregar Recompensa", "Los puntos no pueden ser negativos.", [{
                text: 'Ok'
            }])

            punt = "";
        }
        this.setState({
            puntos: punt
        });
    };
    changeDescripHandler=(text)=>{
        this.setState({
            descrip: text
        });
    };
    subirTarea=()=>{
        const titulo=this.state.titulo;
        const puntos=this.state.puntos;
        const descrip=this.state.descrip;
        if(titulo==""){
            Alert.alert("Error al agregar Recompensa", "La Recompensa tiene que tener titulo.", [{
                text: 'Ok'
            }])
            return;
        };
        if(puntos==""){
            Alert.alert("Error al agregar Recompensa", "La Recompensa tiene que tener puntos.", [{
                text: 'Ok'
            }])
            return;
        };
        const user = firebase.auth().currentUser;
        firebase.database().ref('Padres/' + user.uid+"/Recompensas/"+titulo).set({ 
            "titulo":titulo,
            "puntos":puntos,
            "descripcion":descrip,
        })
        firebase.database().ref('Hijos/').once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.val().Padre==user.uid){
              firebase.database().ref('Hijos/' + childSnapshot.key+"/Recompensas/"+titulo).set({
                "titulo":titulo,
                "puntos":puntos,
                "descripcion":descrip,
            });
            }
        });
    });
    Alert.alert("Correcto", "Recompensa agregada con éxito.", [{
        text: 'Ok'
    }])
    }
    deseaEliminar=()=>{
        Alert.alert("Cuidado", "¿Desea eliminar recompensa?.", [{text: 'No'},{
            text:'Si', onPress:()=>this.eliminarTarea()
        }])
    }
    eliminarTarea=()=>{
        const titulo = this.state.titulo;
        const user = firebase.auth().currentUser;
        firebase.database().ref('Padres/' + user.uid + "/Recompensas/" + titulo).remove();
        firebase.database().ref('Hijos/').once("value").then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
            if(childSnapshot.val().Padre==user.uid){
                firebase.database().ref('Hijos/'+childSnapshot.key+'/Recompensas/'+titulo).remove()
            }
        });
        })
    }
    render(){
        return(
            <View style={{alignItems:"center",width:"100%"}}>
                <TextInput style={styles.input} maxLength={38} 
                        placeholder={"   "+this.props.titulo+":"} placeholderTextColor="#9e9e9e" editable={false} selectTextOnFocus={false}
                        value={this.props.titulo}/>
                        
                <TextInput style={styles.input} maxLength={3} 
                        placeholder = "   Puntos:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changePuntosHandler} value={this.state.puntos}/>
                <TextInput style={styles.inputDes} maxLength={220} multiline = {true} numberOfLines = {4}
                        placeholder = "   Descripción:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeDescripHandler} value={this.state.descrip}/>
                <TouchableOpacity onPress={this.subirTarea} style={styles.botonNaraja}><Text style={{color:"#ffffff",fontSize:18}}>Agregar</Text></TouchableOpacity>
                <View style={{width:"90%",height:50,flexWrap: 'wrap',flexDirection:'row',position:"relative",marginBottom:20}}>
                    <TouchableOpacity onPress={this.deseaEliminar} style={styles.botonRojo}><Text style={{color:"#ffffff",fontSize:18}}>Eliminar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.subirTarea} style={styles.botonAzul}><Text style={{color:"#ffffff",fontSize:18}}>Actualizar</Text></TouchableOpacity>
                </View>
           </View>  
        );
    }
};

const styles = StyleSheet.create({
    input: {
        width: "90%",
        height: 50,
        fontSize: 18,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "#9e9e9e",
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10
    },
    inputFecha: {
        width: "60%",
        height: 50,
        fontSize: 18,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "#9e9e9e",
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10
    },
    inputDes: {
        width: "90%",
        height: 150,
        fontSize: 18,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "#9e9e9e",
        borderRadius: 5,
        marginBottom: 10,
    },
    botonAzul: {
        backgroundColor: "#0776A0",
        width: 150,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        padding: 11,
        marginTop: 20,
        marginBottom: 15, 
        position:"absolute",
        right:0
    },
    botonRojo: {
        backgroundColor: "red",
        width: 150,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        padding: 11,
        marginTop: 20,
        marginBottom: 15,
        position:"absolute",
        left:0
    },

});
export default AgregarTarea;