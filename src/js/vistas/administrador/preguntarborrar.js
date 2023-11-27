const botonesBorrar = document.querySelectorAll("#botonBorrar");

botonesBorrar.forEach(function(boton) {
    boton.onclick = emergenteBorrar;
});

function emergenteBorrar(event) {
    event.preventDefault();  // Evitar que el enlace realice la acción por defecto (navegar a otra página)

    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar el elemento?");

    if (confirmacion) {
        let urlRedireccion = this.getAttribute("href")
        window.location.href = urlRedireccion;
    } else {
        // Se queda donde está
    }
}
