<?php
/**
 * Página para la modificación de la información de basura.
 *
 * PHP version 7.0
 *
 * @category Basura
 * @package  Modificar_Basura
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

// Sección HTML para la interfaz de modificación de basura.
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../../css/styleAdmin.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Modificar basura</title>
    </head>
    <body>
        <header>
            <img src="../../img/logo.png" alt="Logo de la aplicación">
        </header>
        <main id="gestorM">
            <a href="gestionbasura.php">Volver</a>
            <?php
                // Inclusión del archivo principal y llamada a la función buscarModificar.
                require ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/index.php');
                $fila = buscarModificar();
            ?>
            <form action="../../src/index.php?control=Basura_Con&metodo=modificar&id=<?php echo $fila['id'];?>" method="POST">
                <label for="nombre">Nombre:</label>
                <input type="text" name="nombre" value="<?php echo $fila['nombre'];?>" placeholder="Nombre basura">
                <label for="valor">Valor:</label>
                <input type="text" name="valor" value="<?php echo $fila['valor'];?>" placeholder="Puntuación">
                <label for="imagen">Imagen:</label>
                <input type="file" name="imagen" value="<?php echo $fila['nombreImagen'];?>">
                <input type="submit" value="Guardar cambios">
            </form>
        </main>
        <script src="expresionesRegulares.js" type="module"></script>
    </body>
</html>
