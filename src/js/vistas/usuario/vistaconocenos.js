import { Vistausuario } from './vistausuario.js'

/**
 * Clase encargada de la Vista "Conócenos", hereda de Vistausuario.
 * @class
 */
export class Vistaconocenos extends Vistausuario {

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

    this.idiomaSeleccionado = super.idioma()

    this.traduccion = {
      es: {
        tituloweb: "Conócenos",
        equipoEco: "Equipo de desarrollo de EcoCatch",

        ilocation: "Nacido en Badajoz",
        inacimiento: "Nacimiento: 02/05/2002",
        iestudios: "Estudio realizado: ESO y Bachillerato.",
        iencurso: "En curso: Segundo de Desarrollo de Aplicaciones Web en la Escuela Virgen de Guadalupe de Badajoz.",
        icorreo: "Correo: isaacmoyamayordomo.guadalupe@alumnado.fundacionloyola.net",

        slocation: "Nacido en Badajoz",
        snacimiento: "Nacimiento: 21/01/2003",
        sestudios: "Estudio realizado: Grado Medio de Sistemas Microinformáticos y Redes.",
        sencurso: "En curso: Segundo de Desarrollo de Aplicaciones Web en la Escuela Virgen de Guadalupe de Badajoz.",
        scorreo: "Correo: smosqueramarin.guadalupe@alumnado.fundacionloyola.net",

        alocation: "Nacido en Badajoz",
        anacimiento: "Nacimiento: 06/06/2000",
        aestudios: "Estudio realizado: ESO y Bachillerato.",
        aencurso: "En curso: Segundo de Desarrollo de Aplicaciones Web en la Escuela Virgen de Guadalupe de Badajoz.",
        acorreo: "Correo: alfonsodavidreciocalderon.guadalupe@alumnado.fundacionloyola.net",

        btnVolver: "Volver"
      },
      en: {
        tituloweb: "About Us",
        equipoEco: "EcoCatch development team",

        ilocation: "Born in Badajoz",
        inacimiento: "Birth: 05/02/2002",
        iestudios: "Completed studies: Secondary Education and High School.",
        iencurso: "In progress: Second year of Web Application Development at Virgen de Guadalupe School in Badajoz.",
        icorreo: "Email: isaacmoyamayordomo.guadalupe@alumnado.fundacionloyola.net",

        slocation: "Born in Badajoz",
        snacimiento: "Birth: 01/21/2003",
        sestudios: "Completed studies: Middle Degree in Microcomputer Systems and Networks",
        sencurso: "In progress: Second year of Web Application Development at Virgen de Guadalupe School in Badajoz.",
        scorreo: "Email: smosqueramarin.guadalupe@alumnado.fundacionloyola.net",

        alocation: "Born in Badajoz",
        anacimiento: "Nacimiento: 06/06/2000",
        aestudios: "Completed studies: Secondary Education and High School.",
        aencurso: "In progress: Second year of Web Application Development at Virgen de Guadalupe School in Badajoz.",
        acorreo: "Email: alfonsodavidreciocalderon.guadalupe@alumnado.fundacionloyola.net",

        btnVolver: "Return"
      }
    };

    super.cambiarIdioma()
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistaconocenos() }