import { Vista } from './vista.js';

export class Vistamenu extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.eventos();
  }

  eventos() {
    super.modoOscuro()
  }
}

window.onload = () => { new Vistamenu() }
