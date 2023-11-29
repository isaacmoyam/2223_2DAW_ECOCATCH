/**
 * Clase encargada de la Vista
 */
export class Vistausuario {
  /**
	 * Creacion de Simbolos de las vistas
	 */
  static {
    Vistausuario.VISTAMENU = Symbol('Index')
    Vistausuario.VISTARANKING = Symbol('Ranking')
    Vistausuario.VISTACONOCENOS = Symbol('Conocenos')
    Vistausuario.VISTAEMPEZAR = Symbol('Empezar')
    Vistausuario.VISTANIVELES = Symbol('seleccionNivel')
    Vistausuario.VISTAJUGAR = Symbol('Jugar')
    Vistausuario.VISTAFORMULARIO = Symbol('Formulario')
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

