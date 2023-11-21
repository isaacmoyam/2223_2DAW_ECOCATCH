import { Vista } from './vista.js';

export class Vista6 extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.x = 0;
        this.touchStartX = null;
        this.animationFrameId = null;
        this.eventos();
    }

    eventos() {
        this.eventoBarco();

        this.enlaceSiguienteVista7 = this.base.querySelector('a');

        this.enlaceSiguienteVista7.onclick = () => {
            this.controlador.verVista(Vista.VISTA7);
        };
    }

    eventoBarco() {
        this.gameContainer = document.getElementById('gameContainer');
        this.barco = document.querySelector('#gameContainer img');
        this.pNivel = document.getElementById('nivelSeleccionado');

        this.gameContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.gameContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.gameContainer.addEventListener('touchend', () => this.handleTouchEnd());

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.x -= 8;
            } else if (e.key === 'ArrowRight') {
                this.x += 8;
            }

            this.moveBarco(this.barco, this.x);
        });
    }

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

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.requestAnimationFrame();
    }

    handleTouchMove(e) {
      if (this.touchStartX === null) return;
  
      let touchCurrentX = e.touches[0].clientX;
      let deltaX = touchCurrentX - this.touchStartX;
  
      this.x += deltaX;
  
      const maxX = this.gameContainer.clientWidth - this.barco.clientWidth;
      // Evitar que el barco se salga por el lado derecho
      this.x = Math.min(this.x, maxX);
      // Evitar que el barco se salga por el lado izquierdo
      this.x = Math.max(0, this.x);
  
      this.moveBarco(this.barco, this.x);
  
      this.touchStartX = touchCurrentX;
    }

    handleTouchEnd() {
        this.touchStartX = null;
        this.cancelAnimationFrame();
    }

    requestAnimationFrame() {
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(() => this.handleAnimationFrame());
        }
    }

    cancelAnimationFrame() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    handleAnimationFrame() {
        this.moveBarco(this.barco, this.x);
        this.requestAnimationFrame();
    }

    mostrar(ver) {
        let nivel = this.controlador.getNivelJuego();
        this.pNivel.textContent = 'Nivel: ' + nivel;
        super.mostrar(ver);
    }
}