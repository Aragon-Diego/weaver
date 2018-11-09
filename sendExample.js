mail = this.state.mail.replace(".", "");
firebase.database().ref('Padres/' + mail).set({
    hijos: {
        clave: "789452",
        idRecompensas: [1, 13, 98],
        idTarea: [1, 4, 5],
        nombre: "Alan",
        puntos: 125
    },
    nombre: "Roberto",
    password: "alan=loli",
    recompensas: [{
        costosPuntos: 123,
        descripcion: "un oso de peluche",
        idRecompesa: 1,
        nombreRecompensa: "Oso de peluche"
    }, ],
    tareas: [{
        descripcion: "Ir a dormir a las 8",
        fechaLimite: "01/10/2018",
        idTarea: 1,
        nombreTarea: "Dormir temprano",
        valorPuntos: 122
    }, ]
});