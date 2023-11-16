import {ModeloUsuario} from "../modelos/modeloUsuario.js";
import {VistaAdmin} from "../vistas/administrador/vistaAdmin.js";
import {Vista1} from "../vistas/administrador/vista1.js";
import {Vista2} from "../vistas/administrador/vista2.js";



class ControladorAdmin{
    vistas = new Map()
    /*
         * Inicializa los atributos del Controlador.
         * Coge las referencias del interfaz.
         */
    constructor(){
        this.modelo = new ModeloUsuario()

        //Consigo las referencias del interfaz
        const divVista1 = document.getElementById('divVista1')
        const divVista2 = document.getElementById('divVista2')

        //Creo las vistas
        this.vistas.set(VistaAdmin.VISTA1, new Vista1(this, divVista1))
        this.vistas.set(VistaAdmin.VISTA2, new Vista2(this, divVista2))

        this.verVista(VistaAdmin.VISTA1)
    }

    /*
     * Muestra una vista.
     * @param vista {Symbol} Símbolo que identifica a la vista.
     */
    verVista(vista){
        this.ocultarVistas()
        this.vistas.get(vista).mostrar(true)
    }

    ocultarVistas(){
        for(let vista of this.vistas.values())
            vista.mostrar(false)
    }

    eventosComprobacion(pMensaje, iNombre, iImagen, iValor, btnAnadirBasura,imagenMiniatura){
        iImagen.addEventListener('change', (event) => this.mostrarMiniatura(event, imagenMiniatura))

        btnAnadirBasura.onclick = () => this.pruebaClick(pMensaje, iImagen, iNombre)
        //iValor.onblur = () => this.comprobacionValor(pMensaje)
        iValor.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
        iNombre.onblur = (evento) => this.comprobacionNombre(evento,pMensaje)
    }
    pruebaClick(pMensaje, iImagen, iNombre){
        //console.log(document.getElementsByClassName('msgCampos'))

        if(iImagen !== null && this.nombreArchivo(iImagen) === this.valorCampoNombre(iNombre)){
            //Enviar datos a la base de datos
            console.log('Correcto')
            pMensaje.innerHTML = ''
        }else{
            pMensaje.style.color = 'red'
            pMensaje.innerHTML = `El archivo Imagen debe tener el mismo nombre que el introducido en Nombre:`
        }
    }

    nombreArchivo(iImagen){
        if (iImagen && iImagen.files && iImagen.files.length > 0){
            //iImage no es nulo por lo que se ha seleccionado un archivo
            //Cogemos el archivo introducido del input type file
            let files = iImagen.files;
            let selectedFile = files[0];

            //Cogemos el nombre del archivo
            const nombreArchivo = selectedFile.name.split('.').slice(0, -1).join('.')

            return nombreArchivo
        }else{
            return null
        }
    }

    valorCampoNombre(iNombre){
        return iNombre.value
    }

    comprobacionNombre(evento, pMensaje){
        let regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/
        this.validarCampo(evento, pMensaje, regExp)
    }
    comprobacionValor(evento, pMensaje){
        let regExp = /^\d{1,}$/
        this.validarCampo(evento, pMensaje, regExp)
    }

    validarCampo(evento, pMensaje, regExp){
        let input = evento.target //Hay fallo aqui

        if(!regExp.test(input.value)){
            input.style.borderColor = 'red'
            pMensaje.style.color = 'red'
            pMensaje.innerHTML = `Has introducido un campo con valores no validos`
        }else{
            input.style.borderColor = 'yellow'
        }
    }

    mostrarMiniatura(event, imagenMiniatura) {
        const file = event.target.files[0];

        if (file) {
            // Mostrar miniatura
            const reader = new FileReader();

            reader.onload = (e) => {
                imagenMiniatura.src = e.target.result;
                imagenMiniatura.style.display = 'block';
            };

            reader.readAsDataURL(file);
        } else {
            // Ocultar miniatura si no se selecciona ningún archivo
            imagenMiniatura.style.display = 'none';
        }
    }
}

window.onload = () => {new ControladorAdmin()}