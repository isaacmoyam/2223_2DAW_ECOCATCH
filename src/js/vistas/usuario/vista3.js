import {Vista} from './vista.js'

export class Vista3 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        this.expresionesRegulares()
    }
    expresionesRegulares(){
        let iNick, iCorreo

        console.log('Saludos')
        iNick = document.querySelectorAll('input')[1]
        iCorreo = document.querySelectorAll('input')[2]

        iNick.onblur = this.comprobarNombre.bind(this) //Le tengo que pasar el contexto del this, por eso uso el bind
        iCorreo.onblur = this.comprobarCorreo.bind(this)
    }

    comprobarNombre(evento){
        console.log('111111111')
        let regExp =/^[A-z|áéíóúÁÉÍÓÚñÑüÜçÇ]{3,}\w{1,}$/

        this.validarCampo(evento, regExp, 'NICK')
    }

    comprobarCorreo(evento){
        console.log('2222222222')
        let regExp = /^(\w{3,}\.?)*(\w{3,})@(\w{3,}\.?)*(\w{3,})\.[A-z]{2,}$/

        this.validarCampo(evento, regExp,'CORREO')
    }

    validarCampo(evento,regExp,nombreCampo){
        console.log('Denada por el saludo')
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