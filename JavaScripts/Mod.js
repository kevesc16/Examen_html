$(document).ready(function() {
    $(".Eliminar").click(function() {
        $(this).closest(".container").hide();
        alert("Pelicula Eliminada correctamente");
    });
});

src="https://code.jquery.com/jquery-3.6.0.min.js"
    $(document).ready(function() {
        $('#imagen').change(function() {
            var archivo = this.files[0];
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#vista-previa').html('');
                $('<img>').attr('src', e.target.result).appendTo('#vista-previa');
            };

            reader.readAsDataURL(archivo);
        });
    });

        
    
    
