import React from 'react';
import {View,Text,TouchableOpacity,Alert} from 'react-native';

const RecompensaHijo = (props) =>{
    return(
        <View style={{marginBottom:3,width:"90%",height:50,borderStyle:"solid",borderWidth:3,borderColor:"#9e9e9e", borderRadius: 5,flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
            <View style={{justifyContent:"center",width:"70%",height:"100%"}}>
               <Text style={{fontSize:15,overflow:'hidden',color:"black",marginLeft:3}}>{props.nombre}</Text>
            </View>
            <View style={{width:"30%",height:"100%",flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
                <View style={{justifyContent:"center",width:"60%",height:"100%"}}>
                    <Text style={{fontSize:15,overflow:'hidden',color:"#0776A0"}}>{props.puntos}</Text>
                </View>
            </View>
        </View>
    );
};


export default RecompensaHijo;
