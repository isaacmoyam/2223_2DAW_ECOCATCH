/**
 * Clase de Servicio para llamadas AJAX.
 * @class
 */
export class Rest {

    /**
     * Realiza una solicitud GET y devuelve el resultado en texto.
     * @param {string} url - URL de la solicitud.
     * @param {Object} params - Parámetros de la solicitud.
     * @param {function} callback - Función de retorno de llamada.
     * @returns {void}
     */
    static get(url, params, callback) {
        // ... (código omitido para mayor claridad)
    }

    /**
     * Realiza una solicitud GET y devuelve el resultado en formato JSON.
     * @param {string} url - URL de la solicitud.
     * @param {Object} params - Parámetros de la solicitud.
     * @param {function} callback - Función de retorno de llamada.
     * @returns {void}
     */
    static getJSON(url, params, callback) {
        // ... (código omitido para mayor claridad)
    }

    /**
     * Realiza una solicitud POST y devuelve el resultado en texto.
     * @param {string} url - URL de la solicitud.
     * @param {Object} params - Parámetros de la solicitud.
     * @param {function} callback - Función de retorno de llamada.
     * @returns {void}
     */
    static post(url, params, callback) {
        // ... (código omitido para mayor claridad)
    }

    /**
     * Consulta datos climatológicos diarios de AEMET.
     * @returns {void}
     */
    static consultarAEMET() {
        // ... (código omitido para mayor claridad)
    }
}