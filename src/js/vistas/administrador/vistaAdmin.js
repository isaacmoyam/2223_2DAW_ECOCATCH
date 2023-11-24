/**
 * Clase encargada de la Vista del administrador
 */
export class VistaAdmin {
  /**
     * Creacion de Simbolos de las vistas del administrador
     */
  static {
    VistaAdmin.VISTA1 = Symbol('Vista1')
    VistaAdmin.VISTA2 = Symbol('Vista2')
  }

  /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
  constructor (controlador, base) {
    this.controlador = controlador
    this.base = base
  }

  /**
     * Muestra u oculta tu constula
     * @param ver {Boolean} Indica si la vista debe mostrarse (true) u ocultarse (false)
     */
  mostrar (ver) {
    if(!this.base){return}
    if (ver) {
      this.base.style.display = 'block'
    } else {
      this.base.style.display = 'none'
    }
  }
}
