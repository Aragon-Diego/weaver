import React,{Component} from 'react';
import {View,Text,AsyncStorage,ScrollView,RefreshControl,TouchableOpacity,Alert} from 'react-native';
import firebase from 'firebase';
import Header from './Header2';
import Recompensa from '../Components/RecompensaHijo';
import RecompensaN from '../Components/RecompensaHijoN';

class PantallaRecompensaH extends Component{
    state = {
        recompensas: [],
        hide:true,
        codigo:"",
        refreshing: false,
        puntosTotales:0,
        hideRecompensas:false
    };
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.resp();
      }
    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            this.setState({
                codigo: user
            })
        } catch (error) {

        }
    }
    componentWillMount=async ()=>{
        await this.displayData()
        let arr = []
        let puntos2=0
        firebase.database().ref('Hijos/' +this.state.codigo+ "/Recompensas/").on("child_added", (snapshot, prevChildKey) => {
            let newPost = snapshot.val();
            let recompensa = {
                titulo: newPost.titulo,
                puntos: newPost.puntos,
                descripcion:newPost.descripcion
            }
            arr.push(recompensa)
        })
        await firebase.database().ref('Hijos/' +this.state.codigo + '/puntos').once("value", (snapshot) => {
            puntos2 = snapshot.val().puntos
        })
        puntos = Number.parseInt(puntos2)
        this.setState({
            recompensas: arr,
            puntosTotales:puntos
        })
    }
    comprarRecompensa= async(punt,titulo)=>{
        let puntos3 = Number.parseInt(punt);
        let puntos2 = 0
        await firebase.database().ref('Hijos/'+this.state.codigo+'/puntos').once("value",(snapshot)=>{
            puntos2 = snapshot.val().puntos
        })
        puntos = Number.parseInt(puntos2) - puntos3
        firebase.database().ref('Hijos/' +this.state.codigo + "/puntos/").set({
            "puntos": puntos
        });
        this.setState({
            puntosTotales:puntos
        });
        firebase.database().ref('Hijos/'+this.state.codigo+"/RecompensasCompradas/"+titulo).set({
            "titulo":titulo
        })
        firebase.database().ref('Hijos/' + this.state.codigo + "/Recompensas/"+titulo).remove();
        this.resp()
    }
    resp = async () => {
        let arr = []
        let puntos=0
        let puntos2=0
        await firebase.database().ref('Hijos/' + this.state.codigo + "/Recompensas/").on("child_added", (snapshot, prevChildKey) => {
            let newPost = snapshot.val();
            let recompensa = {
                titulo: newPost.titulo,
                puntos: newPost.puntos,
                descripcion: newPost.descripcion
            }
            arr.push(recompensa)
        })
        await firebase.database().ref('Hijos/' + this.state.codigo + '/puntos').once("value", (snapshot) => {
            puntos2 = snapshot.val().puntos
        })
        puntos = Number.parseInt(puntos2)
        this.setState({
            recompensas: arr,
            refreshing: false,
            puntosTotales:puntos            
        })
    }
    render(){
        let arr=this.state.recompensas.map((recompensa,index)=>{
            if(recompensa.puntos<this.state.puntosTotales){
                return(
                < TouchableOpacity onPress = {()=>
                    Alert.alert("¿Quieres canjear?", "", [{text:'no'},{
                        text: 'si', onPress: () => this.comprarRecompensa(recompensa.puntos,recompensa.titulo)
                    }])
                } >
                    <Recompensa nombre={recompensa.titulo} puntos={recompensa.puntos} 
                    descripcion={recompensa.descripcion}key={index}/>
                </TouchableOpacity>
                );
            }
            else{
                return(
                    <RecompensaN nombre={recompensa.titulo} puntos={recompensa.puntos} 
                    descripcion={recompensa.descripcion}key={index}/>
                ); 
            }
            
        })
        let titulo="Agregar";
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
                <ScrollView style={{width:"100%"}} contentContainerStyle={{alignItems:"center"}} refreshControl={ 
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />} >
                    <Text style={{fontSize:24,alignSelf:"center"}}>Recompensas Hijo</Text>
                    {renderIf(!this.state.hideRecompensas,
                    <View>
                        <Text style={{alignSelf:"center"}}> Tus puntos son:{this.state.puntosTotales}</Text>
                        {arr}
                    </View>
                    )}
                    {renderIf(this.state.hideRecompensas,)}
                </ScrollView>
            </View>
        );
    }
};

export default PantallaRecompensaH;
