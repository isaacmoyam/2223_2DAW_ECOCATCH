import { Vista } from './vista.js';

export class Vistaempezar extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.eventos();
  }

  eventos() {
    this.inicializarModoOscuro()
  }

  inicializarModoOscuro() {
    super.modoOscuro()
    const body = document.body
    const cambiarModo = document.getElementById('dark');

    if (cambiarModo) {
      cambiarModo.addEventListener('click', () => {
        // Toggle del modo oscuro
        const enableDarkMode = !body.classList.contains('darkmode');
        body.classList.toggle('darkmode', enableDarkMode);
        super.elementosHijos(enableDarkMode);

        // Guardar el estado del modo oscuro en el almacenamiento local
        localStorage.setItem('darkmode', enableDarkMode ? 'enabled' : 'disabled');
      });
    }
  }
}

window.onload = () => { new Vistaempezar() }
