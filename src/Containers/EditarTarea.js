import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Picker} from 'react-native';
import firebase from 'firebase';
class AgregarTarea extends Component{
    state={
       titulo:"",
       fechai:"",
       fecha:"",
       puntos:"",
       descrip: "",
       tipo:"soloUnaVez",
       arr:[]
    }
    restarTotal = async () => {
        const arr = this.state.arr
        for (i = 0; i < arr.length; i++) {
            let puntos2;
            await firebase.database().ref("Hijos/" + arr[i] + "/total/").once("value", (snap) => {
                puntos2 = snap.val().total
            })
            let puntos = Number.parseInt(puntos2) - 1
            await firebase.database().ref("Hijos/" + arr[i] + "/total/").set({
                "total": puntos
            });
        }
    }
    componentWillMount=()=>{
        this.setState({
            titulo:this.props.titulo,
            fecha:this.props.fecha,
            fechai:this.props.fechai,
            puntos:this.props.puntos,
            descrip:this.props.descripcion,

        })
    }
    changeTituloHandler=(text)=>{
        this.setState({
            titulo:text
        });
    };
    changeFechafHandler=(text)=>{
        this.setState({
            fecha: text
        });
    };
    changeFechaiHandler=(text)=>{
        this.setState({
            fechai: text
        });
    };
    changePuntosHandler=(text)=>{
        let punt = text;
        if (parseInt(punt) < 0) {
            Alert.alert("Error al agregar Tarea", "Los puntos no pueden ser negativos.", [{
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
        const fecha=this.state.fecha;
        const fechai = this.state.fechai;
        const puntos=this.state.puntos;
        const descrip=this.state.descrip;
        const tipo=this.state.tipo;
        if(titulo==""){
            Alert.alert("Error al agregar Tarea", "La tarea tiene que tener titulo.", [{
                text: 'Ok'
            }])
            return;
        };
        if(fecha==""){
            Alert.alert("Error al agregar Tarea", "La tarea tiene que tener fecha.", [{
                text: 'Ok'
            }])
            return;
        };
        if (fechai == "") {
            Alert.alert("Error al agregar Tarea", "La tarea tiene que tener fecha.", [{
                text: 'Ok'
            }])
            return;
        };
        if(puntos==""){
            Alert.alert("Error al agregar Tarea", "La Tarea tiene que tener puntos.", [{
                text: 'Ok'
            }])
            return;
        };
        const user = firebase.auth().currentUser;
        firebase.database().ref('Padres/' + user.uid+"/Tareas/"+fechai+titulo).set({ 
            "titulo":titulo,
            "fecha":fecha,
            "fechai":fechai,
            "puntos":puntos,
            "descripcion":descrip,
            "tipo":tipo
        })
        firebase.database().ref('Hijos/').once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.val().Padre==user.uid){
              firebase.database().ref('Hijos/' + childSnapshot.key+"/Tareas/"+fechai+"/"+titulo).set({
                "titulo":titulo,
                "fecha":fecha,
                "fechai":fechai,
                "puntos":puntos,
                "descripcion":descrip,
                "tipo":tipo,
                "nuevo":{
                    "nuevo":1
                }
            });
            }

        });
    });
    Alert.alert("Correcto", "Tarea agregada con éxito.", [{
        text: 'Ok'
    }])
    }
    deseaEliminar=()=>{
        Alert.alert("Cuidado", "¿Desea eliminar tarea?", [{text: 'No'},{
            text:'Si', onPress:()=>this.eliminarTarea()
        }])
    }
    eliminarTarea=async ()=>{
        const titulo = this.state.titulo;
        const fechai = this.state.fechai;
        const user = firebase.auth().currentUser;
        firebase.database().ref('Padres/' + user.uid + "/Tareas/" +fechai+titulo).remove();
        firebase.database().ref('Hijos/').once("value").then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
            if(childSnapshot.val().Padre==user.uid){
                firebase.database().ref('Hijos/'+ childSnapshot.key+"/Tareas/"+fechai+"/"+titulo).remove()
            }
        });
        })
        let arr=[];
        await firebase.database().ref('Hijos/').once("value").then(function (snapshotP) {
            snapshotP.forEach(function (childSnapshot) {
                if (childSnapshot.val().Padre == user.uid) {
                    arr.push(childSnapshot.key)
                }
            })
        })
        this.setState({
            arr:arr
        })
        this.restarTotal()
    }
    render(){
        return(
           <View style={{alignItems:"center",width:"100%"}}>
                <TextInput style={styles.input} maxLength={38} 
                        placeholder ={"   "+this.props.titulo+":"} placeholderTextColor="#9e9e9e" editable={false} selectTextOnFocus={false}
                        value={this.props.titulo}/>
                <View style={{width:"90%",flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
                    <TextInput style={styles.inputFecha2} maxLength={8} 
                            placeholder = "   Fecha Inicio:" placeholderTextColor="#9e9e9e"
                            onChangeText={this.changeFechaiHandler} value={this.state.fechai}/>
                    <TextInput style={styles.inputFecha} maxLength={8} 
                            placeholder = "   Fecha limite:" placeholderTextColor="#9e9e9e"
                            onChangeText={this.changeFechafHandler} value={this.state.fecha}/>
                    <View style={{heigth:20 /*borderStyle:"solid",borderWidth: 3,borderColor: "#9e9e9e",borderRadius:5*/}}>
                        <Picker
                            selectedValue={this.state.tipo}
                            style={{width: 120,}}
                            onValueChange={(itemValue, itemIndex) => this.setState({tipo: itemValue})}>
                                <Picker.Item label="Una sola vez" value="soloUnaVez" />
                                <Picker.Item label="Todos los días" value="diario" />
                                <Picker.Item label="Cada semana" value="semanal" />
                                <Picker.Item label="Cada mes" value="mensual" />
                        </Picker>
                    </View>
                </View>
                <TextInput style={styles.input} maxLength={3} 
                        placeholder = "   Puntos:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changePuntosHandler} value={this.state.puntos}/>
                <TextInput style={styles.inputDes} maxLength={220} multiline = {true} tipoberOfLines = {4}
                        placeholder = "   Descripción:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeDescripHandler} value={this.state.descrip}/>
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
    inputFecha2: {
        width: "100%",
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