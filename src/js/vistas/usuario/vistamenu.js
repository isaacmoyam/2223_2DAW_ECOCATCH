import { Vistausuario } from './vistausuario.js';

/**
 * Clase encargada de la Vista del menú, hereda de Vistausuario.
 * @class
 */
export class Vistamenu extends Vistausuario {

  /**
   * Constructor de la clase. Inicializa los atributos correspondientes.
   * @constructor
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor(controlador, base) {
    super(controlador, base);
    this.eventos();
  }

  /**
   * Asocia los eventos de la interfaz, en este caso, activa el modo oscuro.
   * @method
   */
  eventos() {
    super.modoOscuro()
    this.idiomaSeleccionado = super.idioma()

    this.traduccion = {
      es: {
        tituloweb: "Menú Principal",
        empezarenlace: "Empezar Partida",
        conocenosenlace: "Conócenos"
      },
      en: {
        tituloweb: "Main Menu",
        empezarenlace: "New Game",
        conocenosenlace: "About us"
      }
    };

    super.cambiarIdioma()
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistamenu() }
