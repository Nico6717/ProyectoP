const LOG = () => {
    var USUINGRESADO = document.getElementById("US").value;
    var COINGRESADO = document.getElementById("CO").value;

    if (USUINGRESADO.trim() == '' || COINGRESADO.trim() == '') {
        alert("No puede haber ningún campo vacío.");
        return;
    }
    if (COINGRESADO.length >= 6 && COINGRESADO.length <= 15) {
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
            Advertencias += "La contraseña debe tener al menos un número (1, 2, 3...)\n";
        }
        if (!Mayuscula) {
            Advertencias += "La contraseña debe tener al menos una mayúscula \n";
        }
        if (!Minuscula) {
            Advertencias += "La contraseña debe tener al menos una minúscula\n";
        }
        if (!caracteresE) {
            Advertencias += "La contraseña debe tener al menos un caracter especial (&, _, $...)\n";
        }

        if (numero && Mayuscula && Minuscula && caracteresE) {
            fetch('JSON/Usuarios.json')
            .then(response => response.json())
            .then(data => {
                var usuarioValido = data.find(Buscar => Buscar.Usuario == USUINGRESADO && Buscar.Contraseña == COINGRESADO);
                if (usuarioValido) {
                    alert("Inicio de sesión exitoso");

                    localStorage.setItem('ID', JSON.stringify(usuarioValido.id));
                    localStorage.setItem('NOMBRE', JSON.stringify(usuarioValido.Nombre));
                    localStorage.setItem('APELLIDO', JSON.stringify(usuarioValido.Apellido));
                    localStorage.setItem('CORREO', JSON.stringify(usuarioValido.Correo));
                    localStorage.setItem('TELEFONO', JSON.stringify(usuarioValido.Telefono));
                    localStorage.setItem('Rol', JSON.stringify(usuarioValido.Rol));

                    if (usuarioValido.Rol === "Administrador") {
                        window.location.href = "http://localhost/Proyecto/HTML/Reportes.html";
                    } else {
                        window.location.href = "http://localhost/Proyecto/HTML/Inicio.html";
                    }
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            })
            .catch(error => console.error("Error al cargar el JSON: " + error));
        } else {
            alert(Advertencias);
            alert("La contraseña no es segura.");
        }
    } else {
        alert("La contraseña debe tener entre 6 y 15 caracteres.");
    }
}