import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase';

const Tarea = (props) =>{
        
    return(
        <View style={{marginBottom:3,width:"90%",height:50,borderStyle:"solid",borderWidth:3,borderColor:"#9e9e9e", borderRadius: 5,flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
            <View style={{justifyContent:"center",width:"60%",height:"100%"}}>
               <Text style={{fontSize:15,overflow:'hidden',color:"black",marginLeft:3}}>{props.titulo}</Text> 
            </View>
            <View style={{width:"40%",height:"100%",flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
                <View style={{justifyContent:"center",width:"100%",height:"100%"}}>
                    <Text style={{fontSize:15,overflow:'hidden',color:"orange"}}>{props.nombre}</Text>
                </View>
            </View>
        </View>
    );
};


export default Tarea;