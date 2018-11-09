import React,{Component} from 'react';
import {View,Text,AsyncStorage,ScrollView,RefreshControl,TouchableOpacity,Alert} from 'react-native';
import firebase from 'firebase';
import Header from './Header2';
import Recompensa from '../Components/RecompensaHijo';

class PantallaRecompensaH extends Component{
    state = {
        recompensas: [],
        hide:true,
        codigo:"",
        refreshing: false,
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
        firebase.database().ref('Hijos/' +this.state.codigo+ "/RecompensasCompradas/").on("child_added", (snapshot, prevChildKey) => {
            let newPost = snapshot.val();
            let recompensa = {
                titulo: newPost.titulo,
            }
            arr.push(recompensa)
        })
        this.setState({
            recompensas: arr,
            puntosTotales:puntos
        })
    }
    resp = async () => {
        let arr = []
        await firebase.database().ref('Hijos/' + this.state.codigo + "/RecompensasCompradas/").on("child_added", (snapshot, prevChildKey) => {
            let newPost = snapshot.val();
            let recompensa = {
                titulo: newPost.titulo,
            }
            arr.push(recompensa)
        })
        this.setState({
            recompensas: arr,
            refreshing: false,         
        })
    }
    render(){
        let arr=this.state.recompensas.map((recompensa,index)=>{
            return(
                <Recompensa nombre={recompensa.titulo}key={index}/>
            );
        })
        return(
            <View style={{width:"100%",height:"100%",backgroundColor:"#fafafa",alignItems:"center"}}>
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <ScrollView style={{width:"100%"}} contentContainerStyle={{alignItems:"center"}} refreshControl={ 
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />} >
                    <Text style={{fontSize:24,alignSelf:"center"}}>Mis recompensas</Text>
                        {arr}
                </ScrollView>
            </View>
        );
    }
};

export default PantallaRecompensaH;
