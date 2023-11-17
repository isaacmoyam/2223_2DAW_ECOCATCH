import { Vista } from './vista.js';
import {Rest} from "../../servicios/rest.js";

/**
 * Clase encargada de la Vista 8
 */
export class Vista8 extends Vista {
    /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
    constructor(controlador, base){
        super(controlador, base)
        this.eventoConsultaGET()
    }

    /**
     * Método donde se asocia el evento al pulsar el boton de la llamada Get de la Vista 8
     */
    eventoConsultaGET(){
        //Coger referencias del interfaz
        this.botonGET = document.getElementById('peticionAjax')

        //Asociar eventos
        this.botonGET.onclick = this.llamarGETAEMET
    }

    /**
     * Realiza una petición GET a la AEMET con su apikey correspondiente y la función callback que se usará
     */
    llamarGETAEMET = () => {
        Rest.AEMET('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGZvbnNvZGF2aWRyZWNpb2NhbGRlcm9uLmd1YWRhbHVwZUBhbHVtbmFkby5mdW5kYWNpb25sb3lvbGEubmV0IiwianRpIjoiM2Y1MDYwYTctMjcwMi00ODYwLTgxNDAtNzc2NTE5ODZmZGU4IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3MDAwMzk1MjEsInVzZXJJZCI6IjNmNTA2MGE3LTI3MDItNDg2MC04MTQwLTc3NjUxOTg2ZmRlOCIsInJvbGUiOiIifQ.YgW-QOl0rbVr54AThibHoiSoBV4pcryJxsb1A-H4ESs', this.verResultadosGET)
    }

    /**
     * Es usado como callback en la peticion de la llamada AEMET y se encarga de mostrar por consola los datos obtenidos de esa llamada
     * @param respuesta {Array} Array de la respuesta con los dato que ha dado la peticion get
     */
    verResultadosGET(respuesta){
        /*Lo que me ha devuelto la el callback en respuesta es un array en donde en la posicion 0 se encuentra un objeto con todos los datos puestos como clave, valor
        * por lo que al usar entries obtengo los pares clave, valor y con el for each los recorro para mostrarlos por consola
        */
        Object.entries(respuesta[0]).forEach(([indice, valor]) => {
            console.log(`${indice}: ${valor}`);
        });
    }
}