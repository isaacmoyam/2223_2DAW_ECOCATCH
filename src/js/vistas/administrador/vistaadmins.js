/**
 * Clase base para las vistas de administrador.
 * @class
 */
export class Vistaadmins {

  /**
   * Constructor de la clase.
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor (controlador, base) {
    this.controlador = controlador
    this.base = base
  }


  // COMÚN

  /**
   * Maneja el evento de confirmación para borrar un elemento.
   * @param {Event} event - Evento del botón de borrado.
   * @returns {void}
   */
  emergenteBorrar(event) {
    event.preventDefault();

    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar el elemento?");

    if (confirmacion) {
        let urlRedireccion = event.target.getAttribute("href");
        window.location.href = urlRedireccion;
    } else {
        // Si el usuario hace clic en "Cancelar", no hacemos nada.
    }
  }

  /**
   * Realiza la validación de un valor según una expresión regular.
   * @param {string} valor - Valor a validar.
   * @returns {boolean} - True si el valor es válido, de lo contrario, False.
   */
  validarValor(valor) {
    // Agrega tu lógica de validación para el campo de items
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    return regExp.test(valor);
  }

  // NIVELES

  /**
   * Agrega una fila a la tabla dinámica.
   * @returns {void}
   */
  agregarFila() {
    const tablaDinamica = document.getElementById('tablaDinamica')
    const nuevaFila = tablaDinamica.insertRow()

    let input = document.createElement('input');
    let select = document.createElement('select');
    
    let celda = nuevaFila.insertCell();
    input.type = 'text';
    input.name = 'contenido[]'
    celda.appendChild(input);

    celda = nuevaFila.insertCell();
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'puntosHasta[]'
    celda.appendChild(input);

    celda = nuevaFila.insertCell();
    select = document.createElement('select');
    select.name = 'tipo[]';

    var opciones = [
        { nombre: 'Antes del nivel', valor: 'A' },
        { nombre: 'Durante el nivel', valor: 'B' },
        { nombre: 'Después del nivel', valor: 'C' }
    ];

    for (var i = 0; i < opciones.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = opciones[i].valor;
        opcion.text = opciones[i].nombre;
        select.appendChild(opcion);
    }

    celda.appendChild(select);

    // Añade la nueva celda con el botón para quitar la fila
    const celdaBoton = nuevaFila.insertCell();
    const btnQuitar = document.createElement('button');
    btnQuitar.type = 'button';
    btnQuitar.classList.add('btnQuitarFila');
    btnQuitar.textContent = '🗑️';
    btnQuitar.addEventListener('click', this.quitarFila.bind(this, nuevaFila));
    celdaBoton.appendChild(btnQuitar);

    const contenidoInput = nuevaFila.querySelector('input[name="contenido[]"]');
    const puntosInput = nuevaFila.querySelector('input[name="puntosHasta[]"]');

    const mensaje = document.getElementById("msgCampos")
    contenidoInput.onblur = (evento) => this.comprobacionContenido(evento, mensaje);
    puntosInput.onblur = (evento) => this.comprobacionPuntos(evento, mensaje);
  }

  /**
   * Elimina una fila específica de la tabla dinámica.
   * @param {HTMLTableRowElement} fila - Fila HTML que se eliminará.
   * @returns {void}
   */
  quitarFila(fila) {
    const tablaDinamica = document.getElementById('tablaDinamica');
    tablaDinamica.deleteRow(fila.rowIndex);
  }

  /**
   * Valida el formulario para la creación/modificación de niveles.
   * @param {Event} event - Evento del formulario.
   * @returns {void}
   */
  validarFormularioNivel(event) {
    event.preventDefault();
  
    const nombreInput = document.querySelector('input[name="nombre"]');
    const itemsInput = document.querySelector('input[name="cantidadItems"]');
    const velocidadInput = document.querySelector('input[name="velocidadBarco"]');
    const contenidoInput = document.querySelector('input[name="contenido[]"]');
    const puntosInput = document.querySelector('input[name="puntosHasta[]"]');
    const formNivel = document.getElementById('formNivel')

    const nombre = nombreInput.value;
    const items = itemsInput.value;
    const velocidad = velocidadInput.value;
    const contenido = contenidoInput.value;
    const puntos = puntosInput.value;

    let mensajeError = null;
    
    if (!nombre) {
        mensajeError = 'Por favor, rellena el campo nombre';
        this.mostrarMensajeErrorNivel(nombreInput, mensajeError);
    }
    
    if (!items) {
        mensajeError = 'Por favor, rellena el campo items';
        this.mostrarMensajeErrorNivel(itemsInput, mensajeError);
    }
    
    if (!velocidad) {
        mensajeError = 'Por favor, rellena el campo velocidad';
        this.mostrarMensajeErrorNivel(velocidadInput, mensajeError);
    }

    if (!contenido) {
      mensajeError = 'Por favor, rellena el campo contenido';
      this.mostrarMensajeErrorNivel(contenidoInput, mensajeError);
    }

    if (!puntos) {
      mensajeError = 'Por favor, rellena el campo puntos requeridos';
      this.mostrarMensajeErrorNivel(puntosInput, mensajeError);
    }

    let urlForm = formNivel.action

    if (this.validarNombreNivel(nombre) && this.validarValor(items) && this.validarValor(velocidad) && this.validarContenido(contenido) && this.validarPuntos(puntos)) {
      // Muestra errores y cambia estilos si están mal las filas y también retorna el array validacionesFilas lleno con las filas validadas para luego comprobar si están bien en su conjunto
      const validacionesFilas = this.validarFilas()
      // Verifica si todas las filas son válidas
      if (validacionesFilas.every((validacion) => validacion)) {
        // Enviar formulario si está correcto
        formNivel.action = urlForm;
        document.getElementById('formNivel').submit();
      } else {
        // Muestra errores y cambia estilos si están mal las filas
        this.validarFilas()
      }
    } else {
      // Muestra errores y cambia estilos si están mal las filas
      this.validarFilas()
    }
  }

  /**
   * Realiza la validación de todas las filas en la tabla dinámica.
   * @returns {boolean[]} - Un array de booleanos indicando la validez de cada fila.
   */
  validarFilas() {
      const filas = document.querySelectorAll('#tablaDinamica tbody tr');
      const validacionesFilas = [];
    
      filas.forEach((fila) => {
        const contenidoInput = fila.querySelector('input[name="contenido[]"]');
        const puntosInput = fila.querySelector('input[name="puntosHasta[]"]');
        
        // Realiza la validación para cada campo en la fila
        const validacionFila =
          this.validarContenido(contenidoInput.value) &&
          this.validarPuntos(puntosInput.value);
    
        validacionesFilas.push(validacionFila);

        if (!validacionFila) {
          this.mostrarMensajeErrorNivel(contenidoInput, 'El campo contenido de uno de los mensajes está vacío');
          this.mostrarMensajeErrorNivel(puntosInput, 'El campo puntos requeridos de uno de los mensajes está vacío');
        }
      });
      return validacionesFilas;
  }
  
  /**
   * Muestra un mensaje de error y cambia los estilos del campo de nivel correspondiente.
   * @param {HTMLInputElement} input - Campo de nivel que contiene el error.
   * @param {string} mensaje - Mensaje de error a mostrar.
   * @returns {void}
   */
  mostrarMensajeErrorNivel(input, mensaje) {
    const pMensaje = document.getElementById('msgCampos');
    if (pMensaje) {
      pMensaje.style.color = 'red';
      input.style.borderColor = 'red';
      pMensaje.innerHTML = mensaje;
    }
  }

  /**
   * Valida el nombre de un nivel.
   * @param {string} nombre - Nombre del nivel a validar.
   * @returns {boolean} - True si el nombre es válido, de lo contrario, False.
   */
  validarNombreNivel(nombre) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/;
    return regExp.test(nombre);
  }

  /**
   * Valida el contenido de un nivel.
   * @param {string} valor - Contenido del nivel a validar.
   * @returns {boolean} - True si el contenido es válido, de lo contrario, False.
   */
  validarContenido(valor) {
    // Agrega tu lógica de validación para el campo de items
    const regExp = /^[\s\S]{1,500}$/;
    return regExp.test(valor);
  }

  /**
   * Valida los puntos requeridos para un nivel.
   * @param {string} valor - Puntos requeridos del nivel a validar.
   * @returns {boolean} - True si los puntos son válidos, de lo contrario, False.
   */
  validarPuntos(valor) {
    // Agrega tu lógica de validación para el campo de items
    const regExp = /^(?:[1-9]\d{0,3}|[1-5]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|65535)$/;
    return regExp.test(valor);
  }

  /**
   * Asigna funciones de comprobación a eventos onBlur para campos relacionados con niveles.
   * @param {Object} pMensaje - Objeto del lugar donde se va a introducir los mensajes necesarios.
   * @param {HTMLInputElement} nombreInput - Campo de entrada para el nombre del nivel.
   * @param {HTMLInputElement} itemsInput - Campo de entrada para la cantidad de items del nivel.
   * @param {HTMLInputElement} velocidadInput - Campo de entrada para la velocidad del barco del nivel.
   * @param {HTMLInputElement} contenidoInput - Campo de entrada para el contenido del nivel.
   * @param {HTMLInputElement} puntosInput - Campo de entrada para los puntos requeridos del nivel.
   * @returns {void}
   */
  eventosComprobacionNivel (pMensaje, nombreInput, itemsInput, velocidadInput, contenidoInput, puntosInput) {
    nombreInput.onblur = (evento) => this.comprobacionNombreNivel(evento, pMensaje)
    itemsInput.onblur = (evento) => this.comprobacionValorNivel(evento, pMensaje)
    velocidadInput.onblur = (evento) => this.comprobacionValorNivel(evento, pMensaje)
    if(contenidoInput && puntosInput) {
      contenidoInput.onblur = (evento) => this.comprobacionContenido(evento, pMensaje)
      puntosInput.onblur = (evento) => this.comprobacionPuntos(evento, pMensaje)
    }
  }

  /**
   * Comprueba y valida el nombre de un nivel.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se va a introducir los mensajes necesarios.
   * @returns {void}
   */
  comprobacionNombreNivel (evento, pMensaje) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/
    let mensaje = "El nombre debe tener máximo 50 caracteres y no tener espacios"
    this.validarCampoNivel(evento, pMensaje, mensaje, regExp)
  }

  /**
   * Comprueba y valida el campo Valor de un nivel mediante una expresión regular determinada.
   * Se ejecuta con un evento onblur en el campo Nombre.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se va a introducir los mensajes necesarios.
   * @returns {void}
   */
  comprobacionValorNivel (evento, pMensaje) {
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    let mensaje = "Los valores numéricos deben ser un número entre 1 y 254"
    this.validarCampoNivel(evento, pMensaje, mensaje, regExp)
  }

  /**
   * Comprueba y valida el contenido del mensaje de un nivel.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se va a introducir los mensajes necesarios.
   * @returns {void}
   */
  comprobacionContenido (evento, pMensaje) {
    const regExp = /^[\s\S]{1,500}$/;
    let mensaje = "El contenido del mensaje debe ser de máximo 500 caracteres"
    this.validarCampoNivel(evento, pMensaje, mensaje, regExp)
  }

  /**
   * Comprueba y valida los puntos requeridos para un nivel.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se va a introducir los mensajes necesarios.
   * @returns {void}
   */
  comprobacionPuntos (evento, pMensaje) {
    const regExp = /^(?:[1-9]\d{0,3}|[1-5]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|65535)$/;
    let mensaje = "La puntuación requerida debe ser entre 1 y 65535"
    this.validarCampoNivel(evento, pMensaje, mensaje, regExp)
  }

  /**
   *
   * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
   * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
   * @param regExp {Object} Expresión Regular
   */
  validarCampoNivel (evento, pMensaje, mensaje, regExp) {
    const input = evento.target 
    if (!regExp.test(input.value)) {
      this.mostrarMensajeErrorNivel(input,mensaje)
    } else {
      input.style.borderColor = 'yellow'
      pMensaje.innerHTML = ""
    }
  }

  // BASURA

  /**
   * Valida el formulario para la creación/modificación de elementos de basura.
   * @param {Event} event - Evento del formulario.
   * @returns {void}
   */
  validarFormularioBasura(event) {
    event.preventDefault();
  
    const nombreInput = document.querySelector('input[name="nombre"]');
    const valorInput = document.querySelector('input[name="valor"]');
    const imagenInput = document.querySelector('input[name="imagen"]');
    const formBasura = document.getElementById('formBasura')

    const nombre = nombreInput.value;
    const valor = valorInput.value;
    const imagen = imagenInput.value;

    let mensajeError = null;
    
    if (!nombre) {
      mensajeError = 'Por favor, rellena el campo nombre';
      this.mostrarMensajeErrorBasura(nombreInput, mensajeError);
    }
    
    if (!valor) {
      mensajeError = 'Por favor, rellena el campo valor';
      this.mostrarMensajeErrorBasura(valorInput, mensajeError);
    }
    
    if (!imagen || this.nombreArchivoValido(imagenInput,nombre) == false) {
      
      this.mostrarMensajeErrorBasura(imagenInput, mensajeError);
    } else {
      imagenInput.style.backgroundColor = ''
    }

    let urlForm = formBasura.action

    // Realiza la lógica de validación aquí
    if (this.validarNombreBasura(nombre) && this.validarValor(valor) && this.nombreArchivoValido(imagenInput,nombre)) {
      // Envía el formulario al servidor
      formBasura.action = urlForm
      document.getElementById('formBasura').submit();
    }
  }

  
  /**
   * Muestra un mensaje de error y cambia los estilos del campo de basura correspondiente.
   * @param {HTMLInputElement} input - Campo de basura que contiene el error.
   * @param {string} mensaje - Mensaje de error a mostrar.
   * @returns {void}
   */
  mostrarMensajeErrorBasura(input, mensaje) {
    const pMensaje = document.getElementById('msgCampos'); // Reemplaza con el ID real de tu elemento
    if (pMensaje && (input.name === "nombre" || input.name === "valor")) {
      pMensaje.style.color = 'red';
      input.style.borderColor = 'red';
    } else {
      input.style.backgroundColor = 'red'
    }
    pMensaje.innerHTML = mensaje;
  }

  /**
   * Valida el nombre para el campo de nombre en la sección de basura.
   * @param {string} nombre - Nombre a validar.
   * @returns {boolean} - Devuelve true si el nombre es válido, de lo contrario, devuelve false.
   */
  validarNombreBasura(nombre) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/;
    return regExp.test(nombre);
  }

  /**
   * Valida el nombre para el campo de nombre en la sección de niveles.
   * @param {string} nombre - Nombre a validar.
   * @returns {boolean} - Devuelve true si el nombre es válido, de lo contrario, devuelve false.
   */
  validarNombreNivel(nombre) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/;
    return regExp.test(nombre);
  }

  /**
   * Maneja los eventos de comprobación en la sección de basura.
   * @param {Object} pMensaje - Objeto donde se mostrarán los mensajes necesarios.
   * @param {Object} iNombre - Elemento de entrada para el nombre.
   * @param {Object} iImagen - Elemento de entrada para la imagen.
   * @param {Object} iValor - Elemento de entrada para el valor.
   * @param {Object} imagenMiniatura - Elemento de imagen para la miniatura.
   * @returns {void}
   */
  eventosComprobacionBasura (pMensaje, iNombre, iImagen, iValor, imagenMiniatura) {
    iImagen.addEventListener('change', (event) => this.mostrarMiniatura(event, imagenMiniatura))
    iNombre.onblur = (evento) => this.comprobacionNombreBasura(evento, pMensaje)
    iValor.onblur = (evento) => this.comprobacionValorBasura(evento, pMensaje)
  }

  /**
   * Verifica si el nombre de archivo seleccionado es válido en la sección de basura.
   * @param {Object} iImagen - Elemento de entrada para la imagen.
   * @returns {boolean} - Devuelve true si el nombre del archivo es válido, de lo contrario, devuelve false.
   */
  nombreArchivoValido(iImagen) {
    if (iImagen && iImagen.files && iImagen.files.length > 0) {
        // iImagen no es nulo por lo que se ha seleccionado un archivo
        // Cogemos el archivo introducido del input type file
        const files = iImagen.files;
        const selectedFile = files[0];

        // Obtenemos el nombre del archivo
        const nombreArchivoExtension = selectedFile.name

        if(nombreArchivoExtension.length < 20) {
            const partes = nombreArchivoExtension.split(".")

            // Validamos la extensión del archivo

            const extensionArchivo = "." + partes[1]

            const extensionPermitida = '.png'

            if (extensionPermitida === extensionArchivo) {
                return true;
            } else {
                let mensajeError = 'La imagen no tiene una extensión valida.';
                this.mostrarMensajeErrorBasura(iImagen, mensajeError);
                return false;
            }
        } else {
            let mensajeError = 'El nombre de la imagen no puede sobrepasar los 30 caracteres.';
            this.mostrarMensajeErrorBasura(iImagen, mensajeError);
            return false;
        }
    } else {
      return false;
    }
  }

  /**
   * Comprueba y valida el campo de nombre en la sección de basura.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se introducirán los mensajes necesarios.
   * @returns {void}
   */
  comprobacionNombreBasura (evento, pMensaje) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,20}$/
    let mensaje = "El nombre debe tener máximo 20 caracteres y no tener espacios"
    this.validarCampoBasura(evento, pMensaje, mensaje, regExp)
  }

  /**
   * Comprueba y valida el campo de valor en la sección de basura.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se introducirán los mensajes necesarios.
   * @returns {void}
   */
  comprobacionValorBasura (evento, pMensaje) {
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    let mensaje = "Los valores numéricos deben ser un número entre 1 y 254"
    this.validarCampoBasura(evento, pMensaje, mensaje, regExp)
  }

  /**
   * Valida el campo en la sección de basura y muestra mensajes de error si es necesario.
   * @param {Object} evento - Objeto de evento que desencadenó la llamada a la función.
   * @param {Object} pMensaje - Objeto del lugar donde se introducirán los mensajes necesarios.
   * @param {string} mensaje - Mensaje a mostrar si la validación falla.
   * @param {RegExp} regExp - Expresión regular para la validación del campo.
   * @returns {void}
   */
  validarCampoBasura (evento, pMensaje, mensaje, regExp) {
    const input = evento.target 
    if (!regExp.test(input.value)) {
      this.mostrarMensajeErrorBasura(input,mensaje)
    } else {
      input.style.borderColor = 'yellow'
      pMensaje.innerHTML = ""
    }
  }

  /**
   * Muestra la miniatura de una imagen seleccionada.
   * @param {Event} event - Evento del input de imagen.
   * @param {HTMLImageElement} imagenMiniatura - Elemento de imagen para mostrar la miniatura.
   * @returns {void}
   */
  mostrarMiniatura (event, imagenMiniatura) {
    const file = event.target.files[0]

    if (file) {
      // Mostrar miniatura
      const reader = new FileReader()

      reader.onload = (e) => {
        imagenMiniatura.src = e.target.result
        imagenMiniatura.style.display = 'block'
      }

      reader.readAsDataURL(file)
    } else {
      // Ocultar miniatura si no se selecciona ningún archivo
      imagenMiniatura.style.display = 'none'
    }
  }
}