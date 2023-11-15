import {Vista} from './vista.js'

export class Vista7 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        this.expresionesRegulares()
    }
    expresionesRegulares(){
        //Coger referencias del interfaz
        let iNick, iCorreo

        iNick = document.querySelectorAll('input')[0]
        iCorreo = document.querySelectorAll('input')[1]

        //Asociar eventos
        iNick.onblur = this.comprobarNombre.bind(this) //Le tengo que pasar el contexto del this, por eso uso el bind
        iCorreo.onblur = this.comprobarCorreo.bind(this)
    }

    comprobarNombre(evento){
        let regExp =/^[A-z|áéíóúÁÉÍÓÚñÑüÜçÇ]{3,}\w{1,}$/

        this.validarCampo(evento, regExp, 'NICK')
    }

    comprobarCorreo(evento){
        let regExp = /^(\w{3,}\.?)*(\w{3,})@(\w{3,}\.?)*(\w{3,})\.[A-z]{2,}$/

        this.validarCampo(evento, regExp,'CORREO')
    }

    validarCampo(evento,regExp,nombreCampo){
        let input = evento.target

        let pMensaje = document.getElementById('msgCampos')
        if(!regExp.test(input.value)){//3, 3 o mas
            pMensaje.style.color = 'red'
            pMensaje.innerHTML = `El campo ${nombreCampo} no es valido`
        }else{
            pMensaje.style.color = 'yellow'
            pMensaje.innerHTML = `El campo ${nombreCampo} valido`
        }
    }
}