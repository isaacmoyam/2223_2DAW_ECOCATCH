import { Vistausuario } from './vistausuario.js'
import { Rest } from '../../servicios/rest.js'

/**
 * Clase encargada de la Vista de juego, hereda de Vistausuario.
 * @class
 */
export class Vistajugar extends Vistausuario {

    #score = 0
    #objetosRecogidos = 0
    #scoreElement = document.getElementById('scoreValue')
    #objetosElement = document.getElementById("objetosRecogidos")

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
        this.menuJuego = null
    }

    /**
     * Realiza una llamada GET para obtener la lista de niveles y los muestra en la interfaz.
     * @method
     */
    
    llamarGETBasura = () => {
            Rest.getJSON(
                '../../../src/carpetasupersecretaparaadmin2daw/index.php?control=basura_con&metodo=ajaxBasura',
                null,
                this.obtenerDatosBasura.bind(this)
            );
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
            let estrellita = document.createElement('div');
            estrellita.classList.add('estrellita')
            estrellita.style.left = apple.style.left
            estrellita.style.top = apple.style.top
            this.gameContainer.appendChild(estrellita)


            imagenApple.src = "../../../src/img/basura.png"
            if(!this.datosBasura){}
            let indiceAleatorio = Math.floor(Math.random() * this.datosBasura.length);
            this.valorBasuraCogida = this.datosBasura[indiceAleatorio].BasuraValor
            imagenApple.src = "data:image/png;base64,"+this.datosBasura[indiceAleatorio].BasuraImagen+""
            imagenApple.style.width = "50px"
            imagenApple.style.height = "50px"
            apple.appendChild(imagenApple)
            apple.classList.add('apple')
            apple.style.left = Math.floor(Math.random() * (this.gameContainer.clientWidth - 50)) + 'px'
            apple.style.top = '-10px' // Posición inicial arriba del todo
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
            if (appleTop >= this.gameContainer.clientHeight-10) {
                this.gameContainer.removeChild(apple)
                this.#objetosDestruidos++;
                this.basuraAlAgua();
                this.fin();
            } else {
                // Ajusta este valor para controlar la velocidad de caída (menos píxeles = más lento)
                apple.style.top = appleTop + 3 + 'px' // Ajusta la velocidad de caída aquí
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
        if (this.#objetosCreados > this.#maxObjetos) {return}
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
            powerup.style.top = '-10px' // Posición inicial arriba del todo
            powerup.style.width = '50px'
            powerup.style.height = '50px'
            powerup.style.zIndex = '1'

            this.gameContainer.appendChild(powerup)

            powerup.classList.add('brillo-azul');
            this.#objetosCreados++
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
                powerup.style.top = poweruptopTop + 3 + 'px' // Ajusta la velocidad de caída aquí
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
        const barco = document.querySelector('#gameContainer img');

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

            barco.classList.add('brillo-azul');
            //Aumenta la velocidad del barco
            this.velocidad = parseInt(this.velocidad) + parseInt(this.aumentoVelocidadBarco)
            setTimeout(() => {
                this.velocidad = localStorage.getItem('velocidad')
                this.perderPowerup()
                this.parpadear();
                barco.classList.remove('brillo-azul');
            }, 4000);

            // Reproduce el sonido de la manzana
            this.reproducirSonidoPowerup();
        }
    }

    parpadear() {
        const barco = document.querySelector('#gameContainer img');

        const parpadeoInterval = setInterval(() => {
            const estiloActual = window.getComputedStyle(barco);
            const visibilidadActual = estiloActual.getPropertyValue('visibility');

            if (visibilidadActual === 'visible') {
                barco.style.visibility = 'hidden';
            } else {
                barco.style.visibility = 'visible';
            }
        }, 200);

        setTimeout(() => {
            clearInterval(parpadeoInterval);
            barco.style.visibility = 'visible'; 
        }, 2000);
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
            this.crearEstrella(appleLeft, appleTop);
    
            this.gameContainer.removeChild(apple);
            this.aumentarPuntuacion();
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

    reproducirSonidoPowerup() {
        const sonidoPowerup = document.getElementById('sonidoPowerup');
        sonidoPowerup.play();
    }

    perderPowerup() {
        const perderPowerup = document.getElementById('perdidaPowerup');
        perderPowerup.play();
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
        this.#scoreElement.textContent = this.#score

        this.#objetosRecogidos++
        this.#objetosElement.innerHTML = this.#objetosRecogidos+"/"+this.#maxObjetos
    }
    
    /**
     * Inicia el juego de las manzanas con animación.
     * @returns {void}
     */
    iniciarJuegoManzanas() {
        const update = () => {
            if (!this.juegoEnPausa) {
                // Ajusta estos valores según tus preferencias
                if (Math.random() < 0.018) {  // Probabilidad de crear una manzana (menor probabilidad = aparecen más lentamente)
                    this.crearManzana()
                }
                this.moverManzanas()

                if (!this.powerupCreado && Math.random() < 0.003) {  // Probabilidad de crear un powerup, solo si no se ha creado antes
                    this.crearPowerup();
                    this.powerupCreado = true; // Marcar que se ha creado el powerup
                }
                this.moverPowerup()
            }
            if(this.#maxObjetos == this.#objetosDestruidos) {
                window.location.href = "../ranking/formulario.html"
                localStorage.setItem('puntuacionFinal', this.#score)
                return
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
        this.idiomaSeleccionado = super.idioma()

        this.traduccion = {
            es: {
                obj: "Objetos recogidos:",
                nvl: "Nivel:",
                pts: "Puntuación:"
            },
            en: {
                obj: "Collected Items:",
                nvl: "Level:",
                pts: "Score:"
            }
        };

        super.cambiarIdioma()

        this.#objetosElement.innerHTML = this.#objetosRecogidos+"/"+this.#maxObjetos
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
     * Gestiona el audio del juego. Sirve para silenciar el audio del juego.
     * @returns {void}
     */
    audio() {
        //Referencias de los audios
        const miAudio = document.getElementById('miAudio');
        const agua = document.getElementById('agua');
        const sonidoPowerup = document.getElementById('sonidoPowerup');
        const sonidoBasura = document.getElementById('sonidoBasura');

        //Referencia del boton de silencio
        const botonSilencio = document.getElementById('botonSilencio');
    
        // Evento de clic para el botón de silencio
        botonSilencio.addEventListener('click', function() {
            if (miAudio.paused) {
                //Si está en pausa, reanudar
                botonSilencio.style.backgroundImage = "url(../../../src/img/musicaOn.png)";
                miAudio.play()

                //Y volver a activar los sonidos
                agua.volume = 1
                sonidoPowerup.volume = 1
                sonidoBasura.volume = 1
            } else {
                //Si está reproduciendo, pausar cancion
                botonSilencio.style.backgroundImage = "url(../../../src/img/musicaOff.png)";
                miAudio.pause()

                //Y silenciar el sonido
                agua.volume = 0
                sonidoPowerup.volume = 0
                sonidoBasura.volume = 0
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
     * Pausa el juego. Quitando tambien la cancion de fondo y renaudandola cuando el juego deje de estar pausado
     * @returns {void}
     */

    pausarJuego() {
        let texto = 'Juego Pausado'

        const miAudio = document.getElementById('miAudio') //Coge el audio para despues quitarle o ponerle el volumen

        if (this.juegoEnPausa) {
            document.getElementById('botonPausa').style.backgroundImage = "url(../../../src/img/pausa.png)"
            // Ocultar el menú y reanudar el juego
            if (this.menuJuego) {
                this.menuJuego.style.display = 'none'
                this.menuJuego.textContent = ''
            }
            miAudio.play() //Reanuda el audio
            this.reanudarJuego()
            document.getElementById('gameContainer').style.filter = 'none'
        } else {
            // Crear un nuevo menú solo si no existe
            if (!this.menuJuego) {
                this.menuJuego = document.createElement('div')
                document.getElementById('gameContainer').appendChild(this.menuJuego)
            }

            // Mostrar el menú y pausar el juego
            document.getElementById('botonPausa').style.backgroundImage = "url(../../../src/img/reanudar.png)"

            let contenidoPausa = document.createElement('div')
            contenidoPausa.textContent = texto
            this.menuJuego.appendChild(contenidoPausa)
            this.menuJuego.style.display = 'inline-block'
            this.menuJuego.style.width = '100%'
            this.menuJuego.style.height = '100%'
            this.menuJuego.style.zIndex = '10'

            contenidoPausa.style.display = 'flex'
            contenidoPausa.style.alignItems = 'center'
            contenidoPausa.style.justifyContent = 'center'
            contenidoPausa.style.width = '100%'
            contenidoPausa.style.height = '100%'
            //document.getElementById('gameContainer').style.filter = 'blur(10px)'
            contenidoPausa.style.backgroundImage = "url(../../../src/img/borroso.png)"
            contenidoPausa.style.back
            miAudio.pause() //Pausa el audio
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

