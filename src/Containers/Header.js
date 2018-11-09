/*
Autores:Diego Aragón,Roberto González,Alan Ricardo
Fecha de creación:02/10/2018
Fecha de ultima modificación:02/10/2018
Por quien fue modificado: Diego Aragón
Motivo de modificación: N/A
*/
import React from 'react';
import {View,Image} from 'react-native';
/*
    Componente basico del header de la aplicación
*/
const Header = (props) =>{
    return(
        <View style={{marginTop:10,justifyContent:"center",alignItems:"center",width:"100%",height:"15%",marginBottom:10}}>
            <Image source={require('../img/icon.png')} style={{marginBottom:2,width:70,height:70}} />
            <View style={{backgroundColor: "#FF8500",width:"90%",height:10}}></View>
        </View>
    );
};


export default Header;