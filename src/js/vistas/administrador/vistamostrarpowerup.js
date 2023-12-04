import { Vistaadmins } from '../administrador/vistaadmins.js'

/**
 * Clase encargada de la Vistamostrarpowerup del administrador, hereda de Vistaadmins.
 * @extends Vistaadmins
 */
export class Vistamostrarpowerup extends Vistaadmins {

  /**
   * Constructor de la clase. Inicializa los atributos correspondientes.
   * @constructor
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor(controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
   * Asocia los eventos de la interfaz de la vista 1 del administrador.
   * @method
   * @returns {void}
   */
  eventos() {

    const mensaje = document.getElementById("msgCampos")
    const nombreInputs = document.querySelectorAll('input[name="nombre[]"]');
    const imagenInputs = document.querySelectorAll('input[name="imagen[]"]');
    const aumentoInputs = document.querySelectorAll('input[name="aumento[]"]');
    const descripcionInputs = document.querySelectorAll('input[name="descripcion[]"]');
    const imagenesMiniatura = document.getElementsByClassName('imagenMiniatura[]');
    
    // Agregamos la validación del formulario al evento submit
    document.getElementById('formPowerup').addEventListener('submit', (event) => {
      this.validarFormularioPowerup(event);
    });

    this.eventosComprobacionPowerup(mensaje, nombreInputs, imagenInputs, aumentoInputs, descripcionInputs, imagenesMiniatura);

    const botonPorDefecto = document.querySelector("#botonPorDefecto");
    botonPorDefecto.addEventListener('click', (event) => this.emergentePorDefecto(event));
  }

  emergentePorDefecto(event) {
    event.preventDefault();

    const confirmacion = window.confirm("¿Estás seguro de que quieres reestablecer todos los elementos?");

    if (confirmacion) {
        let urlRedireccion = event.target.getAttribute("href");
        window.location.href = urlRedireccion;
    } else {
        // Si el usuario hace clic en "Cancelar", no hacemos nada.
    }
  }

  /**
   * Valida el formulario para la modificación de elementos de Powerup.
   * @param {Event} event - Evento del formulario.
   * @returns {void}
   */
  validarFormularioPowerup(event) {
    event.preventDefault();
  
    const nombreInputs = document.querySelectorAll('input[name="nombre[]"]');
    const aumentoInputs = document.querySelectorAll('input[name="aumento[]"]');
    const descripcionInputs = document.querySelectorAll('input[name="descripcion[]"]');
    const imagenInputs = document.querySelectorAll('input[name="imagen[]"]');
  
    const formPowerup = document.getElementById('formPowerup');
  
    let mensajeError = null;
    let formularioValido = false;

    let contador = 0
    
    let nombreOk = false
    let aumentoOk = false
    let descripcionOk = false
    let hayImagen = false
    let imagenOk = false

    for (let i = 0; i < nombreInputs.length; i++) {

      nombreOk = false
      aumentoOk = false
      descripcionOk = false
      hayImagen = false
      imagenOk = false
  
      if (!nombreInputs[i].value || !this.validarNombrePowerup(nombreInputs[i].value)) {
        mensajeError = 'Por favor, rellena el campo nombre';
        this.mostrarMensajeErrorPowerup(nombreInputs[i], mensajeError);
      } else {
        nombreOk = true
      }
  
      if (!aumentoInputs[i].value || !this.validarAumentoPowerup(aumentoInputs[i].value)) {
        mensajeError = 'Por favor, rellena el campo aumento';
        this.mostrarMensajeErrorPowerup(aumentoInputs[i], mensajeError);
      } else {
        aumentoOk = true
      }

      if (!descripcionInputs[i].value || !this.validarDescripcion(descripcionInputs[i].value)) {
        mensajeError = 'Por favor, introduce una descripción';
        this.mostrarMensajeErrorPowerup(descripcionInputs[i], mensajeError);
      } else {
        descripcionOk = true
      }

      if (imagenInputs[i].files.length > 0) {
        // Validar nombre del archivo solo si se ha introducido una imagen
        hayImagen = true
        if (this.nombreArchivoValido(imagenInputs[i])) {
          imagenOk = true
        }
      }
      if(!hayImagen && nombreOk && aumentoOk && descripcionOk) {
        contador++
      } else {
        if(hayImagen && imagenOk && nombreOk && aumentoOk && descripcionOk){
          contador++
        }
      }

      if (contador == 3) {
        formularioValido = true;
      }
    }

    if (formularioValido) {
      // Realiza la lógica de validación aquí antes de enviar el formulario
      let urlForm = formPowerup.action;
      formPowerup.action = urlForm;
      document.getElementById('formPowerup').submit();
    }
  }

  
  /**
   * Muestra un mensaje de error y cambia los estilos del campo de Powerup correspondiente.
   * @param {HTMLInputElement} input - Campo de Powerup que contiene el error.
   * @param {string} mensaje - Mensaje de error a mostrar.
   * @returns {void}
   */
  mostrarMensajeErrorPowerup(input, mensaje) {
    const pMensaje = document.getElementById('msgCampos'); // Reemplaza con el ID real de tu elemento
    if (pMensaje && (input.name === "nombre[]" || input.name === "aumento[]" || input.name === "descripcion[]")) {
      pMensaje.style.color = 'red';
      input.style.borderColor = 'red';
    }
    pMensaje.innerHTML = mensaje;
  }

  /**
   * Valida el nombre para el campo de nombre en la sección de Powerup.
   * @param {string} nombre - Nombre a validar.
   * @returns {boolean} - Devuelve true si el nombre es válido, de lo contrario, devuelve false.
   */
  validarNombrePowerup(nombre) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/;
    return regExp.test(nombre);
  }

  validarAumentoPowerup(aumento) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    return regExp.test(aumento);
  }

  /**
   * Maneja los eventos de comprobación en la sección de Powerup.
   * @param {Object} pMensaje - Objeto donde se mostrarán los mensajes necesarios.
   * @param {Object} iNombre - Elemento de entrada para el nombre.
   * @param {Object} iImagen - Elemento de entrada para la imagen.
   * @param {Object} iValor - Elemento de entrada para el valor.
   * @param {Object} imagenMiniatura - Elemento de imagen para la miniatura.
   * @returns {void}
   */
  eventosComprobacionPowerup (pMensaje, iNombre, iImagen, iAumento, iDescripcion, imagenMiniatura) {
    iImagen.forEach((input, index) => {
      input.addEventListener('change', (event) => this.mostrarMiniatura(event, imagenMiniatura[index]))
    });
    iNombre.forEach(input => {
      input.onblur = (evento) => this.comprobacionNombrePowerup(evento, pMensaje)
    });
    iAumento.forEach(input => {
      input.onblur = (evento) => this.comprobacionValorPowerup(evento, pMensaje)
    });
    iDescripcion.forEach(input => {
      input.onblur = (evento) => this.comprobacionDescripcionPowerup(evento, pMensaje)
    });
  }

  mostrarMiniatura(event, imagenMiniatura) {
    const file = event.target.files[0]; // Solo toma el primer archivo seleccionado
    const reader = new FileReader();

    reader.onload = function () {
        // Mostrar la miniatura en el elemento 'imagenMiniatura'
        // Asignar el resultado de reader.result a la propiedad src de la imagen
        imagenMiniatura.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
  }

  /**
   * Comprueba y valida el campo de nombre en la sección de Powerup.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se introducirán los mensajes necesarios.
   * @returns {void}
   */
  comprobacionNombrePowerup (evento, pMensaje) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/
    let mensaje = "El nombre debe tener máximo 20 caracteres y no tener espacios"
    this.validarCampoPowerup(evento, pMensaje, mensaje, regExp)
  }

  /**
   * Comprueba y valida el campo de valor en la sección de Powerup.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se introducirán los mensajes necesarios.
   * @returns {void}
   */
  comprobacionValorPowerup (evento, pMensaje) {
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    let mensaje = "Los valores numéricos deben ser un número entre 1 y 254"
    this.validarCampoPowerup(evento, pMensaje, mensaje, regExp)
  }

  /**
   * Valida el campo en la sección de Powerup y muestra mensajes de error si es necesario.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se introducirán los mensajes necesarios.
   * @param {string} mensaje - Mensaje a mostrar si la validación falla.
   * @param {RegExp} regExp - Expresión regular para la validación del campo.
   * @returns {void}
   */
  validarCampoPowerup (evento, pMensaje, mensaje, regExp) {
    const input = evento.target 
    if (!regExp.test(input.value)) {
      this.mostrarMensajeErrorPowerup(input,mensaje)
    } else {
      input.style.borderColor = 'yellow'
      pMensaje.innerHTML = ""
    }
  }

  validarDescripcion(valor) {
    // Agrega tu lógica de validación para el campo de items
    const regExp = /^[\s\S]{1,300}$/;
    return regExp.test(valor);
  }

  comprobacionDescripcionPowerup (evento, pMensaje) {
    const regExp = /^[\s\S]{1,300}$/;
    let mensaje = "La descripción debe ser de máximo 300 caracteres"
    this.validarCampoPowerup(evento, pMensaje, mensaje, regExp)
  }

   /**
   * Verifica si el nombre de archivo seleccionado es válido en la sección de basura.
   * @param {Object} iImagen - Elemento de entrada para la imagen.
   * @returns {boolean} - Devuelve true si el nombre del archivo es válido, de lo contrario, devuelve false.
   */
   nombreArchivoValido(iImagen) {
    if (iImagen && iImagen.files && iImagen.files.length > 0) {
        // iImagen no es nulo por lo que se ha seleccionado un archivo
        // Cogemos el archivo introducido del input type file
        const files = iImagen.files;
        const selectedFile = files[0];

        // Obtenemos el nombre del archivo
        const nombreArchivoExtension = selectedFile.name

        if(nombreArchivoExtension.length < 20) {
            const partes = nombreArchivoExtension.split(".")

            // Validamos la extensión del archivo

            const extensionArchivo = "." + partes[1]

            const extensionPermitida = '.png'

            if (extensionPermitida === extensionArchivo) {
                return true;
            } else {
                let mensajeError = 'La imagen no tiene una extensión valida.';
                this.mostrarMensajeErrorPowerup(iImagen, mensajeError);
                return false;
            }
        } else {
            let mensajeError = 'El nombre de la imagen no puede sobrepasar los 30 caracteres.';
            this.mostrarMensajeErrorPowerup(iImagen, mensajeError);
            return false;
        }
    } else {
      return false;
    }
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistamostrarpowerup() }