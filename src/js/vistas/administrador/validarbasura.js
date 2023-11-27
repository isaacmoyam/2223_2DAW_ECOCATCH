import { VistaAdmin } from '../administrador/vistaAdmin.js'

/**
 * Clase encargada de la Vista 1 del administrador.
 * @extends VistaAdmin
 */
export class Validarformulario extends VistaAdmin {

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

    const mensaje = document.getElementById('msgCampos');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const imagenInput = document.querySelector('input[name="imagen"]');
    const valorInput = document.querySelector('input[name="valor"]');
    const imagenMiniatura = document.getElementById('imagenMiniatura');

    // Agregamos la validación del formulario al evento submit
    document.getElementById('formBasura').addEventListener('submit', (event) => {
      this.validarFormulario(event);
    });

    this.eventosComprobacion(mensaje, nombreInput, imagenInput, valorInput, imagenMiniatura);

  }

  validarFormulario(event) {
    event.preventDefault();
  
    const nombreInput = document.querySelector('input[name="nombre"]');
    const valorInput = document.querySelector('input[name="valor"]');
    const imagenInput = document.querySelector('input[name="imagen"]');
    const formBasura = document.getElementById('formBasura')

    const nombre = nombreInput.value;
    const valor = valorInput.value;
    const imagen = imagenInput.value;

    let mensajeError = null;
    
    if (!nombre) {
      mensajeError = 'Por favor, rellena el campo nombre';
      this.mostrarMensajeError(nombreInput, mensajeError);
    }
    
    if (!valor) {
      mensajeError = 'Por favor, rellena el campo valor';
      this.mostrarMensajeError(valorInput, mensajeError);
    }
    
    if (!imagen || this.nombreArchivoValido(imagenInput,nombre) == false) {
      
      this.mostrarMensajeError(imagenInput, mensajeError);
    } else {
      imagenInput.style.backgroundColor = ''
    }

    let urlForm = formBasura.action

    // Realiza la lógica de validación aquí
    if (this.validarNombre(nombre) && this.validarValor(valor) && this.nombreArchivoValido(imagenInput,nombre)) {
      formBasura.action = urlForm // Habilitar el botón
  
      // Envía el formulario al servidor
      document.getElementById('formBasura').submit();
    }
  }
  
  mostrarMensajeError(input, mensaje) {
    const pMensaje = document.getElementById('msgCampos'); // Reemplaza con el ID real de tu elemento
    if (pMensaje && (input.name==="nombre" || input.name==="valor")) {
      pMensaje.style.color = 'red';
      input.style.borderColor = 'red';
    } else {
      input.style.backgroundColor = 'red'
    }
    pMensaje.innerHTML = mensaje;
  }

  validarNombre(nombre) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/;
    return regExp.test(nombre);
  }

  validarValor(valor) {
    // Agrega tu lógica de validación para el campo de valor
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    return regExp.test(valor);
  }

  eventosComprobacion (pMensaje, iNombre, iImagen, iValor, imagenMiniatura) {
    iImagen.addEventListener('change', (event) => this.mostrarMiniatura(event, imagenMiniatura))
    iNombre.onblur = (evento) => this.comprobacionNombre(evento, pMensaje)
    iValor.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
  }

  /**
     * Método por el cual se obtiene el nombre del archivo de la imágen sin la extensión
     * @param iImagen {Object} Objeto correspondiente al campo de la imágen
     * @returns {null|string} Devuelve null si no se ha introducido una imagen o String: nombre del archivo de la imagen
     */
  nombreArchivoValido(iImagen, nombreInput) {
    if (iImagen && iImagen.files && iImagen.files.length > 0) {
        // iImagen no es nulo por lo que se ha seleccionado un archivo
        // Cogemos el archivo introducido del input type file
        const files = iImagen.files;
        const selectedFile = files[0];

        // Obtenemos el nombre del archivo
        const nombreArchivoExtension = selectedFile.name
        
        const partes = nombreArchivoExtension.split(".")

        const nombreArchivo = partes[0]

        // Validamos la extensión del archivo

        const extensionArchivo = "." + partes[1]

        const extensionesPermitidas = ['.jpg', '.jpeg', '.png'];

        if (extensionesPermitidas.includes(extensionArchivo)) {
          if(nombreArchivo === nombreInput) {
            return true;
          } else {
            let mensajeError = 'La imagen no tiene el mismo nombre que el item.';
            this.mostrarMensajeError(iImagen, mensajeError);
            return false;
          }
        } else {
          let mensajeError = 'La imagen no tiene una extensión valida.';
          this.mostrarMensajeError(iImagen, mensajeError);
          return false;
        }
    } else {
        return false;
    }
}

  /**
     * LLama a una función encargada de comprobar si se valida el campo Nombre mediante una expresión regular determinada.
     * Se ejecuta con un evento onblur en el campoNombre
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     */
  comprobacionNombre (evento, pMensaje) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/
    let mensaje = "El nombre debe tener máximo 20 caracteres"
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
    let mensaje = "El valor tiene que ser un número entre 1 y 254"
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

window.onload = () => { new Validarformulario() }