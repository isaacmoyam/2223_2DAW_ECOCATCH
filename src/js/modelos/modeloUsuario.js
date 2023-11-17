/**
 * Clase del modelo para el Usuario
 */
export class ModeloUsuario {
  /**
	 * Constructor de la clase. Inicializa un mapa que será usado para guardar datos con el formato clave, valor
	 */
  constructor () {
    this.mapa = new Map()
  }

  /**
	 * Método por el cual se guarda el nivel del juego escogido por el jugador.
	 * @param clave {String} Nombre de la clave
	 * @param valor {Number} Número del nivel que se quiere guardar
	 */
  guardarNivelJuego (clave, valor) {
    this.mapa.set(clave, valor)
  }

  /**
	 * Método que devuelve un elemento del mapa determinado por la clave introducida
	 * @param clave {String} Nombre de la clave
	 * @returns {Number} Número del nivel guardado en la clave
	 */
  ver (clave) {
    return this.mapa.get(clave)
  }
}
