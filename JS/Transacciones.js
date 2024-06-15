
const tabla= document.querySelector("#MOST");
const cargar=()=>{
    fetch("../JSON/Transacciones.json")
    .then(respuesta=> respuesta.json())
    .then(Dato=>{
        Dato.forEach(Dato => {
            const row= document.createElement("tr");
            row.innerHTML+=`
                <td>${Dato.Fecha}</td>
                <td>${Dato.TG}</td>
                <td>${Dato.CG}</td>
                <td>${Dato.CD}</td>
        `;
        tabla.appendChild(row);
        });


    })
    .catch(error=>console.log("Hubo un error: "+error.message));
}
window.onload = () => {
    cargar();
}

document.getElementById("Formulario").addEventListener("submit", e => {
    e.preventDefault(); 
    const fecha = document.getElementById("fecha").value;
    const tipoGasto = document.getElementById("tipoGasto").value;
    const cantidadGastada = document.getElementById("cantidadGastada").value;
    const cantidadDisponible = document.getElementById("cantidadDisponible").value;

    const nuevaTransaccion = {
        Fecha: fecha,
        TG: tipoGasto,
        CG: cantidadGastada,
        CD: cantidadDisponible
    };
    const row = document.createElement("tr");
    row.innerHTML += `
        <td>${nuevaTransaccion.Fecha}</td>
        <td>${nuevaTransaccion.TG}</td>
        <td>${nuevaTransaccion.CG}</td>
        <td>${nuevaTransaccion.CD}</td>
    `;
    tabla.querySelector("tbody").appendChild(row);
    document.getElementById("Formulario").reset();
});
