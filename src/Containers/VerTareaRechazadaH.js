import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Picker} from 'react-native';
import firebase from 'firebase';
class AgregarTarea extends Component{

    haTerminado=()=>{
        Alert.alert("¿Ha terminado la tarea?", "", [{text: 'No'},{
            text:'Si', onPress:()=>this.terminarTarea()
        }])
    }; 
    terminarTarea=()=>{
        let codigo = this.props.codigo;
        let titulo = this.props.titulo;
        let puntos = this.props.puntos;
        let fechai=this.props.fechai;
        let descripcion = this.props.descripcion;

        firebase.database().ref('Hijos/' + codigo + "/Tareas/"+fechai+"/"+ titulo + "/nuevo/").set({
            "nuevo": 2
        });
        firebase.database().ref('Hijos/' + codigo).once("value", function (snapshot) {
            firebase.database().ref("Padres/" +snapshot.val().Padre+ "/TareasPendientes/" + codigo + titulo).set({
                "titulo": titulo,
                "puntos": puntos,
                "descripcion":descripcion,
                "codigo": codigo,
                "nombre":snapshot.val().Nombre,
                "fechai":fechai
            });
        })

        Alert.alert("Correcto", "Se le notificará a tu padre que has terminado.", [{
            text: 'Ok'
        }])
    };
    render(){
        return(
           <View style={{alignItems:"center",width:"100%"}}>
                <TextInput style={styles.input} maxLength={38} 
                        placeholder ={"   "+this.props.titulo+":"} placeholderTextColor="#9e9e9e" editable={false} selectTextOnFocus={false}
                        value={this.props.titulo}/>
                <View style={{width:"90%",flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
                    <TextInput style={styles.inputFecha2} maxLength={8} 
                            value={this.props.fechai} editable={false}/>
                    <TextInput style={styles.inputFecha} maxLength={8} 
                            value={this.props.fecha} editable={false}/>
                    <TextInput style={{width: "38%",height:50,fontSize: 18,borderStyle: "solid",borderWidth: 3,borderColor: "#9e9e9e",borderRadius: 5, marginBottom: 10,marginTop: 10,marginLeft:"1%"}}
                            value={this.props.tipo} editable={false}/>
                </View>
                <TextInput style={styles.input} maxLength={3} 
                        value={this.props.puntos} editable={false}/>
                <View style={{width: "90%",height: 150,fontSize: 18,borderStyle: "solid",borderWidth: 3,borderColor: "#FA3E3E",borderRadius: 5,marginBottom: 10,}}>
                    <Text style={{fontSize: 18,color:"#FA3E3E",marginLeft:1}}>
                        Tu padre rechazó esta tarea
                    </Text>
                    <Text style={{fontSize: 18,color:"#000000",marginLeft:1}}>
                        {this.props.descripcion} 
                    </Text>
                </View>
                <View style={{width:"90%",height:50,flexWrap: 'wrap',flexDirection:'row',position:"relative",marginBottom:20}}>
                    <TouchableOpacity onPress={this.props.regresar} style={styles.botonRojo}><Text style={{color:"#ffffff",fontSize:18}}>Regresar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.haTerminado} style={styles.botonAzul}><Text style={{color:"#ffffff",fontSize:18}}>Terminar</Text></TouchableOpacity>
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