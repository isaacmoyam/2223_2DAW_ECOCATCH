import { VistaAdmin } from './vistaAdmin.js'

/**
 * Clase encargada de la Vista 2 del administrador
 */
export class Vista2 extends VistaAdmin {
  /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
  constructor (controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
     * Asocia los eventos de la interfaz de la vista 2 del administrador
     */
  eventos () {
    const btnAgregarFila = document.getElementById('btnAgregarFila');
    if (!btnAgregarFila){}
    else
      btnAgregarFila.addEventListener('click', this.agregarFila.bind(this));
  }

  agregarFila() {
    const tablaDinamica = document.getElementById('tablaDinamica')
    const nuevaFila = tablaDinamica.insertRow()

    let input = document.createElement('input');
    let select = document.createElement('select');

    let celda = nuevaFila.insertCell();
    input.type = 'text';
    input.name = 'contenido[]'
    celda.appendChild(input);

    celda = nuevaFila.insertCell();
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'puntosHasta[]'
    celda.appendChild(input);

    celda = nuevaFila.insertCell();
    select = document.createElement('select');
    select.name = 'tipo[]';

    var opciones = [
        { nombre: 'Antes del nivel', valor: 'A' },
        { nombre: 'Durante el nivel', valor: 'B' },
        { nombre: 'Después del nivel', valor: 'C' }
    ];

    for (var i = 0; i < opciones.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = opciones[i].valor;
        opcion.text = opciones[i].nombre;
        select.appendChild(opcion);
    }

    celda.appendChild(select);

    // Añade la nueva celda con el botón para quitar la fila
    const celdaBoton = nuevaFila.insertCell();
    const btnQuitar = document.createElement('button');
    btnQuitar.type = 'button';
    btnQuitar.classList.add('btnQuitarFila');
    btnQuitar.textContent = '🗑️';
    btnQuitar.addEventListener('click', this.quitarFila.bind(this, nuevaFila));
    celdaBoton.appendChild(btnQuitar);
  }

  quitarFila(fila) {
    const tablaDinamica = document.getElementById('tablaDinamica');
    tablaDinamica.deleteRow(fila.rowIndex);
  }
  
}

window.onload = () => { new Vista2() }
