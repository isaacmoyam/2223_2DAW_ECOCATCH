/**
 * Clase de servicios para llamadas  AJAX
 */
export class Rest{

    /**
     * Método estatico de la clase donde se hace una llamada GET a la AEMET.
     * @param apiKey {String} ApiKey proporcionada por la AEMET mediante la cual se hace la petición
     * @param callback {Function} Funcion usada para mostrar por consola los datos devueltos por la petición
     */
    static AEMET(apiKey,callback){
        const url = 'https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=' + apiKey;

        //Uso fetch para realizar la solicitud
        fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error(`Error en la solicitud: ${respuesta.status}`);
                }
                return respuesta.json();
            })
            .then(data => {
                //Como la respuesta que me da es una url donde se encuentran los datos voy a coger esa url
                const datosUrl = data.datos;

                //Para despues hacer un segundo fetch para obtener los datos climatologicos
                return fetch(datosUrl);
            })
            .then(response => response.json())
            .then(datos => {
                //Filtro los datos y obtengo los datos cuyo nombre es "BADAJOZ AEROPUERTO"
                const datosFiltrados = datos.filter(dato => dato.nombre === 'BADAJOZ AEROPUERTO');

                //Una vez cogidos los datos llamo al callback
                callback(datosFiltrados);
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

}