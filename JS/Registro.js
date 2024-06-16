const LOG = () => {
    var USUINGRESADO = document.getElementById("US").value;
    var COINGRESADO = document.getElementById("CO").value;
    var CORREOINGRESADO = document.getElementById("CORREO").value;
    var TELEFONOINGRESADO = document.getElementById("TE").value;
    var NOMBREINGRESADO = document.getElementById("NO").value;
    var APELLIDOINGRESADO = document.getElementById("AP").value;

    if (USUINGRESADO.trim() == '' || COINGRESADO.trim() =='' || CORREOINGRESADO.trim() ==''|| TELEFONOINGRESADO.trim() ==''|| NOMBREINGRESADO.trim() ==''|| APELLIDOINGRESADO.trim() ==''){
        alert("No puede haber ningun campo vacio.");
        return;
    }
    if ( COINGRESADO.length>= 6 && COINGRESADO.length <= 15) {
        let Mayuscula = false;
        let Minuscula = false;
        let numero = false;
        let caracteresE = false;
        let Advertencias = "";
        
        for (let i = 0; i < COINGRESADO.length; i++) {
            let p = COINGRESADO.charAt(i);
            if (p >= '0' && p <= '9') {
                numero = true;
            } else if (p >= 'A' && p <= 'Z') {
                Mayuscula = true;
            } else if (p >= 'a' && p <= 'z') {
                Minuscula = true;
            } else {
                caracteresE = true;
            }
        }
        
        if (!numero) {
            Advertencias += "La contraseña debe tener al menos un numero(1,2,3...)\n";
        }
        if (!Mayuscula) {
            Advertencias += "La contraseña debe tener al menos una mayuscula \n";
        }
        if (!Minuscula) {
            Advertencias += "La contraseña debe tener al menos una minuscula\n";
        }
        if (!caracteresE) {
            Advertencias += "La contraseña debe tener al menos un caracter especial(&,_,$...)\n";
        }
        
        if (numero && Mayuscula && Minuscula && caracteresE) {
            alert("Registrado");
            window.location.href="../index.html";
        } else {
            alert(Advertencias);
            alert("La contraseña no es segura.");
        }
    } else {
        alert("La contraseña debe tener entre 6 y 15 caracteres.");
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const userTableBody = document.querySelector('#MOST');
    let users = [];

    const cargarUsuarios = () => {
        fetch('../JSON/Usuarios.json')
            .then(respuesta => respuesta.json())
            .then(data => {
                users = data;
                renderUserTable();
            })
            .catch(error => console.log('Hubo un error: ' + error.message));
    };

    function renderUserTable() {
        userTableBody.innerHTML = '';
        users.forEach((user, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.Nombre}</td>
                <td>${user.Apellido}</td>
                <td>${user.Usuario}</td>
                <td>${user.Contraseña}</td>
                <td>${user.Correo}</td>
                <td>${user.Telefono}</td>
                <td>
                    <select data-index="${index}">
                        <option value="Usuario" ${user.Rol === 'Usuario' ? 'selected' : ''}>Usuario</option>
                        <option value="Administrador" ${user.Rol === 'Administrador' ? 'selected' : ''}>Administrador</option>
                    </select>
                </td>
                <td><button data-index="${index}">Eliminar</button></td>
            `;
            userTableBody.appendChild(tr);
        });
    }

    userTableBody.addEventListener('change', function(event) {
        if (event.target.tagName === 'SELECT') {
            const index = event.target.getAttribute('data-index');
            users[index].Rol = event.target.value;
            alert('El rol fue actualizado');
        }
    });

    userTableBody.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const index = event.target.getAttribute('data-index');
            users.splice(index, 1);
            renderUserTable();
        }
    });

    cargarUsuarios();
});


document.addEventListener('DOMContentLoaded', function() {
    var nombre = localStorage.getItem('NOMBRE');
    var apellido = localStorage.getItem('APELLIDO');
    if (nombre && apellido) {
        var mensaje = "Bienvenid@ " + nombre +" "+ apellido + "!";
        var mensajeBienvenida = document.getElementById('mensajeBienvenida');
        mensajeBienvenida.textContent = mensaje;
    }
});
