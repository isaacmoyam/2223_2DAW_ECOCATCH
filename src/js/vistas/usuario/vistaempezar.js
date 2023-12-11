import { Vistausuario } from './vistausuario.js';

/**
 * Clase encargada de la Vista de inicio, hereda de Vistausuario.
 * @class
 */
export class Vistaempezar extends Vistausuario {

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
   * Asocia los eventos de la interfaz, en este caso, inicializa el modo oscuro.
   * @method
   */
  eventos() {
    const btnVolver = document.getElementById("btnVolver")

    btnVolver.addEventListener('click', (event) => this.borrarHeader(event));

    document.getElementById('btnJugar').addEventListener('click', (event) => {
      this.validarEmpezar(event);
    });

    this.inicializarModoOscuro()

  }

  validarEmpezar(event) {
    event.preventDefault();
    let color = document.getElementById("color");
    let idioma = document.getElementById("idioma");
    let formulario = 0;
  
    if (color.value.trim() !== "") {
      localStorage.setItem("colorBarco", color.value)
      formulario++
    } else {
      const mensaje = "El color del barco no ha sido seleccionado"
      this.mensajeAviso(mensaje)
    }

    if(idioma.value.trim() !== "") {
      localStorage.setItem("idioma", idioma.value)
      formulario++
    } else {
      const mensaje = "El idioma no ha sido seleccionado"
      this.mensajeAviso(mensaje)
    }

    if(formulario === 2) {
      window.location.href = "../nivel/nivel.html"
    }
  }

  mensajeAviso(mensaje) {
    const avisoContenedor = document.getElementById("msgCampos")
    avisoContenedor.style.color = "red"
    avisoContenedor.innerHTML = mensaje
  }

  /**
   * Inicializa el modo oscuro y agrega un evento al botón de cambiar modo.
   * @method
   */
  inicializarModoOscuro() {
    super.modoOscuro()
    const body = document.body
    const cambiarModo = document.getElementById('dark');

    if (cambiarModo) {
      cambiarModo.addEventListener('click', () => {
        // Toggle del modo oscuro
        const enableDarkMode = !body.classList.contains('darkmode');
        body.classList.toggle('darkmode', enableDarkMode);
        super.elementosHijos(enableDarkMode);

        // Guardar el estado del modo oscuro en el almacenamiento local
        localStorage.setItem('darkmode', enableDarkMode ? 'enabled' : 'disabled');
      });
    }
  }

  borrarHeader(event) {
    event.preventDefault();
    const header = document.getElementById("logo")

    // Borra el header si existe
    if(header){
      header.remove();
    }
    
    window.location.href = '../../index_usuario.html';
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistaempezar() }
