<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'php/modelos/db.php';

/**
 * Clase modelo para la gestión de powerup.
 */
class Powerup_Mod
{

    /**
     * Instancia de la conexión a la base de datos.
     * @var mysqli
     */
    private $mysqli;

    /**
     * Constructor de la clase Powerup_Mod.
     */
    public function __construct()
    {

    }

    /**
     * Establece la conexión con la base de datos.
     */
    public function establecerConexion()
    {
        $dbObj = new Db();
        $this->mysqli = $dbObj->mysqli;
    }

    /**
     * Cierra la conexión con la base de datos.
     */
    public function cerrarConexion()
    {
        if ($this->mysqli) {
            mysqli_close($this->mysqli);
        }
    }


    /**
     * Consulta la información del power up.
     * @return array
     */
    public function mostrar() {
        $this->establecerConexion();
        $sql = "SELECT p.id, i.nombre, i.imagen, p.aumento, p.descripcion FROM powerup p INNER JOIN item i ON p.id = i.id";

        $result = $this->mysqli->query($sql);

        $powerups = array();
        while ($row = $result->fetch_assoc()) {
            //$row['imagen'] = base64_encode($row['imagen']); //Para modificar los datos de la imagen en base 64
            $powerups[] = $row;
        }

        $this->cerrarConexion();

        return $powerups;
    }

    /**
     * Busca un powerup con un ID específico para modificar.
     * @param int $id
     * @return array
     */
    public function buscarModificar($id) {
        $this->establecerConexion();
        $sql = 'SELECT p.id, i.nombre, i.imagen, p.aumento, p.descripcion FROM powerup p INNER JOIN item i ON p.id=i.id WHERE i.id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $fila = $result->fetch_assoc();

        //$fila['imagen'] = base64_encode($fila['imagen']); //Cambio datos recogidos de imagen en codificacion base64

        return $fila;
    }

    /**
     * Modifica un powerup con un ID específico.
     * @param int $id
     * @param string $nombre
     * @param string $imagen
     * @param int $aumento
     * @return bool
     */
    public function modificar($id, $nombre, $imagen, $aumento, $descripcion) {
        $this->establecerConexion();

        //Quitar comillas en la imagen
        //$img = $this->mysqli->real_escape_string($imagen);
        $img = base64_encode($imagen); //Convierte los datos de textos binarios como una imagen en cadenas de texto para que se pueda almacenar la cadena de texto
        try {
            $sql = 'UPDATE item SET nombre = "'.$nombre.'", imagen = "'.$img.'" WHERE id = '.$id;
            $result = $this->mysqli->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }


        $this->cerrarConexion();

        $this->establecerConexion();

        try {
            /*
             * Se ha usado una expresion ternaria. En esta expresion se comprueba la condicion
             * $descripcion === "" que evalua si descripcion es una cadena vacia.
             * Esto esta separado por el caracter :, el cual separa
             * si la condicion es verdadera devuelve null y en casso contrario devuelve '"'.$descripcion.'"'
             * */
            $sql = 'UPDATE powerup SET aumento = '.$aumento.' ,descripcion = '.($descripcion === "" ? 'NULL' : '"'.$descripcion.'"').'  WHERE id = '.$id;
            $result = $this->mysqli->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error; //Si hay un error devulve true
        }

        $this->cerrarConexion();
    }

    /**
     * Establece unos valores por defecto en la base de datos para los powerup.
     * Para ello primero borra las filas existentes de powerup (si hay) y despues inserta los valores por defecto.
     * @return void
     */
    public function valoresPorDefecto($imagen) {
        $this->establecerConexion();
        /*
         * En el contexto del WHERE 1, el 1 es una condición siempre verdadera lo que significa que todas las filas que cumplan la condicion seran eliminadas
         * Por ello como no quiero borrar todas las filas de item y solo quiero borrar las filas de item que esten en power up
         * hago el INNER JOIN powerup p ON i.id=p.id para que así solo me borren las filas de item que estan en powerup
         * */
        $sqlEliminarPowerup = 'DELETE i FROM item i INNER JOIN powerup p ON i.id=p.id WHERE 1';
        $this->mysqli->query($sqlEliminarPowerup);

        //Consulta Preparada para item
        $sqlItem = 'INSERT INTO item (nombre, imagen) VALUES (?, ?)';
        $consultaPrepardaItem = $this->mysqli->prepare($sqlItem);

        //Consulta Preparada para powerup
        $sqlPowerup = 'INSERT INTO powerup (id, aumento, descripcion) VALUES (?, ?, ?)';
        $consultaPreparadaPowerup = $this->mysqli->prepare($sqlPowerup);

        /*
         * Preparo la imagen.
         * Como va a ser la misma para todos con solo ponerlo una vez es suficiente
         * */
        //$img = $this->mysqli->real_escape_string($imagen);

        //COMIENZO INSERCCIONES
        //Primera inserccion en item
        $nombrePorDefecto = 'Velocidad1';

        $consultaPrepardaItem->bind_param('ss', $nombrePorDefecto, $imagen);
        $consultaPrepardaItem->execute();

        //Y su respectiva inserccion en powerup
        $idPorDefecto = $this->mysqli->insert_id; //Obtengo el id de la ultima consulta (insert de item)
        $aumentoPorDefecto = 10; // Cambia esto según tus necesidades
        $descripcionPorDefecto = 'Este powerup aumenta la velocidad del barco en 10'; // Cambia esto según tus necesidades

        $consultaPreparadaPowerup->bind_param('iis', $idPorDefecto, $aumentoPorDefecto, $descripcionPorDefecto);
        $consultaPreparadaPowerup->execute();


        //Segunda inserccion en item
        $nombrePorDefecto = 'Velocidad2';

        $consultaPrepardaItem->bind_param('ss', $nombrePorDefecto, $imagen);
        $consultaPrepardaItem->execute();

        //Y su respectiva inserccion en powerup
        $idPorDefecto = $this->mysqli->insert_id; //Obtengo el id de la ultima consulta (insert de item)
        $aumentoPorDefecto = 20; // Cambia esto según tus necesidades
        $descripcionPorDefecto = 'Este powerup aumenta la velocidad del barco en 20'; // Cambia esto según tus necesidades

        $consultaPreparadaPowerup->bind_param('iis', $idPorDefecto, $aumentoPorDefecto, $descripcionPorDefecto);
        $consultaPreparadaPowerup->execute();


        //Tercera inserccion en item
        $nombrePorDefecto = 'Velocidad3';

        $consultaPrepardaItem->bind_param('ss', $nombrePorDefecto, $imagen);
        $consultaPrepardaItem->execute();

        //Y su respectiva inserccion en powerup
        $idPorDefecto = $this->mysqli->insert_id; //Obtengo el id de la ultima consulta (insert de item)
        $aumentoPorDefecto = 30; // Cambia esto según tus necesidades
        $descripcionPorDefecto = 'Este powerup aumenta la velocidad del barco en 30'; // Cambia esto según tus necesidades

        $consultaPreparadaPowerup->bind_param('iis', $idPorDefecto, $aumentoPorDefecto, $descripcionPorDefecto);
        $consultaPreparadaPowerup->execute();

        // Cerrar las declaraciones preparadas
        $consultaPrepardaItem->close();
        $consultaPreparadaPowerup->close();

        $this->cerrarConexion();
    }

    /**
     * Recoge datos de power-ups y los retorna al controlador en json.
     */
    public function ajaxDatosPowerup() {
        $this->establecerConexion();

        /*
         * Consulta para obtener información de power-ups
         * Descripcion no se manda dado que no se necesitara para nada
         * */
        $sqlPowerup = "SELECT p.id, i.nombre, i.imagen, p.aumento FROM powerup p INNER JOIN item i on p.id = i.id";
        $resultPowerup = $this->mysqli->query($sqlPowerup);

        $powerups = array();
        while ($row = $resultPowerup->fetch_assoc()) {
            $row['imagen'] = base64_encode($row['imagen']);
            $powerups[] = $row;
        }

        $this->cerrarConexion();

        return json_encode($powerups);
    }
}