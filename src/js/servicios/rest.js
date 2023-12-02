/**
 * Clase de Servicio para llamadas AJAX.
 * @class
 */
export class Rest { 	
    static get(url, params, callback) {
        let paramsGET = '?';

        for (let param in params) {
            paramsGET += param + '=';
            paramsGET += params[param] + '&';
        }

        fetch(encodeURI(url + paramsGET.substring(0, paramsGET.length-1)))
            .then(respuesta => respuesta.text())
            .then(texto => {
                if (callback) {
                    callback(texto);
                }
            });
    } 

    static getJSON(url, params, callback) {
        let paramsGET = '?';

        for (let param in params) {
            paramsGET += param + '=';
            paramsGET += params[param] + '&';
        }

        fetch(encodeURI(url + paramsGET.substring(0, paramsGET.length-1)))
            .then(texto => texto.json())
            .then(objeto => {
                if (callback) {
                    callback(objeto);
                }
            });
    }

    static post(url, params, callback) {
        let parametros = new FormData();
        for (const param in params) {
            parametros.append(param, params[param]);
        }

        const opciones = {
            method: 'POST',
            body: parametros
        };

        fetch(url, opciones)
            .then(respuesta => respuesta.json())
            .then(objeto => {
                if (callback) {
                    callback(objeto);
                }
            });
    }
}