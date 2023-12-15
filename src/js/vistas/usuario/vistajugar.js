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

    #basuras = [];

    #mostradoA = false

    #fin = false

    /**
     * Constructor de la clase. Inicializa los atributos correspondientes.
     * @constructor
     * @param {ControladorUsuario} controlador - Controlador del Usuario.
     * @param {Object} base - Objeto que es una referencia del interfaz.
     */
    constructor(controlador, base) {
        super(controlador, base);
        if(super.idioma() === "en") {
            this.tipoC = "Great!"
        } else {
            this.tipoC = "¡Genial!"
        }

        this.eventos();
        this.menuJuego = null;
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
        this.datosBasura = respuesta.map(elemento => ({
            BasuraId: elemento.id,
            BasuraNombre: elemento.nombre,
            BasuraImagen: elemento.imagen,
            BasuraValor: elemento.valor
        }));
        this.iniciarJuegoManzanas();
    }

    /**
     * Crea una manzana y la agrega al contenedor de juego.
     * @returns {void}
     */
    crearManzana() {
        if (this.#objetosCreados < this.#maxObjetos) {
            let apple = document.createElement('div');
            let imagenApple = document.createElement('img');
            
    
            let indiceAleatorio = Math.floor(Math.random() * this.datosBasura.length);
    
            // Accede al valor de la basura directamente desde el objeto datosBasura
            let valorBasuraCogida = this.datosBasura[indiceAleatorio].BasuraValor;
    
            imagenApple.src = "data:image/png;base64," + this.datosBasura[indiceAleatorio].BasuraImagen + "";
            this.#basuras.push({
                valor: valorBasuraCogida,
            });
            imagenApple.style.width = "50px";
            imagenApple.style.height = "50px";
            apple.appendChild(imagenApple);
            apple.classList.add('apple');
            apple.style.left = Math.floor(Math.random() * (this.gameContainer.clientWidth - 50)) + 'px';
            apple.style.top = '-10px'; // Posición inicial arriba del todo
            apple.style.width = '50px';
            apple.style.height = '50px';
            apple.style.zIndex = '1';
            apple.id = this.datosBasura[indiceAleatorio].BasuraValor;
            this.gameContainer.appendChild(apple);
    
            this.#objetosCreados++;
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

                if(!this.#fin) {
                    setTimeout(() => {
                        this.fin();
                    }, 500);   
                }
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
            let indiceAleatorio = Math.floor(Math.random() * this.datosPowerup.length);

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
            powerup.id = 'powerup'

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
            let basura = this.#basuras.find(b => b.valor === apple.id);

            // Realiza las acciones necesarias con la basura.
            // Por ejemplo, sumar el valor al puntaje del jugador.
            if (basura) {
                this.aumentarPuntuacion(basura.valor);
            }
            
            // Eliminar la basura del array y del DOM si es necesario.
            let basuraIndex = this.#basuras.indexOf(basura);

            if (basuraIndex !== -1) {
                this.#basuras.splice(basuraIndex, 1);
            }

            this.crearEstrella(appleLeft, appleTop, basura.valor);
    
            this.gameContainer.removeChild(apple);
            this.#objetosDestruidos++;

            if(!this.#fin) {
                setTimeout(() => {
                    this.fin();
                }, 500);   
            }
    
            // Reproduce el sonido de la manzana
            this.reproducirSonidoManzana();
        }
    }

    fin() {
        if(!this.#fin) {
            if (this.#maxObjetos == this.#objetosDestruidos) {
                this.#fin = true
                if(this.#score === 0) {
                    if(super.idioma() === "en") {
                        this.tipoC = "You haven't picked up the trash!"
                    } else {
                        this.tipoC = "¡No has recogido la basura!"
                    }
                }

                const frame = document.getElementById("frame");

                if(frame) {
                frame.remove(); 
                }

                const musica = document.getElementById("miAudio")
                musica.pause()

                const terminar = document.getElementById("terminar")
                terminar.play()
                
                const div = document.createElement("div");
                div.style.width = "50%";
                div.style.margin = "0 auto";
                div.style.textAlign = "center";
                div.style.padding = "20%";
                div.style.border = "solid 1px black"
                div.style.backgroundColor = "#326F1E"
                div.style.borderRadius = "15px"
        
                const msg = document.createElement("p");
                msg.textContent = this.tipoC; 
                msg.style.color = "#EDC713"; 
        
                const botonForm = document.createElement("button");
                if (this.idiomaSeleccionado === "en") {
                    botonForm.textContent = "Save Score";
                } else {
                    botonForm.textContent = "Subir tu puntuación";
                }
        
                botonForm.style.margin = "10px auto"; // Cambié el valor de margin para separar el botón del mensaje
                botonForm.addEventListener("click", this.redirect.bind(this));
        
                // Agregar el mensaje y el botón al div
                div.appendChild(msg);
                div.appendChild(botonForm);
        
                // Agregar el div al cuerpo del documento
                document.body.appendChild(div);
        
                localStorage.setItem('puntuacionFinal', this.#score);
            }
        }
    }
    
    redirect() {
        window.location.href = "../ranking/formulario.html";
    }

    crearEstrella(left, top, valor) {
        const numEstrellas = 1; // Estrellas a mostrar
        for (let i = 0; i < numEstrellas; i++) {
            let estrella = document.createElement('div');
            estrella.classList.add('estrella');
            estrella.textContent = "+"+valor; // Utiliza el parámetro valor directamente
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
    aumentarPuntuacion(valorBasuraCogida) {
        // Verifica si se pasa un valorBasuraCogida y es un número válido
        if (valorBasuraCogida && !isNaN(valorBasuraCogida)) {
            this.#score = this.#score + parseInt(valorBasuraCogida);
        }
    
        this.#scoreElement.textContent = this.#score;
    
        this.#objetosRecogidos++;
        this.#objetosElement.innerHTML = this.#objetosRecogidos + "/" + this.#maxObjetos;
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
        let texto = 'Reanudar Juego'
        const gameContainer = document.getElementById('gameContainer')
        const miAudio = document.getElementById('miAudio') //Coge el audio para despues quitarle o ponerle el volumen

        //Crear un nuevo menú solo si no existe
        if (!this.menuJuego) {
            this.menuJuego = document.createElement('div')
        }else{
            this.menuJuego.remove()
        }

        //PAUSA
        if (this.juegoEnPausa) {
            this.quitarPausa(miAudio)
        } else {
            this.aplicarFiltroEnElementos(gameContainer, 'blur(10px)');
            gameContainer.appendChild(this.menuJuego)

            //Cambiar imagen del boton de la pausa
            document.getElementById('botonPausa').style.backgroundImage = "url(../../../src/img/reanudar.png)"

            const contenidoPausa = document.createElement('div')
            contenidoPausa.id = "pausaMenu"
            const boton = document.createElement('button');
            boton.textContent = texto;
            boton.id = "botonReanudar"

            //Agrega el botón como hijo del div
            contenidoPausa.appendChild(boton);

            //Añadir evento oclick para el nuevo boton
            boton.addEventListener('click', () => {
                this.quitarPausa(miAudio)
            });

            this.menuJuego.appendChild(contenidoPausa)
            this.menuJuego.style.display = 'block'
            this.menuJuego.style.width = '100%'
            this.menuJuego.style.height = '100%'
            contenidoPausa.style.zIndex = '10'

            contenidoPausa.style.display = 'flex'
            contenidoPausa.style.alignItems = 'center'
            contenidoPausa.style.justifyContent = 'center'
            contenidoPausa.style.width = '100%'
            contenidoPausa.style.height = '100%'
            contenidoPausa.style.backgroundImage = "url(../../../src/img/borroso.png)"
            contenidoPausa.style.backgroundSize = 'cover'

            miAudio.pause() //Pausa el audio
            this.juegoEnPausa = true
            this.cancelAnimationFrame()
        }
    }

    /**
     * Metodo que quita la pausa
     * @param miAudio {Object} Referenci del audio que se va a poner a play
     */
    quitarPausa(miAudio){
        //Establece la imagen de fondo
        document.getElementById('botonPausa').style.backgroundImage = "url(../../../src/img/pausa.png)"

        if (this.menuJuego) {
            this.menuJuego.style.display = 'none'
            this.menuJuego.textContent = ''
        }

        this.menuJuego.remove() //Elimina el menu
        //Quitar el filtro a los elementos del gameContainer
        this.quitarFiltroEnElementos(document.getElementById('gameContainer'))

        miAudio.play(); // Reanuda el audio
        this.reanudarJuego() //Reanuda el juego
    }

    /**
     * Aplica el filtro concreto a todos los elementos dentro de gameContainer
     * @param gameContainer {Object} Contenedor referencia del contenedor html
     * @param filtro {String} Propiedad css del filtro que se quiere implementar
     */
    aplicarFiltroEnElementos(gameContainer, filtro) {
        const elementos = gameContainer.children

        for (let i = 0; i < elementos.length; i++) {
            const elemento = elementos[i]
            elemento.style.filter = filtro
            elemento.style.animation = 'none'
        }
    }

    /**
     * Quita los filtros a todos los elementos dentro de gameContainer
     * @param gameContainer {Object} Contenedor referencia del contenedor html
     */
    quitarFiltroEnElementos(gameContainer) {
        const elementos = gameContainer.children
        gameContainer.style.filter = 'none'

        for (let i = 0; i < elementos.length; i++) {
            const elemento = elementos[i]
            elemento.style.filter = 'none'
            if (elemento.id === "barco" || elemento.id === 'powerup') {
                elemento.style.animation = 'none'
            }else{
                elemento.style.animation = 'rotate 5s infinite linear'
            }
        }
    }

    /**
     * Reanuda el juego.
     * @returns {void}
     */
    reanudarJuego() {
        this.juegoEnPausa = false
        this.requestAnimationFrame
        this.llamarPOST()
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
        // Saca los mensajes tipo a y los mete en un array para mostrarlos aleatoriamente al principio del nivel
        let tipoA = []
        for (let i = 0; i < mensajes.length; i++) {
            if(mensajes[i].tipo === "A") {
                tipoA.push(mensajes[i].contenido) 
            }  
        }
        const update = () => {
            for (let i = 0; i < mensajes.length; i++) {
                // Si no se ha mostrado mensaje inicial, se muestra uno aleatorio
                if (mensajes[i].tipo === "A" && this.#mostradoA == false) {
                    this.#mostradoA = true
                    this.juegoEnPausa = false;
                    this.pausarJuego();
                    
                    let indiceAleatorio = Math.floor(Math.random() * tipoA.length);

                    // Obtén elementos necesarios
                    const pantallaMsg = document.getElementById("pausaMenu");
                    const boton = document.getElementById("botonReanudar");
                
                    // Crea un contenedor div
                    const contenedor = document.createElement("div");
                
                    // Crea el mensaje y configura sus propiedades
                    const msg = document.createElement("p");
                    msg.style.borderRadius = "10px";
                    msg.style.textAlign = "center"
                    msg.style.padding = "10%";
                    msg.style.marginBottom = "2%";
                    msg.style.border = "solid 1px black"
                    msg.id = "msgTipoA";
                    msg.textContent = tipoA[indiceAleatorio];
                    msg.style.backgroundColor = "#6d3916a4";
                
                    // Agrega el mensaje al contenedor
                    contenedor.appendChild(msg);
                
                    // Configura el botón
                    if(this.idiomaSeleccionado === "en") {
                        boton.textContent = "Start Game"; 
                    } else {
                        boton.textContent = "Comenzar Juego";
                    }
                
                    contenedor.style.textAlign = "center";
                    boton.style.display = "inline-block";
                
                    // Agrega el botón al contenedor
                    contenedor.appendChild(boton);
                    
                    // Agrega el contenedor al elemento padre (pantallaMsg)
                    pantallaMsg.appendChild(contenedor);
                    
                    return;
                }

                // Verifica la condición para mostrar el mensaje durante el juego
                if (this.#score >= mensajes[i].puntosHasta && mensajes[i].tipo === "B") {
                    // Muestra el mensaje en el contenedor
                    contenedorMensaje.innerHTML = mensajes[i].contenido;
                }
                if (this.#score >= mensajes[i].puntosHasta && mensajes[i].tipo === "C" && this.#maxObjetos == this.#objetosDestruidos) {
                    // Muestra el mensaje en el contenedor
                    this.tipoC = mensajes[i].contenido
                }
            }
            requestAnimationFrame(update);
        }
        update();
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

