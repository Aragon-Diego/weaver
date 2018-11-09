import React from 'react';
import {View,Text,Alert} from 'react-native';

const TareaHijo = (props) =>{
    const arr=[props.nombre,props.fecha,props.puntos,props.tipo,props.descripcion]
    return(
        <View style={{marginBottom:3,width:"90%",height:50,borderStyle:"solid",borderWidth:3,borderColor:"#9e9e9e", borderRadius: 5,flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
            <View style={{justifyContent:"center",width:"72%",height:"100%"}}>
               <Text style={{fontSize:15,overflow:'hidden',color:"black",marginLeft:3}}>{props.nombre}</Text>
            </View>
            <View style={{width:"28%",height:"100%",flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
                <View style={{justifyContent:"center",width:"60%",height:"100%"}}>
                    <Text style={{fontSize:15,overflow:'hidden',color:"orange"}}>{props.fecha}</Text>
                </View>
            </View>
        </View>
       
    );
};


export default TareaHijo;
