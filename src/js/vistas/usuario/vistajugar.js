import { Vistausuario } from './vistausuario.js'
import { Rest } from '../../servicios/rest.js'

/**
 * Clase encargada de la Vista de juego, hereda de Vistausuario.
 * @class
 */
export class Vistajugar extends Vistausuario {

    #score = 0
    #scoreElement = document.getElementById('scoreValue')
    #maxObjetos = localStorage.getItem('items')
    #objetosCreados = 0
    #objetosDestruidos = 0
    

    /**
     * Constructor de la clase. Inicializa los atributos correspondientes.
     * @constructor
     * @param {ControladorUsuario} controlador - Controlador del Usuario.
     * @param {Object} base - Objeto que es una referencia del interfaz.
     */
    constructor(controlador, base) {
        super(controlador, base)
        this.eventos()
    }

    /**
     * Crea una manzana y la agrega al contenedor de juego.
     * @returns {void}
     */
    crearManzana() {
        if (this.#objetosCreados < this.#maxObjetos) {
            let apple = document.createElement('div')
            let imagenApple = document.createElement('img')
            let estrellita = document.createElement('div');
            estrellita.classList.add('estrellita');
            estrellita.style.left = apple.style.left;
            estrellita.style.top = apple.style.top;
            this.gameContainer.appendChild(estrellita);
            imagenApple.src = "../../../src/img/basura.png"
            imagenApple.style.width = "50px"
            imagenApple.style.height = "50px"
            apple.appendChild(imagenApple)
            apple.classList.add('apple')
            apple.style.left = Math.floor(Math.random() * (this.gameContainer.clientWidth - 50)) + 'px'
            apple.style.top = '-10px' // Posición inicial arriba del todo
            apple.style.width = '50px' 
            apple.style.height = '50px' 
            apple.style.zIndex = '1'
            this.gameContainer.appendChild(apple)
    
            this.#objetosCreados++
        }
    }

    /**
     * Mueve las manzanas hacia abajo en el contenedor de juego.
     * @returns {void}
     */
    moverManzanas() {
        let apples = document.getElementsByClassName('apple')
        for (let apple of apples) {
            let appleTop = parseInt(window.getComputedStyle(apple).getPropertyValue('top'))
            if (appleTop >= this.gameContainer.clientHeight-40) {
                this.gameContainer.removeChild(apple)
                this.#objetosDestruidos++;
                this.basuraAlAgua();
                this.fin();
            } else {
                // Ajusta este valor para controlar la velocidad de caída (menos píxeles = más lento)
                apple.style.top = appleTop + 5 + 'px' // Ajusta la velocidad de caída aquí
                this.verificarColisionManzana(apple)
            }
        }
    }

    /**
     * Verifica si hay colisión entre una manzana y el barco.
     * @param {HTMLElement} apple - Elemento DOM representando la manzana.
     * @returns {void}
     */
    verificarColisionManzana(apple) {
        let barcoLeft = parseInt(window.getComputedStyle(this.barco).getPropertyValue('left'));
        let barcoTop = parseInt(window.getComputedStyle(this.barco).getPropertyValue('top'));
    
        let appleLeft = parseInt(window.getComputedStyle(apple).getPropertyValue('left'));
        let appleTop = parseInt(window.getComputedStyle(apple).getPropertyValue('top'));
    
        let barcoWidth = this.barco.clientWidth;
        let barcoHeight = this.barco.clientHeight;
    
        // Ajusta este valor para controlar la distancia de colisión (mayor valor = más fácil)
        let distanciaColision = 30;
    
        if (
            appleLeft < barcoLeft + barcoWidth - distanciaColision &&
            appleLeft + 50 > barcoLeft + distanciaColision &&
            appleTop < barcoTop + barcoHeight - distanciaColision &&
            appleTop + 50 > barcoTop + distanciaColision
        ) {
            this.crearEstrella(appleLeft, appleTop);
    
            this.gameContainer.removeChild(apple);
            this.aumentarObjetos();
            this.#objetosDestruidos++;
            this.fin();
    
            // Reproduce el sonido de la manzana
            this.reproducirSonidoManzana();
        }
    }

    fin(){
        if(this.#maxObjetos == this.#objetosDestruidos) {
            window.location.href = "../ranking/formulario.html";
            localStorage.setItem('puntuacionFinal', this.#score)
            return;
        }
    }

    crearEstrella(left, top) {
        const numEstrellas = 5; // Estrelas a mostrar
        for (let i = 0; i < numEstrellas; i++) {
            let estrella = document.createElement('div');
            estrella.classList.add('estrella');
            estrella.style.left = left + Math.floor(Math.random() * 20) + 'px'; 
            estrella.style.top = top + Math.floor(Math.random() * 20) + 'px'; 
            this.gameContainer.appendChild(estrella);
    
            // Elimina la estrella después de la animación
            setTimeout(() => {
                this.gameContainer.removeChild(estrella);
            }, 1000);
        }
    }

    /**
     * Reproduce un sonido en la recogida de basura.
     * @returns {void}
     */
    reproducirSonidoManzana() {
        const sonidoManzana = document.getElementById('sonidoBasura');
        sonidoManzana.play();
    }

     /**
     * Reproduce un sonido cuando fallas al recoger basura
     * @returns {void}
     */
    basuraAlAgua() {
        const sonidoAgua = document.getElementById('agua');
        sonidoAgua.play();
    }

    /**
     * Aumenta la puntuación del juego.
     * @returns {void}
     */
    aumentarObjetos() {
        this.#score++
        this.#scoreElement.textContent = this.#score+"/"+this.#maxObjetos
    }
    
    /**
     * Inicia el juego de las manzanas con animación.
     * @returns {void}
     */
    iniciarJuegoManzanas() {
        const update = () => {
            if (!this.juegoEnPausa) {
                // Ajusta estos valores según tus preferencias
                if (Math.random() < 0.008) {  // Probabilidad de crear una manzana (menor probabilidad = aparecen más lentamente)
                    this.crearManzana()
                }
                this.moverManzanas()
            }
            requestAnimationFrame(update)
        }
        update()
    }

    /**
     * Asocia eventos a elementos del juego.
     * @returns {void}
     */
    eventos() {
        this.#scoreElement.innerHTML = this.#score+"/"+this.#maxObjetos
        this.colorBarco = localStorage.getItem('colorBarco')
        this.imgBarco = document.getElementById("barco")
        switch(this.colorBarco){
            case "azul":
                this.imgBarco.src = "../../../src/img/azul2.png";
                break;
            case "rojo":
                this.imgBarco.src = "../../../src/img/rojo2.png";
                break;
            case "amarillo":
                this.imgBarco.src = "../../../src/img/amarillo2.png";
        }
        this.x = 0
        this.touchStartX = null
        this.animationFrameId = null
        this.juegoEnPausa = false

        this.id = localStorage.getItem('id')
        this.iniciarJuegoManzanas()
        this.velocidad = localStorage.getItem('velocidad')

        this.nombre = localStorage.getItem('nombreLvl')
        const nombreNivel = document.getElementById("nombreNivel")
        nombreNivel.innerHTML = this.nombre

        super.modoOscuro()
        this.eventoBarco()
        this.crearBotonPausa()
        this.audio()
        this.llamarPOST()
    }

    /**
     * Realiza una llamada POST para obtener mensajes del nivel actual.
     * @returns {void}
     */
    llamarPOST = () => {
        Rest.post('../../../src/carpetasupersecretaparaadmin2daw/index.php?control=nivel_con&metodo=ajaxMensajesNivel', {'parametros': this.id}, this.verResultadoPOST);
    }

    /**
     * Muestra mensajes del nivel actual.
     * @param {Array} mensajes - Array de mensajes del nivel.
     * @returns {void}
     */
    verResultadoPOST = (respuesta) => {
        this.verMensajes(respuesta) 
    }

    /**
     * Gestiona el audio del juego.
     * @returns {void}
     */
    audio() {
        
        const miAudio = document.getElementById('miAudio');
        const botonSilencio = document.getElementById('botonSilencio');
    
        // Evento de clic para el botón de silencio
        botonSilencio.addEventListener('click', function() {
            if (miAudio.paused) {
                // Si está en pausa, reanudar
                botonSilencio.style.backgroundImage = "url(../../../src/img/musicaOn.png)";
                miAudio.play();
            } else {
                // Si está reproduciendo, pausar
                botonSilencio.style.backgroundImage = "url(../../../src/img/musicaOff.png)";
                miAudio.pause();
            }
        });
    
        // Inicia la reproducción del audio cuando la ventana se carga completamente
        window.addEventListener('load', function() {
            miAudio.play();
        });
    }

    /**
     * Crea un botón de pausa y le asocia un evento.
     * @returns {void}
     */
    crearBotonPausa() {
        const botonPausa = document.getElementById('botonPausa')
        botonPausa.onclick = () => this.pausarJuego()
    }

    /**
     * Pausa el juego.
     * @returns {void}
     */
    pausarJuego() {
        if (this.juegoEnPausa) {
            this.reanudarJuego()
        } else {
            this.juegoEnPausa = true
            this.cancelAnimationFrame()
        }
    }

    /**
     * Reanuda el juego.
     * @returns {void}
     */
    reanudarJuego() {
        this.juegoEnPausa = false
        this.requestAnimationFrame
    }

    /**
     * Asocia eventos al barco para manejar su movimiento.
     * @returns {void}
     */
    eventoBarco() {
        this.gameContainer = document.getElementById('gameContainer')
        this.barco = document.querySelector('#gameContainer img')
        this.pNivel = document.getElementById('nivelSeleccionado')

        this.gameContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e))
        this.gameContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e))
        this.gameContainer.addEventListener('touchend', () => this.handleTouchEnd())

        let velocidadX = 0; 
        let teclaIzquierdaPresionada = false;
        let teclaDerechaPresionada = false;

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                teclaIzquierdaPresionada = true;
                actualizarVelocidad();
            } else if (e.key === 'ArrowRight') {
                teclaDerechaPresionada = true;
                actualizarVelocidad();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') {
                teclaIzquierdaPresionada = false;
                actualizarVelocidad();
            } else if (e.key === 'ArrowRight') {
                teclaDerechaPresionada = false;
                actualizarVelocidad();
            }
        });

        // Función para actualizar la velocidad basada en las teclas presionadas
        const actualizarVelocidad = () => {
            if (teclaIzquierdaPresionada && teclaDerechaPresionada) {
                velocidadX = 0; 
            } else if (teclaIzquierdaPresionada) {
                velocidadX = -1; 
                switch(this.colorBarco){
                    case "azul":
                        this.imgBarco.src = "../../../src/img/azul.png";
                        break;
                    case "rojo":
                        this.imgBarco.src = "../../../src/img/rojo.png";
                        break;
                    case "amarillo":
                        this.imgBarco.src = "../../../src/img/amarillo.png";
                }
            } else if (teclaDerechaPresionada) {
                velocidadX = 1; 
                switch(this.colorBarco){
                    case "azul":
                        this.imgBarco.src = "../../../src/img/azul2.png";
                        break;
                    case "rojo":
                        this.imgBarco.src = "../../../src/img/rojo2.png";
                        break;
                    case "amarillo":
                        this.imgBarco.src = "../../../src/img/amarillo2.png";
                }
            } else {
                velocidadX = 0;
            }
        };

        // Actualizar la posición del barco en cada fotograma de animación
        const updateBarco = () => {
            if (!this.juegoEnPausa) {
                this.x = Math.max(0, Math.min(this.x + velocidadX * +this.velocidad, this.gameContainer.clientWidth - this.barco.clientWidth));
                this.moveBarco(this.barco, this.x);
            }
            requestAnimationFrame(updateBarco);
        }

        updateBarco();
    }


    /**
     * Mueve el barco dentro del contenedor de juego.
     * @param {HTMLElement} barco - Elemento DOM representando el barco.
     * @param {number} x - Posición horizontal del barco.
     * @returns {void}
     */
    moveBarco(barco, x) {
        if (!this.juegoEnPausa) {
            const maxX = this.gameContainer.clientWidth - barco.clientWidth
            x = Math.min(x, maxX)
            x = Math.max(0, x)
            this.animationFrameId = requestAnimationFrame(() => {
                barco.style.left = x + 'px'
            })
        }
    }

    /**
     * Maneja el evento touchstart en el contenedor de juego.
     * @param {TouchEvent} e - Objeto de evento touchstart.
     * @returns {void}
     */
    handleTouchStart(e) {
        e.preventDefault()
        this.touchStartX = e.touches[0].clientX
        this.requestAnimationFrame
    }

    /**
     * Maneja el evento touchmove en el contenedor de juego.
     * @param {TouchEvent} e - Objeto de evento touchmove.
     * @returns {void}
     */
    handleTouchMove(e) {
        e.preventDefault()
        if (!this.juegoEnPausa) {
            let touchCurrentX = e.touches[0].clientX
            let deltaX = touchCurrentX - this.touchStartX

            let newPosX = this.x + deltaX
            const maxX = this.gameContainer.clientWidth - this.barco.clientWidth

            if (newPosX >= 0 && newPosX <= maxX) {
                this.moveBarco(this.barco, newPosX)
                this.x = newPosX
            }

            this.touchStartX = touchCurrentX
            this.checkCollisionBoundary()
        }
    }

    /**
     * Maneja el evento touchend en el contenedor de juego.
     * @returns {void}
     */
    handleTouchEnd() {
        this.touchStartX = null
        this.cancelAnimationFrame()
    }

    /**
     * Maneja la animación del frame.
     * @returns {void}
     */
    handleAnimationFrame() {
        if (this.animationFrameId) {
            this.moveBarco(this.barco, this.x)
            this.requestAnimationFrame
        }
    }

    /**
     * Verifica si hay colisión del barco con los bordes del contenedor de juego.
     * @returns {void}
     */
    checkCollisionBoundary() {
        const barcoLeft = parseInt(window.getComputedStyle(this.barco).getPropertyValue('left'))
        const barcoWidth = this.barco.clientWidth
        const gameContainerWidth = this.gameContainer.clientWidth

        if (barcoLeft < 0) {
            this.moveBarco(this.barco, 0)
            this.x = 0
        }

        if (barcoLeft + barcoWidth > gameContainerWidth) {
            this.moveBarco(this.barco, gameContainerWidth - barcoWidth)
            this.x = gameContainerWidth - barcoWidth
        }
    }

    /**
     * Cancela la animación del frame.
     * @returns {void}
     */
    cancelAnimationFrame() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
        }
    }

    /**
     * Muestra mensajes de manera aleatoria en un intervalo de tiempo.
     * @param {Array} mensajes - Array de mensajes a mostrar.
     * @returns {void}
     */
    verMensajes(mensajes) {
        const contenedorMensaje = document.getElementById("mensajeP")
        let arrayMensajes = []
        for (let i = 0; i < mensajes.length; i++) {
            arrayMensajes.push(mensajes[i].contenido);
        }
        this.intervalo = setInterval(() => {
            let indiceAleatorio = Math.floor(Math.random() * arrayMensajes.length)
            contenedorMensaje.innerHTML = arrayMensajes[indiceAleatorio]
        }, 7000);
    }

    /**
     * Muestra la vista con el nivel actual del juego.
     * @param {boolean} ver - Indica si se debe mostrar o no la vista.
     * @returns {void}
     */
    mostrar(ver) {
        let nivel = this.controlador.getNivelJuego()
        if (!this.pNivel) { return }
        this.pNivel.textContent = 'Nivel: ' + nivel
        super.mostrar(ver)
    }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistajugar() }

