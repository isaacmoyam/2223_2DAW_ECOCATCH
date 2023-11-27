import { VistaAdmin } from '../vistas/administrador/vistaAdmin.js'
import { Vista1 } from '../vistas/administrador/vista1.js'
import { Vista2 } from '../vistas/administrador/vista2.js'

/**
 * Clase controlador del usuario. Se encarga de controlar las vistas del usuario
 */

document.addEventListener('DOMContentLoaded', function () {
class ControladorAdmin {
  
  vistas = new Map()

  constructor() {
    const divVista1 = document.getElementById('divVista1');
    const divVista2 = document.getElementById('divVista2');

    this.vistas.set(VistaAdmin.VISTA1, new Vista1(this, divVista1));
    this.vistas.set(VistaAdmin.VISTA2, new Vista2(this, divVista2));

    this.verVista(VistaAdmin.VISTA1);

  }

  /**
     * Muestra una vista.
     * @param vista {Symbol} Símbolo que identifica a la vista.
     */
  verVista (vista) {
    this.ocultarVistas()
    this.vistas.get(vista).mostrar(true)
  }

  /**
     * Método por el cual se ocultan todas las vistas.
     */
  ocultarVistas () {
    for (const vista of this.vistas.values()) { vista.mostrar(false) }
  }
}

window.onload = () => { new ControladorAdmin() }
})