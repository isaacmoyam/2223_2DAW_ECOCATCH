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
        let regExp =/^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/

        this.validarCampo(evento, regExp, 'NICK')
    }

    comprobarCorreo(evento){
        //La expresion regular esta puesto entre parentesis con un simbolo ? para que admita campo vacio.
        /*
            Solo admite los correos:
            @gmail.com,
            .guadalupe@alumnado.fundacionloyola.net
            .guadalupe@alumnado.fundacionloyola.es
         */
        let regExp = /^(\w{1,61}(\.guadalupe)?@((gmail\.com)|(alumnado\.fundacionloyola\.(net|es))|(fundacionloyola\.(net|es))))?$/

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