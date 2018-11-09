import React from 'react';
import {View,Text,Alert,AsyncStorage} from 'react-native';
import firebase from 'firebase';
let user='';
const TareaHijo = (props) =>{
    const arr=[props.nombre,props.fecha,props.puntos,props.tipo,props.descripcion]
    
    return(
            <View style={{position:"relative"}} style={{marginBottom:3,width:"90%",height:50,borderStyle:"solid",borderWidth:3,borderColor:"#FA3E3E", borderRadius: 5,flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
            <View style={{justifyContent:"center",width:"72%",height:"100%",height:"100%"}}>
               <Text style={{fontSize:15,overflow:'hidden',color:"black",marginLeft:3}}>{props.nombre}</Text>
            </View>
            <View style={{width:"28%",height:"100%",flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
                <View style={{justifyContent:"center",width:"60%",height:"100%"}}>
                    <Text style={{fontSize:15,overflow:'hidden',color:"orange"}}>{props.fecha}</Text>
                </View>
            </View>
            <View style={{backgroundColor:"#FA3E3E",borderRadius:100,right:-15,top:-15,position:"absolute",width:30,height:30}}></View>
        </View>
       
    );
};


export default TareaHijo;
