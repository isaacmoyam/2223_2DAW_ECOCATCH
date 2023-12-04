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

    static postForm(url, params, callback) {
        let parametros = new FormData();
        for (const param in params) {
            parametros.append(param, params[param]);
        }

        const opciones = {
            method: 'POST',
            body: parametros
        };

        fetch(url, opciones)
        .then(response => {
            if (response.ok) {
                // Verifica si hay contenido en la respuesta antes de intentar parsearla
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    // No hay contenido JSON en la respuesta
                    return null;
                }
            } else {
                throw new Error('Error en la solicitud POST');
            }
        })
        .then(objeto => {
            if (callback) {
                callback(objeto);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
            // Puedes manejar el error de otra manera o lanzar una excepción si es necesario
        });
    }
}