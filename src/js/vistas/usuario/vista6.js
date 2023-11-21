import { Vista } from './vista.js';

/**
 * Clase que representa la sexta vista del juego.
 * @extends Vista
 */
export class Vista6 extends Vista {
    /**
     * Constructor de la clase Vista6.
     * @param {Controlador} controlador - El controlador del juego.
     * @param {HTMLElement} base - El elemento base de la vista.
     */
    constructor(controlador, base) {
        super(controlador, base);
        this.x = 0;
        this.touchStartX = null;
        this.animationFrameId = null;
        this.eventos();
    }

    /**
     * Asocia eventos a elementos de la interfaz de usuario.
     */
    eventos() {
        this.eventoBarco();

        /**
         * @type {HTMLAnchorElement}
         */
        this.enlaceSiguienteVista7 = this.base.querySelector('a');

        this.enlaceSiguienteVista7.onclick = () => {
            this.controlador.verVista(Vista.VISTA7);
        };
    }

    /**
     * Asocia eventos relacionados con el barco en el juego.
     */
    eventoBarco() {
        /**
         * @type {HTMLElement}
         */
        this.gameContainer = document.getElementById('gameContainer');

        /**
         * @type {HTMLImageElement}
         */
        this.barco = document.querySelector('#gameContainer img');

        /**
         * @type {HTMLElement}
         */
        this.pNivel = document.getElementById('nivelSeleccionado');

        this.gameContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.gameContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.gameContainer.addEventListener('touchend', () => this.handleTouchEnd());

        window.addEventListener('keydown', (e) => {
            const maxX = this.gameContainer.clientWidth - this.barco.clientWidth;

            if (e.key === 'ArrowLeft') {
                this.x = Math.max(0, this.x - 8); // Asegurar que no disminuya más allá de 0
            } else if (e.key === 'ArrowRight') {
                this.x = Math.min(maxX, this.x + 8); // Asegurar que no aumente más allá de maxX
            }

            this.moveBarco(this.barco, this.x);
        });
    }

    /**
     * Mueve el barco a la posición especificada.
     * @param {HTMLImageElement} barco - El elemento de la imagen del barco.
     * @param {number} x - La posición horizontal del barco.
     */
    moveBarco(barco, x) {
        const maxX = this.gameContainer.clientWidth - barco.clientWidth;
        // Evitar que el barco se salga por el lado derecho
        x = Math.min(x, maxX);
        // Evitar que el barco se salga por el lado izquierdo
        x = Math.max(0, x);

        // Utilizar requestAnimationFrame para crear un movimiento más suave
        this.animationFrameId = requestAnimationFrame(() => {
            barco.style.left = x + 'px';
        });
    }

    /**
     * Maneja el inicio del evento táctil.
     * @param {TouchEvent} e - El evento táctil.
     */
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.requestAnimationFrame;
    }

    /**
     * Maneja el movimiento durante un evento táctil.
     * @param {TouchEvent} e - El evento táctil.
     */
    handleTouchMove(e) {
        if (this.touchStartX === null) return;

        let touchCurrentX = e.touches[0].clientX;
        let deltaX = touchCurrentX - this.touchStartX;

        // Ajustar la posición sin incrementar directamente x
        let newPosX = this.x + deltaX;

        const maxX = this.gameContainer.clientWidth - this.barco.clientWidth;

        // Verificar si newPosX está dentro de los límites
        if (newPosX >= 0 && newPosX <= maxX) {
            this.moveBarco(this.barco, newPosX);
            this.x = newPosX; // Actualizar la posición x
        }

        this.touchStartX = touchCurrentX;

        // Verificar colisión con el límite del juego
        this.checkCollisionBoundary();
    }

    /**
     * Maneja el final de un evento táctil.
     */
    handleTouchEnd() {
        this.touchStartX = null;
        this.cancelAnimationFrame();
    }

    /**
     * Maneja el cuadro de animación, moviendo el barco a la posición actual.
     */
    handleAnimationFrame() {
        if (this.animationFrameId) {
            this.moveBarco(this.barco, this.x);
            this.requestAnimationFrame();
        }
    }

    /**
     * Verifica la colisión del barco con el límite del juego.
     */
    checkCollisionBoundary() {
        const barcoLeft = parseInt(window.getComputedStyle(this.barco).getPropertyValue('left'));
        const barcoWidth = this.barco.clientWidth;
        const gameContainerWidth = this.gameContainer.clientWidth;

        // Verificar colisión con el límite izquierdo
        if (barcoLeft < 0) {
            this.moveBarco(this.barco, 0);
            this.x = 0;
        }

        // Verificar colisión con el límite derecho
        if (barcoLeft + barcoWidth > gameContainerWidth) {
            this.moveBarco(this.barco, gameContainerWidth - barcoWidth);
            this.x = gameContainerWidth - barcoWidth;
        }
    }

    /**
     * Cancela la solicitud de cuadro de animación actual.
     */
    cancelAnimationFrame() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * Muestra la vista con el nivel actual del juego.
     * @param {boolean} ver - Indica si se debe mostrar o ocultar la vista.
     */
    mostrar(ver) {
        let nivel = this.controlador.getNivelJuego();
        this.pNivel.textContent = 'Nivel: ' + nivel;
        super.mostrar(ver);
    }
}