import React from 'react';
import {View,Text} from 'react-native';


const BarraDeProgreso = (props) =>{
    let porcentajeStyle=""+((props.cant*100)/props.total)+"%";
    let porcentaje=((props.cant*100)/props.total);
    if(porcentaje>100){
        porcentaje=100;
        porcentajeStyle="100%";
    }
    let color;
    if(porcentaje<101){
        color="#147514";
    }
    if(porcentaje<90){
        color="#62850D";
    }
    if(porcentaje<75){
        color="#FFA500";
    }
    if(porcentaje<55){
        color="#FF6E00";
    }
    if(porcentaje<35){
        color="#FF3700";
    }
    if(porcentaje<15){
        color="#FF1C00";
    }
    if(porcentaje<10){
        color="#FF0000";
    }
    const back={
        width:porcentajeStyle,
        height:45,
        backgroundColor:color,
        left:0,
        top:-.5,
        position:"absolute",

        
    }
    return(   
        <View style={{position:"relative",width:"95%",height:50,borderStyle:"solid",borderWidth:3,borderColor:"#9e9e9e",margin:10,flexWrap:"wrap",alignItems:"flex-start",flexDirection:"row",borderRadius:5}}>
            <View style={{width:"80%"}}>
                <View style={back}></View>
            </View>
            <View style={{width:"19%",borderColor:"#9e9e9e",borderStyle:"solid",borderLeftWidth:2,height:"100%",alignItems:"center",justifyContent:"center"}}>
                <Text>
                    {props.puntos}
                </Text>
            </View>
        </View>
    );
};


export default BarraDeProgreso;