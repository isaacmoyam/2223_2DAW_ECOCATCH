import {VistaAdmin} from "../administrador/vistaAdmin.js";


export class Vista1 extends VistaAdmin{
    constructor(controlador, base){
        super(controlador, base)
        this.eventos()
    }

    eventos(){
        let iNombre, iImagen, iValor, btnAnadirBasura, pMensaje
        //Coger referencias del interfaz
        this.enlaceVistaConfigPoweup = this.base.querySelectorAll('a')[0]

        iNombre = document.querySelectorAll('input')[0]
        iValor = document.querySelectorAll('input')[1]
        iImagen = document.querySelectorAll('input')[2]

        btnAnadirBasura = document.getElementsByClassName('btnAnadir')[0]

        pMensaje = document.getElementsByClassName('msgCampos')[0]
        /*
            El numero del principio indica el numero del parrafo con class="msgCampos" en el que quieres que se introduzcan los mensajes de error
            imagenMiniatura es el nombre del id de la etiqueta img en donde quieres que se muestre la imagen introducida
        */
        this.controlador.eventosComprobacion(pMensaje,iNombre, iImagen, iValor, btnAnadirBasura,imagenMiniatura)

        //Asociar eventos
        this.enlaceVistaConfigPoweup.onclick = () => {
            this.controlador.verVista(VistaAdmin.VISTA2)
        }
    }

}