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