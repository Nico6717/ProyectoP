document.addEventListener('DOMContentLoaded', function() {
    var nombre = localStorage.getItem('NOMBRE');
    var apellido = localStorage.getItem('APELLIDO');
    if (nombre && apellido) {
        var mensaje = "Bienvenid@ " + nombre +" "+ apellido + "!";
        var mensajeBienvenida = document.getElementById('mensajeBienvenida');
        mensajeBienvenida.textContent = mensaje;
    }
});
