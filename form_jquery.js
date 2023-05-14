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

})


$(document).ready(function(){
    $("#guardar").click(function(){
        if($("#form_registro").valid() == false) {
            return;
        }
        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let genero = $("#genero").val();
        let correo = $("#correo").val();
        let telefono = $("#telefono").val();
        let usuario = $("#usuario").val();
        let contrasena = $("#password").val();
        let conContrasena = $("#ConPassword").val();  
    });
})