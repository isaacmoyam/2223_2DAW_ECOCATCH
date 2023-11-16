import { Vista } from './vista.js';

export class Vista6 extends Vista {

    constructor(controlador, base) {
        super(controlador, base);
        this.x = 325; // Posición inicial en el eje X
        this.eventos();
    }

    eventos() {
        // Obtener la referencia del contenedor del juego
        this.eventoBarco()

        // Asociar el evento de cambio de vista
        this.enlaceSiguienteVista7 = this.base.querySelector('a');

        // Asociar eventos
        this.enlaceSiguienteVista7.onclick = () => {
            this.controlador.verVista(Vista.VISTA7);
        };
    }

    eventoBarco(){
        this.gameContainer = document.getElementById('gameContainer');

        // Obtener la referencia de la imagen del barco
        this.barco = document.querySelector('#gameContainer img');
        this.pNivel = document.getElementById('nivelSeleccionado')

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.x -= 8;
            } else if (e.key === 'ArrowRight') {
                this.x += 8;
            }

            // Actualizar la posición de la imagen con un movimiento más suave
            this.moveBarco(this.barco, this.x);
        });
    }


    moveBarco(barco, x) {
        // Utilizar setTimeout para crear un movimiento más suave
        setTimeout(() => {
            barco.style.left = x + 'px';
        }, 10);
    }

    mostrar(ver){
        let nivel = this.controlador.getNivelJuego()
        this.pNivel.textContent = 'Nivel: ' + nivel
        super.mostrar(ver)
    }
}
