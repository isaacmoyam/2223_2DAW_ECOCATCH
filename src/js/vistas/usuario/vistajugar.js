import { Vistausuario } from './vistausuario.js'
import { Rest } from '../../servicios/rest.js'

/**
 * Clase encargada de la Vista de juego, hereda de Vistausuario.
 * @class
 */
export class Vistajugar extends Vistausuario {

    #score = 0
    #scoreElement = document.getElementById('scoreValue')
    #maxScore = document.getElementById('maxScore')
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
     * Realiza una llamada GET para obtener la lista de niveles y los muestra en la interfaz.
     * @method
     */
    llamarGETBasura = () => {
        Rest.getJSON('../../../src/carpetasupersecretaparaadmin2daw/index.php?control=basura_con&metodo=ajaxBasura', null, this.obtenerDatosBasura);
    }

    /**
     * Muestra los resultados obtenidos de la llamada GET en la interfaz.
     * @method
     * @param {Object} respuesta - Respuesta obtenida de la llamada GET.
     */
    obtenerDatosBasura = (respuesta) => {
        console.log(respuesta)
        this.datosBasura = respuesta.map(elemento => ({
            BasuraId: elemento.id,
            BasuraNombre: elemento.nombre,
            BasuraImagen: elemento.imagen,
            BasuraValor: elemento.valor
        }));
    }

    /**
     * Crea una manzana y la agrega al contenedor de juego.
     * @returns {void}
     */
    crearManzana() {
        if (this.#objetosCreados < this.#maxObjetos) {
            let apple = document.createElement('div')
            let imagenApple = document.createElement('img')
            let indiceAleatorio = Math.floor(Math.random() * this.datosBasura.length);
            this.valorBasuraCogida = this.datosBasura[indiceAleatorio].BasuraValor
            imagenApple.src = "data:image/png;base64,"+this.datosBasura[indiceAleatorio].BasuraImagen+""
            imagenApple.style.width = "50px"
            imagenApple.style.height = "50px"
            apple.appendChild(imagenApple)
            apple.classList.add('apple')
            apple.style.left = Math.floor(Math.random() * (this.gameContainer.clientWidth - 50)) + 'px'
            apple.style.top = '-50px' // Posición inicial arriba del todo
            apple.style.width = '50px' 
            apple.style.height = '50px' 
            apple.style.zIndex = '1'
            apple.id = this.datosBasura[indiceAleatorio].BasuraValor
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
            if (appleTop >= this.gameContainer.clientHeight-20) {
                this.gameContainer.removeChild(apple)
                this.#objetosDestruidos++;
                this.basuraAlAgua();
            } else {
                // Ajusta este valor para controlar la velocidad de caída (menos píxeles = más lento)
                apple.style.top = appleTop + 2 + 'px' // Ajusta la velocidad de caída aquí
                this.verificarColisionManzana(apple)
            }
        }
    }


    /**
     * Realiza una llamada GET para obtener la lista de niveles y los muestra en la interfaz.
     * @method
     */
    llamarGETPowerup = () => {
        Rest.getJSON('../../../src/carpetasupersecretaparaadmin2daw/index.php?control=powerup_con&metodo=ajaxPowerup', null, this.obtenerDatosPowerup);
    }

    /**
     * Muestra los resultados obtenidos de la llamada GET en la interfaz.
     * @method
     * @param {Object} respuesta - Respuesta obtenida de la llamada GET.
     */
    obtenerDatosPowerup = (respuesta) => {
        console.log(respuesta)
        this.datosPowerup = respuesta.map(elemento => ({
            PowerupId: elemento.id,
            PowerupNombre: elemento.nombre,
            PowerupImagen: elemento.imagen,
            PowerupAumento: elemento.aumento
        }));
    }

    /**
     * Crea un powerup y la agrega al contenedor de juego.
     * @returns {void}
     */
    crearPowerup() {
        if (this.#objetosCreados < this.#maxObjetos) {
            let powerup = document.createElement('div')
            let imagenPowerup = document.createElement('img')
            let indiceAleatorio = Math.floor(Math.random() * this.datosBasura.length);
            this.aumentoVelocidadBarco = this.datosPowerup[indiceAleatorio].PowerupAumento
            imagenPowerup.src = "data:image/png;base64,"+this.datosPowerup[indiceAleatorio].PowerupImagen+""
            imagenPowerup.style.width = "50px"
            imagenPowerup.style.height = "50px"
            powerup.appendChild(imagenPowerup)
            powerup.classList.add('powerup')
            powerup.style.position = 'relative';
            powerup.style.left = Math.floor(Math.random() * (this.gameContainer.clientWidth - 50)) + 'px'
            powerup.style.top = '-50px' // Posición inicial arriba del todo
            powerup.style.width = '50px'
            powerup.style.height = '50px'
            powerup.style.zIndex = '1'

            this.gameContainer.appendChild(powerup)

            this.#objetosCreados++
        }
    }

    /**
     * Mueve el powerup hacia abajo en el contenedor de juego.
     * @returns {void}
     */
    moverPowerup() {
        let power = document.getElementsByClassName('powerup')
        for (let powerup of power) {
            let poweruptopTop = parseInt(window.getComputedStyle(powerup).getPropertyValue('top'))
            if (poweruptopTop >= this.gameContainer.clientHeight-20) {
                this.gameContainer.removeChild(powerup)
                this.#objetosDestruidos++;
                this.basuraAlAgua();
            } else {
                // Ajusta este valor para controlar la velocidad de caída (menos píxeles = más lento)
                powerup.style.top = poweruptopTop + 2 + 'px' // Ajusta la velocidad de caída aquí
                this.verificarColisionPowerup(powerup)
            }
        }
    }

    /**
     * Verifica si hay colisión entre una manzana y el barco.
     * @param {HTMLElement} apple - Elemento DOM representando la manzana.
     * @returns {void}
     */
    verificarColisionPowerup(powerup) {
        let barcoLeft = parseInt(window.getComputedStyle(this.barco).getPropertyValue('left'))
        let barcoTop = parseInt(window.getComputedStyle(this.barco).getPropertyValue('top'))

        let powerupLeft = parseInt(window.getComputedStyle(powerup).getPropertyValue('left'))
        let powerupTop = parseInt(window.getComputedStyle(powerup).getPropertyValue('top'))

        let barcoWidth = this.barco.clientWidth
        let barcoHeight = this.barco.clientHeight

        // Ajusta este valor para controlar la distancia de colisión (mayor valor = más fácil)
        let distanciaColision = 30

        if (
            powerupLeft < barcoLeft + barcoWidth - distanciaColision &&
            powerupLeft + 50 > barcoLeft + distanciaColision &&
            powerupTop < barcoTop + barcoHeight - distanciaColision &&
            powerupTop + 50 > barcoTop + distanciaColision
        ) {
            this.gameContainer.removeChild(powerup)
            this.#objetosDestruidos++;
            //Aumenta la velocidad del barco
            this.velocidad = parseInt(this.velocidad) + parseInt(this.aumentoVelocidadBarco)

            // Reproduce el sonido de la manzana
            this.reproducirSonidoPowerup    ();
        }
    }


    /**
     * Verifica si hay colisión entre una manzana y el barco.
     * @param {HTMLElement} apple - Elemento DOM representando la manzana.
     * @returns {void}
     */
    verificarColisionManzana(apple) {
        let barcoLeft = parseInt(window.getComputedStyle(this.barco).getPropertyValue('left'))
        let barcoTop = parseInt(window.getComputedStyle(this.barco).getPropertyValue('top'))
    
        let appleLeft = parseInt(window.getComputedStyle(apple).getPropertyValue('left'))
        let appleTop = parseInt(window.getComputedStyle(apple).getPropertyValue('top'))
    
        let barcoWidth = this.barco.clientWidth
        let barcoHeight = this.barco.clientHeight
    
        // Ajusta este valor para controlar la distancia de colisión (mayor valor = más fácil)
        let distanciaColision = 30
    
        if (
            appleLeft < barcoLeft + barcoWidth - distanciaColision &&
            appleLeft + 50 > barcoLeft + distanciaColision &&
            appleTop < barcoTop + barcoHeight - distanciaColision &&
            appleTop + 50 > barcoTop + distanciaColision
        ) {
            this.gameContainer.removeChild(apple)
            this.aumentarPuntuacion()
            this.#objetosDestruidos++;

            // Reproduce el sonido de la manzana
            this.reproducirSonidoManzana();
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

    reproducirSonidoPowerup() {
        const sonidoPowerup = document.getElementById('sonidoPowerup');
        sonidoPowerup.play();
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
    aumentarPuntuacion() {
        this.#score = this.#score + parseInt(this.valorBasuraCogida)
        //console.log(this.#score)
        this.#scoreElement.textContent = this.#score
    }

    mostrarMaximo(){
        
    }
    
    /**
     * Inicia el juego de las manzanas con animación.
     * @returns {void}
     */
    iniciarJuegoManzanas() {
        const update = () => {
            if (!this.juegoEnPausa) {
                // Ajusta estos valores según tus preferencias
                if (Math.random() < 0.003) {  // Probabilidad de crear una manzana (menor probabilidad = aparecen más lentamente)
                    this.crearManzana()
                }
                this.moverManzanas()

                if (!this.powerupCreado && Math.random() < 0.003) {  // Probabilidad de crear un powerup, solo si no se ha creado antes
                    this.crearPowerup();
                    this.powerupCreado = true; // Marcar que se ha creado el powerup
                }
                this.moverPowerup()
            }
            requestAnimationFrame(update)
            if(this.#maxObjetos == this.#objetosDestruidos) {
                window.location.href = "../ranking/formulario.html";
                localStorage.setItem('puntuacionFinal', this.#score)
            }
        }
        update()
    }

    /**
     * Asocia eventos a elementos del juego.
     * @returns {void}
     */
    eventos() {
        this.x = 0
        this.touchStartX = null
        this.animationFrameId = null
        this.juegoEnPausa = false

        this.id = localStorage.getItem('id')

        this.llamarGETBasura()
        this.llamarGETPowerup()

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

        window.addEventListener('keydown', (e) => {
            const maxX = this.gameContainer.clientWidth - this.barco.clientWidth

            if (e.key === 'ArrowLeft') {
                this.x = Math.max(0, this.x - +this.velocidad)
            } else if (e.key === 'ArrowRight') {
                this.x = Math.min(maxX, this.x + +this.velocidad)
            }

            this.moveBarco(this.barco, this.x)
        })
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

