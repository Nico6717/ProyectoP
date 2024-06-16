const OCULTAR=()=>{
    var div= document.getElementById("n1");
    div.style.display="none";
}

const MOSTRAR=()=>{
    var div= document.getElementById("n1");
    div.style.display="";
}

document.addEventListener('DOMContentLoaded', function() {
    var nombre = localStorage.getItem('NOMBRE');
    var apellido = localStorage.getItem('APELLIDO');
    if (nombre && apellido) {
        var mensaje = "Bienvenido " + nombre +" "+ apellido + "!";
        var mensajeBienvenida = document.getElementById('mensajeBienvenida');
        mensajeBienvenida.textContent = mensaje;
    }
});
