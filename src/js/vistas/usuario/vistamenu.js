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
    this.enlace = false

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

    const img = document.querySelector("img");

    img.addEventListener('mousedown', () => {
      this.iniciarTemporizador();
    });

    img.addEventListener('mouseup', () => {
      this.limpiarTemporizador();
    });

    img.addEventListener('mouseout', () => {
      this.limpiarTemporizador();
    });
  }

  iniciarTemporizador() {
    this.temporizador = setTimeout(() => {
      if(this.enlace == false) {
        this.enlace = true
        const menu = document.getElementById("menu")
        const enlace = document.createElement("a")
        
        if(this.idiomaSeleccionado === "en") {
          enlace.textContent = "Admin Mode"
        } else {
          enlace.textContent = "Modo administrador"
        }

        enlace.href = "usuario/administrador/administrador.html"
        menu.appendChild(enlace)
        super.modoOscuro()
      }
    }, 5000);
  }

  /**
   * Limpia el temporizador.
   * @method
   */
  limpiarTemporizador() {
    clearTimeout(this.temporizador);
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistamenu() }
