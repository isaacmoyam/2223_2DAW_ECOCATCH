import { VistaAdmin } from '../administrador/vistaAdmin.js'

/**
 * Clase encargada de la Vista 1 del administrador
 */
export class Vista1 extends VistaAdmin {
  /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
  constructor (controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
     * Asocia los eventos de la interfaz de la vista 1 del administrador
     */
  eventos () {
    let iNombre, iImagen, iValor, btnAnadirBasura, pMensaje
    // Coger referencias del interfaz
    this.enlaceVistaConfigPoweup = this.base.querySelectorAll('a')[0]

    iNombre = document.querySelectorAll('input')[0]
    iValor = document.querySelectorAll('input')[1]
    iImagen = document.querySelectorAll('input')[2]

    btnAnadirBasura = document.getElementsByClassName('btnAnadir')[0]

    pMensaje = document.getElementsByClassName('msgCampos')[0]
    /*
            imagenMiniatura es el nombre del id de la etiqueta img en donde quieres que se muestre la imagen introducida
        */
    this.controlador.eventosComprobacion(pMensaje, iNombre, iImagen, iValor, btnAnadirBasura, imagenMiniatura)

    // Asociar eventos
    this.enlaceVistaConfigPoweup.onclick = () => {
      this.controlador.verVista(VistaAdmin.VISTA2)
    }
  }
}
