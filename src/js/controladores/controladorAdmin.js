import { VistaAdmin } from '../vistas/administrador/vistaAdmin.js'
import { Vista1 } from '../vistas/administrador/vista1.js'
import { Vista2 } from '../vistas/administrador/vista2.js'

/**
 * Clase controlador del usuario. Se encarga de controlar las vistas del usuario
 */

//TODO CREAR VISTAS NUEVAS
document.addEventListener('DOMContentLoaded', function () {
class ControladorAdmin {
  
  vistas = new Map()

  constructor() {
    const divVista1 = document.getElementById('divVista1');
    const divVista2 = document.getElementById('divVista2');

    const btnAgregarFila = document.getElementById('btnAgregarFila');
    if (!btnAgregarFila){}
    else
      btnAgregarFila.addEventListener('click', this.agregarFila.bind(this));

    this.vistas.set(VistaAdmin.VISTA1, new Vista1(this, divVista1));
    this.vistas.set(VistaAdmin.VISTA2, new Vista2(this, divVista2));

    this.verVista(VistaAdmin.VISTA1);

  }

  agregarFila() {
    const tablaDinamica = document.getElementById('tablaDinamica')
    const nuevaFila = tablaDinamica.insertRow()

    let input = document.createElement('input');
    let select = document.createElement('select');

    let celda = nuevaFila.insertCell();
    input.type = 'text';
    input.name = 'contenido[]'
    celda.appendChild(input);

    celda = nuevaFila.insertCell();
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'puntosHasta[]'
    celda.appendChild(input);

    celda = nuevaFila.insertCell();
    select = document.createElement('select');
    select.name = 'tipo[]';

    var opciones = [
        { nombre: 'Antes del nivel', valor: 'A' },
        { nombre: 'Durante el nivel', valor: 'B' },
        { nombre: 'Después del nivel', valor: 'C' }
    ];

    for (var i = 0; i < opciones.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = opciones[i].valor;
        opcion.text = opciones[i].nombre;
        select.appendChild(opcion);
    }

    celda.appendChild(select);

    // Añade la nueva celda con el botón para quitar la fila
    const celdaBoton = nuevaFila.insertCell();
    const btnQuitar = document.createElement('button');
    btnQuitar.type = 'button';
    btnQuitar.classList.add('btnQuitarFila');
    btnQuitar.textContent = '🗑️';
    btnQuitar.addEventListener('click', this.quitarFila.bind(this, nuevaFila));
    celdaBoton.appendChild(btnQuitar);
  }

  quitarFila(fila) {
    const tablaDinamica = document.getElementById('tablaDinamica');
    tablaDinamica.deleteRow(fila.rowIndex);
  }

  /**
     * Muestra una vista.
     * @param vista {Symbol} Símbolo que identifica a la vista.
     */
  verVista (vista) {
    this.ocultarVistas()
    this.vistas.get(vista).mostrar(true)
  }

  /**
     * Método por el cual se ocultan todas las vistas.
     */
  ocultarVistas () {
    for (const vista of this.vistas.values()) { vista.mostrar(false) }
  }

  /**
     * Asocia eventos a los objetos pasados por parámetro
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     * @param iNombre {Object} Objeto correspondiente al campo nombre
     * @param iImagen {Object} Objeto correspondiente al campo de la imágen
     * @param iValor {Object} Objeto correspondiente al campo valor
     * @param btnAnadirBasura {Object} Objeto correspondiende del boton de añadir basura
     * @param imagenMiniatura {Object} Objeto de la imagen en miniatura
     */

  comprobacionNombre(evento, pMensaje) {
    const inputNombre = evento.target;
    const nombre = inputNombre.value;
  
    if (nombre.trim() === "") {
      this.mostrarMensajeError(inputNombre, pMensaje, 'El nombre no puede estar vacío.');
    } else if (nombre.length > 20) {
      this.mostrarMensajeError(inputNombre, pMensaje, 'El nombre no puede ser mayor a 20 caracteres.');
    iValor.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
  }
}

  comprobacionNombre(evento, pMensaje) {
    const inputNombre = evento.target;
    const nombre = inputNombre.value;
  
    if (nombre.trim() === "") {
      this.mostrarMensajeError(inputNombre, pMensaje, 'El nombre no puede estar vacío.');
    } else if (nombre.length > 20) {
      this.mostrarMensajeError(inputNombre, pMensaje, 'El nombre no puede ser mayor a 20 caracteres.');
    } else {
      this.mostrarMensajeExito(inputNombre);
    }
  }
  
  comprobacionValor(evento, pMensaje) {
    const inputValor = evento.target;
    const valor = inputValor.value;
  
    if (!/^\d{1,3}$/.test(valor) || parseInt(valor) < 1 || parseInt(valor) > 254) {
      this.mostrarMensajeError(inputValor, pMensaje, 'El valor debe ser un número entre 1 y 254.');
    } else {
      this.mostrarMensajeExito(inputValor);
      this.mostrarMensajeExito(inputNombre);
    }
  }
  
  comprobacionValor(evento, pMensaje) {
    const inputValor = evento.target;
    const valor = inputValor.value;
  
    if (!/^\d{1,3}$/.test(valor) || parseInt(valor) < 1 || parseInt(valor) > 254) {
      this.mostrarMensajeError(inputValor, pMensaje, 'El valor debe ser un número entre 1 y 254.');
    } else {
      this.mostrarMensajeExito(inputValor);
    }
  }  

  /**
     * Método por el cual se obtiene el nombre del archivo de la imágen sin la extensión
     * @param iImagen {Object} Objeto correspondiente al campo de la imágen
     * @returns {null|string} Devuelve null si no se ha introducido una imagen o String: nombre del archivo de la imagen
     */
  nombreArchivo (iImagen) {
    if (iImagen && iImagen.files && iImagen.files.length > 0) {
      // iImage no es nulo por lo que se ha seleccionado un archivo
      // Cogemos el archivo introducido del input type file
      const files = iImagen.files
      const selectedFile = files[0]

      // Cogemos el nombre del archivo
      const nombreArchivo = selectedFile.name.split('.').slice(0, -1).join('.')

      return nombreArchivo
    } else {
      return null
    }
  }

  /**
     * Devuelve el valor guardado en el objeto del campo nombre
     * @param iNombre {Object} Objeto del campo nombre
     * @returns {String} Valor guardado en el campo nombre
     */
  valorCampoNombre (iNombre) {
    return iNombre.value
  }

  /**
     * LLama a una función encargada de comprobar si se valida el campo Nombre mediante una expresión regular determinada.
     * Se ejecuta con un evento onblur en el campoNombre
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     */
  comprobacionNombre (evento, pMensaje) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/
    this.validarCampo(evento, pMensaje, regExp)
  }

  /**
     * LLama a una función encargada de comprobar si se valida el campo Valor mediante una expresión regular determinada.
     * Se ejecuta con un evento onblur en el campoNombre
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     */
  comprobacionValor (evento, pMensaje) {
    const regExp = /^\d{1,}$/
    this.validarCampo(evento, pMensaje, regExp)
  }

  /**
     *
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     * @param regExp {Object} Expresión Regular
     */
  validarCampo (evento, pMensaje, regExp) {
    const input = evento.target // Hay fallo aqui

    if (!regExp.test(input.value)) {
      input.style.borderColor = 'red'
      pMensaje.style.color = 'red'
      pMensaje.innerHTML = 'Has introducido un campo con valores no validos'
    } else {
      input.style.borderColor = 'yellow'
      pMensaje.innerHTML = ''
    }
  }

  /**
     * Muestra la imagen en miniatura introducido en el input type="file" del html
     * @param event {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param imagenMiniatura {Object} Objeto de la imagen en miniatura
     */
  mostrarMiniatura (event, imagenMiniatura) {
    const file = event.target.files[0]

    if (file) {
      // Mostrar miniatura
      const reader = new FileReader()

      reader.onload = (e) => {
        imagenMiniatura.src = e.target.result
        imagenMiniatura.style.display = 'block'
      }

      reader.readAsDataURL(file)
    } else {
      // Ocultar miniatura si no se selecciona ningún archivo
      imagenMiniatura.style.display = 'none'
    }
  }
}

window.onload = () => { new ControladorAdmin() }
})