import { VistaAdmin } from '../vistas/administrador/vistaAdmin.js'
import { Vista1 } from '../vistas/administrador/vista1.js'
import { Vista2 } from '../vistas/administrador/vista2.js'
console.log('hola')
/**
 * Clase controlador del usuario. Se encarga de controlar las vistas del usuario
 */
document.addEventListener('DOMContentLoaded', function () {
class ControladorAdmin {
  
  vistas = new Map()

  vistas = new Map();

  constructor() {
    const divVista1 = document.getElementById('divVista1');
    const divVista2 = document.getElementById('divVista2');
    const contador = 2

    const mensaje = document.getElementById('msgCampos');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const imagenInput = document.querySelector('input[name="imagen"]');
    const valorInput = document.querySelector('input[name="valor"]');
    const btnAnadirBasura = document.getElementById('anadirBasura');

    const btnAgregarFila = document.getElementById('btnAgregarFila');
    btnAgregarFila.addEventListener('click', this.agregarFila.bind(this));
    
    const imagenMiniatura = document.getElementById('imagenMiniatura');

    this.vistas.set(VistaAdmin.VISTA1, new Vista1(this, divVista1));
    this.vistas.set(VistaAdmin.VISTA2, new Vista2(this, divVista2));

    this.verVista(VistaAdmin.VISTA1);

    // Agregamos la validación del formulario al evento submit
    document.getElementById('formBasura').addEventListener('submit', (event) => {
      this.validarFormulario(event);
    });

    this.eventosComprobacion(mensaje, nombreInput, imagenInput, valorInput, btnAnadirBasura, imagenMiniatura);
  }

  agregarFila() {
    const tablaDinamica = document.getElementById('tablaDinamica');
    const nuevaFila = tablaDinamica.insertRow();

    // Añade la celda con el número
    let celda = nuevaFila.insertCell();
    celda = nuevaFila.insertCell();
    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'contenido'
    celda.appendChild(input);

    celda = nuevaFila.insertCell();
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'puntosRequeridos'
    celda.appendChild(input);

    celda = nuevaFila.insertCell();
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'tipo'
    celda.appendChild(input);

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

  validarFormulario(event) {
    event.preventDefault();
  
    const nombreInput = document.querySelector('input[name="nombre"]');
    const valorInput = document.querySelector('input[name="valor"]');
    const formBasura = document.getElementById('formBasura')
  
    const nombre = nombreInput.value;
    const valor = valorInput.value;
    let mensajeError = null;
  
    // Realiza la lógica de validación aquí
    if (this.validarNombre(nombre) && this.validarValor(valor)) {
      // Si la validación es exitosa, puedes enviar el formulario
      mensajeError = 'Formulario válido. Puedes enviar los datos al servidor';
      this.mostrarMensajeExito(nombreInput);
      this.mostrarMensajeExito(valorInput);
      formBasura.action = '../../index.php?control=basura_con&metodo=crear' // Habilitar el botón
  
      // Envía el formulario al servidor
      document.getElementById('formBasura').submit();
    } else {
      // Si la validación falla, puedes mostrar un mensaje de error o realizar otra acción
      mensajeError = 'Por favor, completa todos los campos correctamente.';
      this.mostrarMensajeError(nombreInput, mensajeError);
      this.mostrarMensajeError(valorInput, mensajeError);
      formBasura.action = ''; // Deshabilitar el botón
    }
  }    

  mostrarMensajeError(input, mensaje) {
    const pMensaje = document.getElementById('msgCampos'); // Reemplaza con el ID real de tu elemento
    if (pMensaje) {
      input.style.borderColor = 'red';
      pMensaje.style.color = 'red';
      pMensaje.innerHTML = mensaje;
    }
  }

  mostrarMensajeExito(input) {
    input.style.borderColor = 'green';
    const pMensaje = document.getElementById('msgCampos'); // Reemplaza con el ID real de tu elemento
    if (pMensaje) {
      pMensaje.innerHTML = '';
    }
  }

  validarNombre(nombre) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/;
    return regExp.test(nombre);
  }

  validarValor(valor) {
    // Agrega tu lógica de validación para el campo de valor
    const regExp = /^\d{1,}$/;
    return regExp.test(valor);
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
  eventosComprobacion (pMensaje, iNombre, iImagen, iValor, btnAnadirBasura, imagenMiniatura) {
    iImagen.addEventListener('change', (event) => this.mostrarMiniatura(event, imagenMiniatura))
    iNombre.onblur = (evento) => this.comprobacionNombre(evento, pMensaje)
    iValor.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
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
