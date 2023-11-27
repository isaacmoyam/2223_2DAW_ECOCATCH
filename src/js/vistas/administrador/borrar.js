console.log("hola")

let borrar = document.getElementById("botonBorrar");

borrar.onclick = emergenteBorrar

function emergenteBorrar() {
    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar el elemento?");

    if (confirmacion) {
        alert("Acción confirmada");
    } else {
        // Código a ejecutar si el usuario hace clic en "Cancelar" o cierra el cuadro de diálogo
        alert("Acción cancelada");
    }
}