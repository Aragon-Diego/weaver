import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Picker} from 'react-native';
import firebase from 'firebase';
class AgregarTarea extends Component{
    state={
       titulo:"",
       fechai:"",
       fechaf:"",
       puntos:"",
       descrip: "",
       tipo:"soloUnaVez",
       arr:[],
       categoria:"cocina"
    }
    changeTituloHandler=(text)=>{
        this.setState({
            titulo:text
        });
    };
    changeFechafHandler=(text)=>{
        this.setState({
            fechaf: text
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
    changeTipoHandler=(text)=>{
        let punt = text;
        if (parseInt(punt) < 0) {
            Alert.alert("Error al agregar Tarea", "Una tarea no puede tener # de veces negativo.", [{
                text: 'Ok'
            }])
            punt = "";
        }
        this.setState({
            tipo: punt
        });
    };
    changeDescripHandler=(text)=>{
        this.setState({
            descrip: text
        });
    };
    sumarTotal=async ()=>{
        const arr=this.state.arr
        for(i=0;i<arr.length;i++){
            let puntos2;
            await firebase.database().ref("Hijos/" + arr[i] + "/total/").once("value", (snap) => {
                puntos2 = snap.val().total
            })
            let puntos = Number.parseInt(puntos2) + 1
            await firebase.database().ref("Hijos/" + arr[i]+ "/total/").set({
                "total": puntos
            });
        }   
    }
    subirTarea=async ()=>{
        const titulo=this.state.titulo;
        const fecha=this.state.fechaf;
        const fechai=this.state.fechai;
        const puntos=this.state.puntos;
        const descrip=this.state.descrip;
        const tipo=this.state.tipo;
        const categoria=this.state.categoria;
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
        if(puntos==""){
            Alert.alert("Error al agregar Tarea", "La Tarea tiene que tener puntos.", [{
                text: 'Ok'
            }])
            return;
        };
        if(tipo==""){
            Alert.alert("Error al agregar Tarea", "Escoge una frecuencia.", [{
                text: 'Ok'
            }])
            return;
        }
        const user = firebase.auth().currentUser;
        let arr=[]
        let error=false
        firebase.database().ref('Padres/' + user.uid + "/Tareas/" + titulo).once("value").then(function (snapshot) {
            if (!snapshot.exists()) {
                firebase.database().ref('Padres/' + user.uid + "/Tareas/"+fechai + titulo).set({
                    "titulo": titulo,
                    "fecha": fecha,
                    "fechai": fechai,
                    "puntos": puntos,
                    "descripcion": descrip,
                    "tipo":tipo,
                    "categoria":categoria

                })
                firebase.database().ref('Hijos/').once("value").then(function (snapshotP) {
                    snapshotP.forEach(function (childSnapshot) {
                        if (childSnapshot.val().Padre == user.uid) {
                           
                            firebase.database().ref('Hijos/' + childSnapshot.key + "/Tareas/"+fechai+"/" + titulo).set({
                                "titulo": titulo,
                                "fecha": fecha,
                                "fechai": fechai,
                                "puntos": puntos,
                                "descripcion": descrip,
                                "tipo":tipo,
                                "nuevo":{
                                    nuevo: 1
                                }
                            });
                        }
                    });
                    // Alert.alert("Correcto", "Tarea agregada con éxito.", [{
                    //     text: 'Ok'
                    // }]);
                });
            } else {
                Alert.alert("Error tarea repetida", "Escoge un nombre diferente para el titulo.", [{
                    text: 'Ok'
                }])
                error=true;
            }
        });
        this.setState({
            titulo:"",
            fechaf:"",
            fechai: "",
            puntos:"",
            descrip:"",
            arr:arr
        })
        if(!error){
           await firebase.database().ref('Hijos/').once("value").then(function (snapshotP) {
               snapshotP.forEach(function (childSnapshot) {
                   if (childSnapshot.val().Padre == user.uid) {
                       arr.push(childSnapshot.key)
                   }
               })
           })
           this.sumarTotal()
        }
    }
    render(){
        return(
           <View style={{alignItems:"center",width:"100%"}}>
                <TextInput style={styles.input} maxLength={38} 
                        placeholder = "   Titulo:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeTituloHandler} value={this.state.titulo}/>
                <Picker
                    selectedValue={this.state.categoria}
                    style={{width: "90%",height:50}}
                    onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}>
                        <Picker.Item label="Cocina" value="soloUnaVez" />
                        <Picker.Item label="Escuela" value="diario" />
                        <Picker.Item label="Higiene personal" value="higienePersonal" />
                        <Picker.Item label="Limpieza" value="limpieza" />
                        <Picker.Item label="Salida" value="salida" />
                        <Picker.Item label="Otros..." value="otros" />
                </Picker>
                <TextInput style={styles.inputFecha2} maxLength={8} 
                        placeholder = "   Fecha Inicio:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeFechaiHandler} value={this.state.fechai}/>
                <TextInput style={styles.inputFecha} maxLength={8} 
                        placeholder = "   Fecha limite:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeFechafHandler} value={this.state.fechaf}/>
    
                <Picker
                    selectedValue={this.state.tipo}
                    style={{width:"90%",height:50,}}
                    onValueChange={(itemValue, itemIndex) => this.setState({tipo: itemValue})}>
                        <Picker.Item label="Una sola vez" value="soloUnaVez" />
                        <Picker.Item label="Todos los días" value="diario" />
                        <Picker.Item label="Cada semana" value="semanal" />
                        <Picker.Item label="Cada mes" value="mensual" />
                </Picker>
                <TextInput style={styles.input} maxLength={3} 
                        placeholder = "   Puntos:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changePuntosHandler} value={this.state.puntos}/>
                <TextInput style={styles.inputDes} maxLength={220} multiline = {true} tipoberOfLines = {4}
                        placeholder = "   Descripción:" placeholderTextColor="#9e9e9e"
                        onChangeText={this.changeDescripHandler} value={this.state.descrip}/>
                <TouchableOpacity onPress={this.subirTarea} style={styles.botonNaraja}><Text style={{color:"#ffffff",fontSize:18}}>Agregar tarea</Text></TouchableOpacity>
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
        marginTop:10,
        
    },
    inputFecha: {
        width: "90%",
        height: 50,
        fontSize: 18,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "#9e9e9e",
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        
    },
    inputFecha2: {
        width: "90%",
        height: 50,
        fontSize: 18,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "#9e9e9e",
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        
    },
    inputDes: {
        width: "90%",
        height: 100,
        fontSize: 18,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "#9e9e9e",
        borderRadius: 5,
        marginBottom: 10,
    },
    botonNaraja: {
        backgroundColor: "#ff8500",
        width: 150,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        padding: 11,
        marginBottom: 10
    },

});
export default AgregarTarea;