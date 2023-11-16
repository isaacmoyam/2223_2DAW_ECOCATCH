import {VistaAdmin} from "./vistaAdmin.js";


export class Vista2 extends VistaAdmin{
    constructor(controlador, base){
        super(controlador, base)
        this.eventos()
    }

    eventos(){
        let iNombre, iImagen, iAumento, btnAnadirBasura, pMensaje
        //Coger referencias del interfaz
        this.enlaceVolverVista= this.base.querySelectorAll('a')[0]

        iNombre = document.querySelectorAll('input')[3]
        iAumento= document.querySelectorAll('input')[4]
        iImagen = document.querySelectorAll('input')[5]

        btnAnadirBasura = document.getElementsByClassName('btnAnadir')[1]
        pMensaje = document.getElementsByClassName('msgCampos')[1]
        this.controlador.eventosComprobacion(pMensaje,iNombre, iImagen, iAumento, btnAnadirBasura,imagenMiniatura2)

        //Asociar eventos
        this.enlaceVolverVista.onclick = () => {
            this.controlador.verVista(VistaAdmin.VISTA1)
        }
    }

}