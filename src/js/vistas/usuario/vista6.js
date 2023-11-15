import { Vista } from './vista.js';

export class Vista6 extends Vista {

    constructor(controlador, base) {
        super(controlador, base);
        this.x = 325; // Posición inicial en el eje X
        this.eventos();
    }

    eventos() {
        // Obtener la referencia del contenedor del juego
        this.gameContainer = document.getElementById('gameContainer');

        // Obtener la referencia de la imagen del barco
        this.barco = document.querySelector('#gameContainer img');

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                // Mover la imagen hacia la izquierda
                this.x -= 8;
            } else if (e.key === 'ArrowRight') {
                // Mover la imagen hacia la derecha
                this.x += 8;
            }

            // Actualizar la posición de la imagen
            this.barco.style.left = this.x + 'px';
        });

        // Asociar el evento de cambio de vista
        this.btnSiguienteVista7 = this.base.querySelector('a');

        // Asociar eventos
        this.btnSiguienteVista7.onclick = () => {
            this.controlador.verVista(Vista.VISTA7);
        };
    }

}
