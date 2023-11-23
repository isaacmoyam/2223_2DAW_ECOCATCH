import { Vista } from './vista.js'

export class Vista6 extends Vista {

    #score = 0;
    #scoreElement = document.getElementById('scoreValue');
    #maxScore = 10
    #maxApples = 10;
    #applesCreated = 0;

    constructor(controlador, base) {
        super(controlador, base)
        this.x = 0
        this.touchStartX = null
        this.animationFrameId = null
        this.juegoEnPausa = false
        this.eventos()
        this.iniciarJuegoManzanas()
    }

    crearManzana() {
        console.log('Creando manzana');
        if (this.#applesCreated < this.#maxApples && this.#score < this.#maxScore) {
            let apple = document.createElement('div');
            let imagenApple = document.createElement('img');
            imagenApple.src = "../src/img/basura.png";
            imagenApple.style.width = "50px";
            imagenApple.style.height = "50px";
            apple.appendChild(imagenApple);
            apple.classList.add('apple');
            apple.style.left = Math.floor(Math.random() * (this.gameContainer.clientWidth - 50)) + 'px';
            apple.style.top = '-50px'; // Posición inicial arriba del todo
            apple.style.width = '50px'; 
            apple.style.height = '50px'; 
            apple.style.zIndex = '1';
            this.gameContainer.appendChild(apple);
    
            this.#applesCreated++;
        }
    }

    // Método para mover las manzanas
    moverManzanas() {
        let apples = document.getElementsByClassName('apple');
        for (let apple of apples) {
            let appleTop = parseInt(window.getComputedStyle(apple).getPropertyValue('top'));
            if (appleTop >= this.gameContainer.clientHeight-20) {
                this.gameContainer.removeChild(apple);
                this.#applesCreated--;
            } else {
                // Ajusta este valor para controlar la velocidad de caída (menos píxeles = más lento)
                apple.style.top = appleTop + 2 + 'px'; // Ajusta la velocidad de caída aquí
                this.verificarColisionManzana(apple);
            }
        }
    }

    // Método para verificar la colisión con el barco
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
            this.gameContainer.removeChild(apple);
            this.aumentarPuntuacion();
        }
    }

    // Método para aumentar la puntuación
    aumentarPuntuacion() {
        this.#score++;
        console.log(this.#score)
        this.#scoreElement.textContent = this.#score;
    }

    // Método para iniciar el juego de las manzanas
    iniciarJuegoManzanas() {
        const update = () => {
            if (!this.juegoEnPausa) {
                // Ajusta estos valores según tus preferencias
                if (Math.random() < 0.01) {  // Probabilidad de crear una manzana (menor probabilidad = aparecen más lentamente)
                    this.crearManzana();
                }
                this.moverManzanas();
            }
            requestAnimationFrame(update);
        };
        update();
    }

    recogerAjax = () => {
        const url = '../../../index.php?control=basura_con&metodo=ajax';
        Rest.get(url, this.mostrarResultadoAjax);
    }

    mostrarResultadoAjax = (objeto) =>{
        console.log(objeto)
    }

    eventos() {
        this.eventoBarco()
        this.crearBotonPausa()

        this.enlaceSiguienteVista7 = this.base.querySelector('a')

        this.enlaceSiguienteVista7.onclick = () => {
            this.controlador.verVista(Vista.VISTA7)
        }
    }

    crearBotonPausa() {
        const botonPausa = document.createElement('button')
        botonPausa.textContent = 'Pausar'
        botonPausa.onclick = () => this.pausarJuego()
        this.base.appendChild(botonPausa)
    }

    pausarJuego() {
        if (this.juegoEnPausa) {
            this.reanudarJuego()
        } else {
            this.juegoEnPausa = true
            this.cancelAnimationFrame()
        }
    }

    reanudarJuego() {
        this.juegoEnPausa = false
        this.requestAnimationFrame
    }

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
                this.x = Math.max(0, this.x - 8)
            } else if (e.key === 'ArrowRight') {
                this.x = Math.min(maxX, this.x + 8)
            }

            this.moveBarco(this.barco, this.x)
        })
    }

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

    handleTouchMove(e) {
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

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX
        this.requestAnimationFrame
    }

    handleTouchEnd() {
        this.touchStartX = null
        this.cancelAnimationFrame()
    }

    handleAnimationFrame() {
        if (this.animationFrameId) {
            this.moveBarco(this.barco, this.x)
            this.requestAnimationFrame
        }
    }

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

    cancelAnimationFrame() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
        }
    }

    mostrar(ver) {
        let nivel = this.controlador.getNivelJuego()
        this.pNivel.textContent = 'Nivel: ' + nivel
        super.mostrar(ver)
    }
}