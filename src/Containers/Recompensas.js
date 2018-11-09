import React from 'react';
import {View,Text} from 'react-native';
import firebase from 'firebase';
import Recompensa from '../Components/Recompensa';

const Recompensas = (props) =>{
  let arr = []
  const user = firebase.auth().currentUser;
  firebase.database().ref('Padres/' + user.uid + "/Recompensas/").on("child_added", (snapshot, prevChildKey) => {
      let newPost = snapshot.val();
      let recompensa = {
          titulo: newPost.titulo,
          puntos:newPost.puntos,
          descripcion:newPost.descripcion,
      }
      arr.push(recompensa)
  })

  return arr.map((recompensa,index)=>{return(<View><Recompensa  descripcion={recompensa.descripcion} puntos={recompensa.puntos} nombre={recompensa.titulo}  key={index} clicks={props.clicks} /></View>)});
  
};


export default Recompensas;