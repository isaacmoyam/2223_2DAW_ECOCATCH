import { VistaAdmin } from '../administrador/vistaAdmin.js'

/**
 * Clase encargada de la Vista 1 del administrador.
 * @extends VistaAdmin
 */
export class Vistanivel extends VistaAdmin {

  /**
   * Constructor de la clase. Inicializa los atributos correspondientes.
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor(controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
   * Asocia los eventos de la interfaz de la vista 1 del administrador.
   * @returns {void}
   */
  eventos() {

    const botonesBorrar = document.querySelectorAll("#botonBorrar");

    const btnAgregarFila = document.getElementById('btnAgregarFila');

    const mensaje = document.getElementById('msgCampos');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const itemsInput = document.querySelector('input[name="cantidadItems"]');
    const velocidadInput = document.querySelector('input[name="velocidadBarco"]');
    const contenidoInput = document.querySelector('input[name="contenido[]"]');
    const puntosInput = document.querySelector('input[name="puntosHasta[]"]');

    // Botones para borrar filas añadidas
    botonesBorrar.forEach((boton) => {
      boton.addEventListener('click', (event) => this.emergenteBorrar(event));
    });

    // Agregar filas a la tabla dinámica
    if (!btnAgregarFila){}
    else
      btnAgregarFila.addEventListener('click', this.agregarFila.bind(this));

    // Agregamos la validación del formulario al evento submit
    document.getElementById('formNivel').addEventListener('submit', (event) => {
      this.validarFormulario(event);
    });

    this.eventosComprobacion(mensaje, nombreInput, itemsInput, velocidadInput, contenidoInput, puntosInput);
  }

  emergenteBorrar(event) {
    event.preventDefault();

    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar el elemento?");

    if (confirmacion) {
        let urlRedireccion = event.target.getAttribute("href");
        window.location.href = urlRedireccion;
    } else {
        // Si el usuario hace clic en "Cancelar", no hacemos nada.
    }
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

  validarFormulario(event) {
    event.preventDefault();
  
    const nombreInput = document.querySelector('input[name="nombre"]');
    const itemsInput = document.querySelector('input[name="cantidadItems"]');
    const velocidadInput = document.querySelector('input[name="velocidadBarco"]');
    const contenidoInput = document.querySelector('input[name="contenido[]"]');
    const puntosInput = document.querySelector('input[name="puntosHasta[]"]');
    const formNivel = document.getElementById('formNivel')

    const nombre = nombreInput.value;
    const items = itemsInput.value;
    const velocidad = velocidadInput.value;
    const contenido = contenidoInput.value;
    const puntos = puntosInput.value;

    let mensajeError = null;
    
    if (!nombre) {
        mensajeError = 'Por favor, rellena el campo nombre';
        this.mostrarMensajeError(nombreInput, mensajeError);
    }
    
    if (!items) {
        mensajeError = 'Por favor, rellena el campo items';
        this.mostrarMensajeError(itemsInput, mensajeError);
    }
    
    if (!velocidad) {
        mensajeError = 'Por favor, rellena el campo velocidad';
        this.mostrarMensajeError(velocidadInput, mensajeError);
    }

    if (!contenido) {
      mensajeError = 'Por favor, rellena el campo contenido';
      this.mostrarMensajeError(contenidoInput, mensajeError);
    }

    if (!puntos) {
      mensajeError = 'Por favor, rellena el campo puntos requeridos';
      this.mostrarMensajeError(puntosInput, mensajeError);
    }

    let urlForm = formNivel.action

    // Realiza la lógica de validación aquí
    if (this.validarNombre(nombre) && this.validarValor(items) && this.validarValor(velocidad) 
    && this.validarContenido(contenido) && this.validarPuntos(puntos)) {
      // Habilitar el botón
      formNivel.action = urlForm
      // Envía el formulario al servidor
      document.getElementById('formNivel').submit();
    }
  }
  
  mostrarMensajeError(input, mensaje) {
    const pMensaje = document.getElementById('msgCampos'); // Reemplaza con el ID real de tu elemento
    if (pMensaje) {
      pMensaje.style.color = 'red';
      input.style.borderColor = 'red';
      pMensaje.innerHTML = mensaje;
    }
  }

  validarNombre(nombre) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/;
    return regExp.test(nombre);
  }

  validarValor(valor) {
    // Agrega tu lógica de validación para el campo de items
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    return regExp.test(valor);
  }

  validarContenido(valor) {
    // Agrega tu lógica de validación para el campo de items
    const regExp = /^[\s\S]{1,500}$/;
    return regExp.test(valor);
  }

  validarPuntos(valor) {
    // Agrega tu lógica de validación para el campo de items
    const regExp = /^(?:[1-9]\d{0,3}|[1-5]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|65535)$/;
    return regExp.test(valor);
  }

  eventosComprobacion (pMensaje, nombreInput, itemsInput, velocidadInput, contenidoInput, puntosInput) {
    nombreInput.onblur = (evento) => this.comprobacionNombre(evento, pMensaje)
    itemsInput.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
    velocidadInput.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
    contenidoInput.onblur = (evento) => this.comprobacionContenido(evento, pMensaje)
    puntosInput.onblur = (evento) => this.comprobacionPuntos(evento, pMensaje)
  }

  comprobacionNombre (evento, pMensaje) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/
    let mensaje = "El nombre debe tener máximo 50 caracteres y no tener espacios"
    this.validarCampo(evento, pMensaje, mensaje, regExp)
  }

  /**
     * LLama a una función encargada de comprobar si se valida el campo Valor mediante una expresión regular determinada.
     * Se ejecuta con un evento onblur en el campoNombre
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     */
  comprobacionValor (evento, pMensaje) {
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    let mensaje = "Los valores numéricos deben ser un número entre 1 y 254"
    this.validarCampo(evento, pMensaje, mensaje, regExp)
  }

  comprobacionContenido (evento, pMensaje) {
    const regExp = /^[\s\S]{1,500}$/;
    let mensaje = "El contenido del mensaje debe ser de máximo 500 caracteres"
    this.validarCampo(evento, pMensaje, mensaje, regExp)
  }

  comprobacionPuntos (evento, pMensaje) {
    const regExp = /^(?:[1-9]\d{0,3}|[1-5]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|65535)$/;
    let mensaje = "La puntuación requerida debe ser entre 1 y 65535"
    this.validarCampo(evento, pMensaje, mensaje, regExp)
  }

  /**
     *
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     * @param regExp {Object} Expresión Regular
     */
  validarCampo (evento, pMensaje, mensaje, regExp) {
    const input = evento.target 
    if (!regExp.test(input.value)) {
      this.mostrarMensajeError(input,mensaje)
    } else {
      input.style.borderColor = 'yellow'
      pMensaje.innerHTML = ""
    }
  }
}

window.onload = () => { new Vistanivel() }