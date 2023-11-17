import { VistaAdmin } from './vistaAdmin.js'

/**
 * Clase encargada de la Vista 2 del administrador
 */
export class Vista2 extends VistaAdmin {
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
     * Asocia los eventos de la interfaz de la vista 2 del administrador
     */
  eventos () {
    let iNombre, iImagen, iAumento, btnAnadirBasura, pMensaje
    // Coger referencias del interfaz
    this.enlaceVolverVista = this.base.querySelectorAll('a')[0]

    iNombre = document.querySelectorAll('input')[3]
    iAumento = document.querySelectorAll('input')[4]
    iImagen = document.querySelectorAll('input')[5]

    btnAnadirBasura = document.getElementsByClassName('btnAnadir')[1]
    pMensaje = document.getElementsByClassName('msgCampos')[1]
    this.controlador.eventosComprobacion(pMensaje, iNombre, iImagen, iAumento, btnAnadirBasura, imagenMiniatura2)

    // Asociar eventos
    this.enlaceVolverVista.onclick = () => {
      this.controlador.verVista(VistaAdmin.VISTA1)
    }
  }
}
