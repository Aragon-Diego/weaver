/*
Autores:Diego Aragón,Roberto González,Alan Ricardo
Fecha de creación:02/10/2018
Fecha de ultima modificación:02/10/2018
Por quien fue modificado: Diego Aragón
Motivo de modificación: N/A
*/
import React from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import 'react-navigation';
/*
    Componente basico del header de la aplicación
*/
const Header = (props) =>{
    return(
        <View style={{marginTop:10,justifyItems:"center",alignItems:"center",width:"100%",height:"15%"}}>
            <View style={{flexWrap: 'wrap',alignItems: 'flex-start',flexDirection:'row',width:"100%",}}>
                <View style={{width:"40%"}}>
                    <TouchableOpacity onPress={props.click}><Image source={require('../img/menu.png')} style={{marginLeft:22,marginTop:15,width:50,height:40}}/></TouchableOpacity>
                </View>
                <View>
                    <Image source={require('../img/icon.png')} style={{marginBottom:2,width:70,height:70}} /> 
                </View>
            </View>
            <View style={{backgroundColor: "#FF8500",width:"90%",height:8}}></View>
        </View>
    );
};


export default Header;