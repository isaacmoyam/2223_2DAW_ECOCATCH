/**
 * Clase encargada de la Vista
 */
export class Vista {
  /**
	 * Creacion de Simbolos de las vistas
	 */
  static {
    Vista.VISTA1 = Symbol('Index')
    Vista.VISTA2 = Symbol('Ranking')
    Vista.VISTA3 = Symbol('Conoceos')
    Vista.VISTAEMPEZAR = Symbol('Empezar')
    Vista.VISTANIVELES = Symbol('seleccionNivel')
    Vista.VISTA6 = Symbol('Jugar')
    Vista.VISTA7 = Symbol('Formulario')
    Vista.VISTA8 = Symbol('PruebaAJAX')
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

  mostrar (ver) {
    if(!this.base){return}
    if (ver) {
      this.base.style.display = 'block'
    } else {
      this.base.style.display = 'none'
    }
  }

  modoOscuro() {
    const body = document.body;
    const isDarkModeEnabled = localStorage.getItem('darkmode') === 'enabled';
    if (isDarkModeEnabled) {
      body.classList.add('darkmode');
      this.elementosHijos(true);
    }
  }

  elementosHijos(enableDarkMode) {
    const elementos = document.querySelectorAll('*');
    elementos.forEach((elemento) => {
      elemento.classList.toggle('darkmode', enableDarkMode);
    });
  }
}

