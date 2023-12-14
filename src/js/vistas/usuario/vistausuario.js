/**
 * Clase encargada de las Vistas del usuario.
 * @class
 */
export class Vistausuario {

  /**
   * Creación de símbolos para las vistas.
   * @enum {Symbol}
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
   * Constructor de la clase. Inicializa los atributos correspondientes.
   * @constructor
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor (controlador, base) {
    this.controlador = controlador
    this.base = base
  }

  /**
   * Muestra u oculta la vista.
   * @param {boolean} ver - True para mostrar, false para ocultar.
   */
  mostrar (ver) {
    if(!this.base){return}
    if (ver) {
      this.base.style.display = 'block'
    } else {
      this.base.style.display = 'none'
    }
  }

  /**
   * Activa el modo oscuro.
   */
  modoOscuro() {
    const body = document.body;
    const isDarkModeEnabled = localStorage.getItem('darkmode') === 'enabled';
    if (isDarkModeEnabled) {
      body.classList.add('darkmode');
      this.elementosHijos(true);
    }
  }

  /**
   * Checkea el idioma.
   */
  idioma() {
    let idiomaSeleccionado
    if(localStorage.getItem('language')) {
      idiomaSeleccionado = localStorage.getItem('language');
    } else {
      idiomaSeleccionado = "es"
    }
    return idiomaSeleccionado;
  }

  cambiarIdioma() {
    const elementosTraducir = document.querySelectorAll("[id]");
    elementosTraducir.forEach(elemento => {
      const id = elemento.id;
      if (this.traduccion[this.idioma()][id]) {
        elemento.innerHTML = this.traduccion[this.idioma()][id];
      }
    });
  }

  /**
   * Aplica el modo oscuro a los elementos secundarios.
   * @param {boolean} enableDarkMode - True para activar, false para desactivar.
   */
  elementosHijos(enableDarkMode) {
    const elementos = document.querySelectorAll('*');
    elementos.forEach((elemento) => {
      elemento.classList.toggle('darkmode', enableDarkMode);
    });
  }
}