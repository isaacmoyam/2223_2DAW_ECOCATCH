import { Vista } from './vista.js'

export class Vista6 extends Vista {
    constructor(controlador, base) {
        super(controlador, base)
        this.x = 0
        this.touchStartX = null
        this.animationFrameId = null
        this.juegoEnPausa = false
        this.eventos()
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