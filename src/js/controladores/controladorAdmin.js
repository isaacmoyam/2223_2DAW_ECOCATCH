import { ModeloUsuario } from '../modelos/modeloUsuario.js'
import { VistaAdmin } from '../vistas/administrador/vistaAdmin.js'
import { Vista1 } from '../vistas/administrador/vista1.js'
import { Vista2 } from '../vistas/administrador/vista2.js'

/**
 * Clase controlador del usuario. Se encarga de controlar las vistas del usuario
 */
class ControladorAdmin {
  vistas = new Map()
  /**
     *  Inicializa los atributos del Controlador del administrador.
     *  Coge las referencias del interfaz. Y muestra la primera Vista
     */
  constructor () {
    // Consigo las referencias del interfaz
    const divVista1 = document.getElementById('divVista1')
    const divVista2 = document.getElementById('divVista2')

    // Creo las vistas
    this.vistas.set(VistaAdmin.VISTA1, new Vista1(this, divVista1))
    this.vistas.set(VistaAdmin.VISTA2, new Vista2(this, divVista2))

    this.verVista(VistaAdmin.VISTA1)
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

    btnAnadirBasura.onclick = () => this.pruebaClick(pMensaje, iImagen, iNombre)

    iValor.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
    iNombre.onblur = (evento) => this.comprobacionNombre(evento, pMensaje)
  }

  /**
     * Compara si son iguales los valores de el archivo de la imagen y del nombre
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     * @param iImagen {Object} Objeto correspondiente al campo de la imágen
     * @param iNombre {Object} Objeto correspondiente al campo nombre
     */
  pruebaClick (pMensaje, iImagen, iNombre) {
    if (iImagen !== null && this.nombreArchivo(iImagen) === this.valorCampoNombre(iNombre)) {
      // Se enviará datos a la base de datos
      // console.log('Correcto')
      pMensaje.innerHTML = ''
    } else {
      pMensaje.style.color = 'red'
      pMensaje.innerHTML = 'El archivo Imagen debe tener el mismo nombre que el introducido en Nombre:'
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
