import { Vistausuario } from './vistausuario.js'
import { Rest } from '../../servicios/rest.js'

/**
 * Clase encargada de la Vista del ranking, hereda de Vistausuario.
 * @class
 */
export class Vistaranking extends Vistausuario {

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
   * Asocia los eventos de la interfaz, en este caso, activa el modo oscuro.
   * @method
   */
  eventos () {
    super.modoOscuro()
    this.llamarGET()
    this.idiomaSeleccionado = super.idioma()

    this.traduccion = {
      es: {
        player: "Jugador",
        pts: "Puntuación",
        lvl: "Nivel",
        btnVolver: "Volver"
      },
      en: {
        player: "Player",
        pts: "Score",
        lvl: "Level",
        btnVolver: "Return"
      }
    };

    super.cambiarIdioma()
  }

  /**
   * Realiza una llamada GET para obtener la lista de niveles y los muestra en la interfaz.
   * @method
   */
  llamarGET = () => {
    Rest.getJSON('../../../src/carpetasupersecretaparaadmin2daw/index.php?control=partida_con&metodo=ajaxPartida', null, this.verResultadoGET);
  }

  /**
   * Muestra los resultados obtenidos de la llamada GET en la interfaz.
   * @method
   * @param {Object} respuesta - Respuesta obtenida de la llamada GET.
   */
  verResultadoGET = (respuesta) => {
    const tabla = document.getElementById("tablaRanking");
    respuesta.forEach(function(elemento) {
        let fila = document.createElement("tr");
        let nombre = document.createElement("td");
        let puntuacion = document.createElement("td");
        let nivel = document.createElement("td");
        
        nombre.textContent = elemento.nombre;
        puntuacion.textContent = elemento.puntuacion;
        nivel.textContent = elemento.nombre_nivel;
        
        fila.appendChild(nombre);
        fila.appendChild(puntuacion);
        fila.appendChild(nivel);
        tabla.appendChild(fila);
    });
}
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistaranking() }