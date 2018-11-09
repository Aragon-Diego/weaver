import React,{Component} from 'react';
import {View,Text,ScrollView,RefreshControl} from 'react-native';
import firebase from 'firebase';
import Header from './Header2';
import BarraDeProgreso from '../Components/BarraDeProgreso';

class PrincipalPapa extends Component{
    state={
        ninos:[],
        refreshing:false
    };
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.resp();
    }
    componentWillMount = async () => {
    let arr = [];
    const user = firebase.auth().currentUser;
        await firebase.database().ref('Hijos/').once("value").then(function (snapshotP) {
            snapshotP.forEach(function (cSnapshot) {
                if (cSnapshot.val().Padre == user.uid) {
                    nino={
                        codigo:cSnapshot.key, 
                        nombre:cSnapshot.val().Nombre, 
                        puntos:cSnapshot.child("puntos").val().puntos,
                        total:cSnapshot.child("total").val().total,
                        cant:cSnapshot.child("cant").val().cant
                    };
                    arr.push(nino)
                }
            });
        });
        this.setState({
            ninos: arr,
            refreshing: false,
        })
    }
    resp = async () => {
        let arr = [];
        const user = firebase.auth().currentUser;
        await firebase.database().ref('Hijos/').once("value").then(function (snapshotP) {
            snapshotP.forEach(function (cSnapshot) {
                if (cSnapshot.val().Padre == user.uid) {
                    nino={
                        codigo:cSnapshot.key, 
                        nombre:cSnapshot.val().Nombre, 
                        puntos:cSnapshot.child("puntos").val().puntos,
                        total:cSnapshot.child("total").val().total,
                        cant:cSnapshot.child("cant").val().cant
                    };
                    
                    arr.push(nino)
                }
            });
        });
        this.setState({
            ninos: arr,
            refreshing: false,
        })
    }
    render(){
        let arr=this.state.ninos.map((nino,index)=>{
        return(
                <View key={index}>
                    <View style={{flexDirection:"row",width:"100%",height:30}}>
                        <View style={{position:"relative",justifyContent:'flex-start',marginLeft:20,marginRight:20,justifyContent:"center",}}>
                            <Text style={{fontSize:28,color:"black"}}>{nino.nombre}</Text>
                        </View> 
                        <View style={{position:"relative",justifyContent:'flex-start',justifyContent:"center",paddingLeft:10}}>
                            <Text style={{fontSize:12,color:"black"}}>{nino.codigo}</Text>
                        </View>   
                    </View>
                    <BarraDeProgreso cant={nino.cant} total={nino.total} puntos={nino.puntos}/>
                </View>
            );
        })
        return(
            <View style={{width:"100%",height:"100%",backgroundColor:"#fafafa",alignItems:"center"}}>
                <Header click={()=>this.props.navigation.openDrawer()}/>
                <ScrollView contentContainerStyle={{flexGrow:1}} refreshControl={ 
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />}
                >
                    <Text style={{fontSize:24,alignSelf:"center"}}>Progreso</Text>
                    <View tyle={{flex:1,width:"100%",alignItems:"center"}}>
                        
                        {arr}
                    </View>
                </ScrollView>
            </View>
        );
    }
};


export default PrincipalPapa;