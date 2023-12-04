<?php

/**
 * Modelo de la powerup
 *
 *
 * @category Modelo
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

require_once 'php/modelos/db.php';

/**
 * Clase modelo para la gestión de powerup.
 */
class Powerup_Mod
{

    /**
     * Instancia de la conexión a la base de datos.
     * @var conexion
     */
    private $conexion;

    /**
     * Constructor de la clase Powerup_Mod.
     */
    public function __construct()
    {
        $dbObj = new Db();
        $this->conexion = $dbObj->mysqli;

    }

    /**
     * Consulta la información del power up.
     * @return array
     */
    public function mostrar() {
        $sql = "SELECT p.id, i.nombre, i.imagen, p.aumento, p.descripcion FROM powerup p INNER JOIN item i ON p.id = i.id";

        $result = $this->conexion->query($sql);

        $powerups = array();
        while ($row = $result->fetch_assoc()) {
            $powerups[] = $row;
        }

        $this->conexion->close(); //Cerrar conexion

        return $powerups;
    }

    /**
     * Modifica un powerup con un ID específico.
     * @param int $id
     * @param string $nombre
     * @param string $imagen
     * @param int $aumento
     * @param string $descripcion
     * @return bool
     */
    public function modificar($id, $nombre, $imagen, $aumento, $descripcion) {
        try {
            $sql = 'UPDATE item SET nombre = "'.$nombre.'", imagen = "'.$imagen.'" WHERE id = '.$id;
            $result = $this->conexion->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }

        try {
            /*
             * Se ha usado una expresion ternaria. En esta expresion se comprueba la condicion
             * $descripcion === "" que evalua si descripcion es una cadena vacia.
             * Esto esta separado por el caracter :, el cual separa
             * si la condicion es verdadera devuelve null y en caso contrario devuelve '"'.$descripcion.'"'
             * */
            $sql = 'UPDATE powerup SET aumento = '.$aumento.' ,descripcion = '.($descripcion === "" ? 'NULL' : '"'.$descripcion.'"').'  WHERE id = '.$id;
            $result = $this->conexion->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error; //Si hay un error devulve true
        }

    }

    /**
     * Establece unos valores por defecto en la base de datos para los powerup.
     * Para ello primero borra las filas existentes de powerup (si hay) y despues inserta los valores por defecto.
     * @return void
     */
    public function valoresPorDefecto($imagen) {
        /*
         * En el contexto del WHERE 1, el 1 es una condición siempre verdadera lo que significa que todas las filas que cumplan la condicion seran eliminadas
         * Por ello como no quiero borrar todas las filas de item y solo quiero borrar las filas de item que esten en power up
         * hago el INNER JOIN powerup p ON i.id=p.id para que así solo me borren las filas de item que estan en powerup
         * */
        $sqlEliminarPowerup = 'DELETE i FROM item i INNER JOIN powerup p ON i.id=p.id WHERE 1';
        $this->conexion->query($sqlEliminarPowerup);

        //Consulta Preparada para item
        $sqlItem = 'INSERT INTO item (nombre, imagen) VALUES (?, ?)';

        $consultaPrepardaItem = $this->conexion->prepare($sqlItem);
        $consultaPrepardaItem->bind_param('ss', $nombrePorDefecto, $imagen);

        //Consulta Preparada para powerup
        $sqlPowerup = 'INSERT INTO powerup (id, aumento, descripcion) VALUES (?, ?, ?)';

        $consultaPreparadaPowerup = $this->conexion->prepare($sqlPowerup);
        $consultaPreparadaPowerup->bind_param('iis', $idPorDefecto, $aumentoPorDefecto, $descripcionPorDefecto);

        //Preparo el array con los datosque quiero introducir
        $arrayDatos = [
            ['Velocidad1',10,'Este powerup aumenta la velocidad del barco en 10'],
            ['Velocidad2',20,'Este powerup aumenta la velocidad del barco en 20'],
            ['Velocidad3',30,'Este powerup aumenta la velocidad del barco en 30']
        ];

        foreach ($arrayDatos as $dato){
            //Dar valor a la variable para la consulta de item
            $nombrePorDefecto = $dato[0];

            $consultaPrepardaItem->execute(); //Ejecutar consulta preparada item

            //Dar valor a las variables para la consulta de powerup
            $idPorDefecto = $this->conexion->insert_id; //Obtengo el id de la ultima consulta (insert de item)
            $aumentoPorDefecto = $dato[1];
            $descripcionPorDefecto = $dato[2];

            $consultaPreparadaPowerup->execute(); //Ejecutar consulta preparada powerup
        }

        // Cerrar las declaraciones preparadas
        $consultaPrepardaItem->close();
        $consultaPreparadaPowerup->close();

        $this->conexion->close(); //Cerrar conexion
    }

    /**
     * Recoge datos de power-ups y los retorna al controlador en json. Se realiza una consulta para obtener información de powerups
     */
    public function ajaxDatosPowerup() {
        //Descripcion no se manda dado que no se necesitara para nada
        $sqlPowerup = "SELECT p.id, i.nombre, i.imagen, p.aumento FROM powerup p INNER JOIN item i on p.id = i.id";
        $resultPowerup = $this->conexion->query($sqlPowerup);

        $powerups = array();
        while ($row = $resultPowerup->fetch_assoc()) {
            $powerups[] = $row;
        }

        $this->conexion->close(); //Cerrar conexion

        return json_encode($powerups);
    }
}