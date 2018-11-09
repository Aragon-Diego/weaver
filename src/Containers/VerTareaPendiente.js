import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Picker} from 'react-native';
import firebase from 'firebase';
class AgregarTarea extends Component{
    rechazar=()=>{
        let codigo = this.props.codigo;
        let titulo = this.props.titulo;
        let fechai = this.props.fechai;
        const user = firebase.auth().currentUser;
        firebase.database().ref('Hijos/' + codigo + "/Tareas/" +fechai+"/"+titulo + "/nuevo/").set({
            "nuevo": 3
        });
        firebase.database().ref('Padres/'+ user.uid +"/TareasPendientes/" +codigo+titulo).remove();
        this.props.regresar()
        
    }
    aceptar=async ()=>{
        let codigo = this.props.codigo;
        let titulo = this.props.titulo;
        let puntos = Number.parseInt(this.props.puntos);
        let puntos2=0
        let fechai=this.props.fechai;
        const user = firebase.auth().currentUser;
        firebase.database().ref('Padres/' + user.uid + "/TareasPendientes/" + codigo+ titulo).remove();
        await firebase.database().ref('Hijos/'+codigo+"/puntos").once("value",(snapshot)=>{
            puntos2 = snapshot.val().puntos
        })
        puntos=Number.parseInt(puntos2)+puntos
        firebase.database().ref('Hijos/'+codigo+"/puntos/").set({
            "puntos": puntos
        });
        await firebase.database().ref("Hijos/" + codigo + "/cant/").once("value", (snap) => {
            puntos2 = snap.val().cant
        })
        puntos = Number.parseInt(puntos2) + 1
        firebase.database().ref("Hijos/" +codigo+ "/cant/").set({
            "cant": puntos
        });
        firebase.database().ref('Hijos/' + codigo + "/Tareas/"+fechai+"/"+ titulo ).remove();
        this.props.regresar()
    };
    render(){
        return(
           <View style={{alignItems:"center",width:"100%"}}>
                <TextInput style={styles.input} maxLength={38} 
                        placeholder ={"   "+this.props.titulo+":"} placeholderTextColor="#9e9e9e" editable={false} selectTextOnFocus={false}
                        value={this.props.titulo}/>
                <View style={{width:"90%",flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
                    <TextInput style={styles.inputFecha2} 
                            value={this.props.nombre} editable={false}/>
                </View>
                <TextInput style={styles.input} maxLength={3} 
                        value={this.props.puntos} editable={false}/>
                <TextInput style={styles.inputDes} maxLength={220} multiline = {true} tipoberOfLines = {4}
                        value={this.props.descripcioncion} editable={false}/>
                <View style={{width:"90%",height:50,flexWrap: 'wrap',flexDirection:'row',position:"relative",marginBottom:20}}>
                    <TouchableOpacity onPress={this.rechazar} style={styles.botonRojo}><Text style={{color:"#ffffff",fontSize:18}}>Rechazar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.aceptar} style={styles.botonAzul}><Text style={{color:"#ffffff",fontSize:18}}>Aceptar</Text></TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.props.regresar}style={{marginTop:20}}><Text style={{textDecorationLine:"underline"}}>Regresar</Text></TouchableOpacity>
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