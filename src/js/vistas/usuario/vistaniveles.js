import { Vistausuario } from './vistausuario.js'
import { Rest } from '../../servicios/rest.js'

/**
 * Clase encargada de la Vista de niveles, hereda de Vistausuario.
 * @class
 */
export class Vistaniveles extends Vistausuario {

  /**
   * Constructor de la clase. Inicializa los atributos correspondientes.
   * @constructor
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor (controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
   * Asocia los eventos de la interfaz, activa el modo oscuro y realiza una llamada GET.
   * @method
   */
  eventos () {
    super.modoOscuro()
    this.llamarGET()
  }

  /**
   * Realiza una llamada GET para obtener la lista de niveles y los muestra en la interfaz.
   * @method
   */
  llamarGET = () => {
    Rest.getJSON('../../../src/carpetasupersecretaparaadmin2daw/index.php?control=nivel_con&metodo=ajaxNivel', null, this.verResultadoGET);
  }

  /**
   * Muestra los resultados obtenidos de la llamada GET en la interfaz.
   * @method
   * @param {Object} respuesta - Respuesta obtenida de la llamada GET.
   */
  verResultadoGET = (respuesta) => {
    const contenedor = document.getElementById("contenedorNiveles")
    respuesta.forEach(function(elemento) {
      let boton = document.createElement("button")
      boton.textContent = elemento.nombre
      boton.style.marginRight = "2%" 
      boton.onclick = function() {
        localStorage.setItem('id', elemento.id);
        localStorage.setItem('nombreLvl', elemento.nombre);
        localStorage.setItem('items', elemento.cantidadItems);
        localStorage.setItem('velocidad', elemento.velocidadBarco);
        window.location.href = '../jugar/jugar.html';
      };
      contenedor.appendChild(boton)
    });
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistaniveles() }
