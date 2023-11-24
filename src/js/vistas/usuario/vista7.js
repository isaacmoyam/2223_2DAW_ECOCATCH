import { Vista } from './vista.js'

/**
 * Clase encargada de la Vista 7
 */
export class Vista7 extends Vista {
  /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
  constructor (controlador, base) {
    super(controlador, base)
    this.eventosVista7()
  }

  /**
     * Método encargado de asociar los eventos a las referencias de la interfaz de la vista 7
     */
  eventosVista7 () {
    // Coger referencias del interfaz
    let iNick, iCorreo

    iNick = document.querySelectorAll('input')[0]
    iCorreo = document.querySelectorAll('input')[1]
    this.enlaceSiguienteVista8 = document.getElementById('irVista8')
    if(!iNick){return}

    // Asociar eventos
    iNick.onblur = this.comprobarNombre.bind(this) // Le tengo que pasar el contexto del this, por eso uso el bind
    iCorreo.onblur = this.comprobarCorreo.bind(this)

    this.enlaceSiguienteVista8.onclick = () => {
      this.controlador.verVista(Vista.VISTA8)
    }
  }

  /**
     * LLama a una función encargada de comprobar si se valida el campo Nombre mediante una expresión regular determinada.
     * Se ejecuta con un evento onblur en el campoNombre
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     */
  comprobarNombre (evento) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/

    this.validarCampo(evento, regExp, 'NICK')
  }

  /**
     * LLama a una función encargada de comprobar si se valida el campo Correo mediante una expresion regular determinada.
     * Se ejecuta con un evento onblur en el campoNombre
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     */
  comprobarCorreo (evento) {
    // La expresion regular esta puesto entre parentesis con un simbolo ? para que admita campo vacio.
    /*
            Solo admite los correos:
            @gmail.com,
            .guadalupe@alumnado.fundacionloyola.net
            .guadalupe@alumnado.fundacionloyola.es
         */
    const regExp = /^(\w{1,61}(\.guadalupe)?@((gmail\.com)|(alumnado\.fundacionloyola\.(net|es))|(fundacionloyola\.(net|es))))?$/

    this.validarCampo(evento, regExp, 'CORREO')
  }

  /**
     * Se encarga de validar el campo mediante una Expresion Regular.
     * Si es correcta el borde se pone de color amarillo, rojo en caso contrario
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param regExp {Object} Expresión Regular
     * @param nombreCampo {String} String del nombre del campo que se ha validado
     */
  validarCampo (evento, regExp, nombreCampo) {
    const input = evento.target

    const pMensaje = document.getElementById('msgCampos')
    if (!regExp.test(input.value)) { // 3, 3 o mas
      pMensaje.style.color = 'red'
      pMensaje.innerHTML = `El campo ${nombreCampo} no es valido`
    } else {
      pMensaje.style.color = 'yellow'
      pMensaje.innerHTML = `El campo ${nombreCampo} valido`
    }
  }
}
