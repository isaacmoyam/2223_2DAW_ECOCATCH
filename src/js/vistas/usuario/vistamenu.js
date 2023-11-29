import { Vistausuario } from './vistausuario.js';

export class Vistamenu extends Vistausuario {
  constructor(controlador, base) {
    super(controlador, base);
    this.eventos();
  }

  eventos() {
    super.modoOscuro()
  }
}

window.onload = () => { new Vistamenu() }
