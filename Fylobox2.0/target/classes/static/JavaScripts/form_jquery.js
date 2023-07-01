$("#form_registro").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        apellido: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        genero: {
            required: true
        },
        correo: {
            required: true,
            email: true
        },
        telefono: {
            number: true,
            minlength: 9,
            maxlength: 9
        },
        usuario: {
            required: true,
            minlength: 3,
            maxlength:30
        },
        password: {
            required: true,
            minlength: 3,
            maxlength:30
        },
        ConPassword: {
            required: true,
            minlength: 3,
            maxlength:30
        }
    }
});


$(document).ready(function(){
    $("#guardar").click(function(){
        if($("#form_registro").valid() == false) {
            return;
        }else{
            
            let nombre = $("#nombre").val();
            let apellido = $("#apellido").val();
            let genero = $("#genero").val();
            let correo = $("#correo").val();
            let telefono = $("#telefono").val();
            let usuario = $("#usuario").val();
            let contrasena = $("#password").val();
            let conContrasena = $("#ConPassword").val();
            var expresionRegular = /^\S+$/;

            if(!expresionRegular.test(nombre) ||
            !expresionRegular.test(apellido) ||
            !expresionRegular.test(correo) ||
            !expresionRegular.test(telefono) ||
            !expresionRegular.test(usuario) ||
            !expresionRegular.test(contrasena) ||
            !expresionRegular.test(conContrasena)){
                alert("El campo no debe contener espacios");
            }else{
                alert('usuario creado')
            }
            
        }
    });
})

$("#InicioSe").validate({
    rules: {
        usuario:{
            required: true,
            minlength: 3
        },
        password:{
            required:true
        }
    }
});

$(document).ready(function(){
    $("#btnSesion").click(function(){
        if($("#InicioSe").valid() == false) {
            alert("Usuario no existe")
        }else{    
            alert('Has ingresado correctamente')
            location.href="pagina1.html"
        }
    });
})

$(document).ready(function(){
    $("#btnVolver2").click(function(){
        location.href="Principal.html"
    });
})

$("#confiCambios").validate({
    rules: {
        contraNueva:{
            required: true,
            minlength: 3,
            maxlength: 25
        },
        confiContra:{
            required:true,
            minlength: 3,
            maxlength: 25
        }
    }
});

$(document).ready(function(){
    $("#ConfirmarCambios").click(function(){
        if($("#confiCambios").valid() === false) {
            alert("Ingrese otra contraseña")
        }else{    
            alert('Contraseña modificada correctamente')
        }
    });
})
$(document).ready(function() {
    loadData();
});
function loadData() {
    $.get('/users', function(data) {
        // Iterar sobre los datos recibidos y agregar filas a la tabla
        data.forEach(function(item) {
            $('#data-table tbody').append(`
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>
                                <button onclick="editItem(${item.id})">Editar</button>
                                <button onclick="deleteItem(${item.id})">Eliminar</button>
                            </td>
                        </tr>
                    `);
        });
    });
}



$('#guardar').click(function() {
    const user = {
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        genero: $('#genero').val(),
        correo: $('#correo').val(),
        telefono: $('#telefono').val(),
        usuario: $('#usuario').val(),
        password: $('#password').val()
    };

    // Enviar la solicitud AJAX al backend
    $.post({
        url: '/api/users/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function(response) {
            // Manejar la respuesta del servidor si es necesario
            alert(response);
            // Limpiar el formulario después de un registro exitoso
            $('#form_registro')[0].reset();
        },
        error: function(error) {
            // Manejar el error si es necesario
            alert('Error al registrar usuario');
        }
    });
});
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    $("#guardar").click(function (){
        let data = {}
        data.nombre = $("#nombre").val()
        data.apellido = $("#apellido").val()
        data.genero = $("#genero").val()
        data.correo = $("#correo").val()
        data.telefono = $("#telefono").val()
        data.usuario = $("#usuario").val()
        data.password = $("#password").val()
        $.post(
            "/users"
            , JSON.stringify(data)
            , function(json, status, jqxhr){
                alert("Esta funcionando")
            }
            , 'json')
    })
})

