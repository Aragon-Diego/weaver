import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

const Recompensa = (props) =>{
    const arr=[props.nombre,props.puntos,props.descripcion]
    return(
        <View style={{marginBottom:3,width:"90%",height:50,borderStyle:"solid",borderWidth:3,borderColor:"#9e9e9e", borderRadius: 5,flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
            <View style={{justifyContent:"center",width:"70%",height:"100%"}}>
               <Text style={{fontSize:15,overflow:'hidden',color:"black",marginLeft:3}}>{props.nombre}</Text> 
            </View>
            <View style={{width:"30%",height:"100%",flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row'}}>
                <View style={{justifyContent:"center",width:"60%",height:"100%"}}>
                    <Text style={{fontSize:15,overflow:'hidden',color:"#0776A0"}}>{props.puntos}</Text>
                </View>
                <View style={{marginLeft:20,rotation:90,height:"100%"}}>
                    <TouchableOpacity onPress={()=> props.clicks(arr)}>
                        <Text style={{fontSize:25,overflow:'hidden',color:"black"}}>
                            ...
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


export default Recompensa;