import { Vistausuario } from './vistausuario.js';

/**
 * Clase encargada de la Vista de broma, hereda de Vistausuario.
 * @class
 */
export class Vistabroma extends Vistausuario {

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
   * Asocia los eventos de la interfaz, en este caso, activa el modo oscuro entre otras cosas.
   * @method
   */
  eventos() {

    super.modoOscuro()
    
    this.idiomaSeleccionado = super.idioma()

    this.traduccion = {
      es: {
        tituloweb: "Menú Administrador",
        adminMenu: "Menú Administrador",
        cancion: "Reproducir 'Tanto la quería' de Andy y Lucas",
        borrarDatos: "Borrar todos los datos [PULSAR EN CASO DE EMERGENCIA]"
      },
      en: {
        tituloweb: "Admin Menu",
        adminMenu: "Admin Menu",
        cancion: "Play 'Tanto la quería' by Andy y Lucas.",
        borrarDatos: "Delete all data [PRESS IN CASE OF EMERGENCY]"
      }
    };

    super.cambiarIdioma()

    const botonCancion = document.getElementById("cancion")

    botonCancion.addEventListener('click', () => {
      this.playAndyLucas();
    });

    const botonCancion2 = document.getElementById("borrarDatos")

    botonCancion2.addEventListener('click', () => {
      this.playEmerg();
    });

  }

  playAndyLucas(){
    const audioP = document.getElementById("emerg")
    const audio = document.getElementById("andy")
    audioP.pause()
    audio.play()
  }

  playEmerg(){
    const audioP = document.getElementById("andy")
    const audio = document.getElementById("emerg")
    audioP.pause()
    audio.play()
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistabroma() }
