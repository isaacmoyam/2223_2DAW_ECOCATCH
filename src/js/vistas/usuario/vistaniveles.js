import { Vistausuario } from './vistausuario.js'
import { Rest } from '../../servicios/rest.js'

/**
 * Clase encargada de la Vista niveles
 */
export class Vistaniveles extends Vistausuario {
  /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
  constructor (controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  eventos () {
    super.modoOscuro()
    this.llamarGET()
  }

  llamarGET = () => {
    Rest.getJSON('../../../src/index.php?control=nivel_con&metodo=ajaxNombreNivel', null, this.verResultadoGET);
  }

  verResultadoGET = (respuesta) => {
    const contenedor = document.getElementById("contenedorNiveles")
    respuesta.forEach(function(elemento) {
      let boton = document.createElement("button")
      boton.textContent = elemento.nombre
      boton.style.marginRight = "2%" 
      contenedor.appendChild(boton)
    });
  }
}
window.onload = () => { new Vistaniveles() }
