import React from 'react';
import {View,Text} from 'react-native';
import firebase from 'firebase';
import Tarea from '../Components/Tarea';

const Tareas = (props) =>{
  let arr = []
  const user = firebase.auth().currentUser;
  firebase.database().ref('Padres/' + user.uid + "/Tareas/").on("child_added", (snapshot, prevChildKey) => {
      let newPost = snapshot.val();
      let tarea = {
          titulo: newPost.titulo,
          fecha: newPost.fecha,
          fechai:newPost.fechai,
          puntos:newPost.puntos,
          descripcion:newPost.descripcion,
          tipo:newPost.tipo
      }
      arr.push(tarea)
  })

  return arr.map((tarea,index)=>{return(<View><Tarea tipo={tarea.tipo} descripcion={tarea.descripcion} puntos={tarea.puntos} nombre={tarea.titulo} fecha={tarea.fecha} fechai={tarea.fechai} key={index} clicks={props.clicks} /></View>)});
  
};


export default Tareas;