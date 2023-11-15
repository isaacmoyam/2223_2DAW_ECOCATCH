window.onload = () => {new expresionesRegulares()}

class expresionesRegulares{
    constructor(){
        this.iniciarBasura()
    }

    iniciarBasura(){
        let iNombre, iImagen, iValor, btnAnadirBasura

        console.log('Saludos3')
        iNombre = document.querySelectorAll('input')[0]
        iValor = document.querySelectorAll('input')[1]
        iImagen = document.querySelectorAll('input')[2]

        btnAnadirBasura = document.querySelectorAll('input')[3]

        iImagen.addEventListener('change', (event) => this.mostrarMiniatura(event, imagenMiniatura));

        btnAnadirBasura.onclick = () => this.pruebaClick(iImagen, iNombre);
        iValor.onblur = this.comprobacionValor.bind(this)
    }
    pruebaClick(iImagen, iNombre){
        let pMensaje = document.getElementById('msgCampos')

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

    comprobacionValor(evento){
        let regExp = /^\d{1,}$/
        this.validarCampo(evento, regExp)
    }

    validarCampo(evento,regExp){
        let input = evento.target

        if(!regExp.test(input.value)){
            evento.target.style.borderColor = 'red'
        }else{
            evento.target.style.borderColor = 'yellow'
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
