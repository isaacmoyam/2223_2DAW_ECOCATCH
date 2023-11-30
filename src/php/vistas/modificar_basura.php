<?php
/**
 * Página para la modificación de la información de basura.
 *
 * PHP version 8.2
 *
 * @category Basura
 * @package  Gestión_Basura
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

// Sección HTML para la interfaz de modificación de basura.
?>
<main id="gestorM">
    <?php
        $fila = $datosVista["datos"];
    ?>
    <!--enctype="multipart/form-data" es para que se pueda pasar el FILE -->
    <form enctype="multipart/form-data" action="index.php?control=basura_con&metodo=modificar&id=<?php echo $fila['id'];?>" method="POST">
        <label>Nombre:</label>
        <input type="text" name="nombre" value="<?php echo $fila['nombre'];?>" placeholder="Nombre basura">
        <label>Valor:</label>
        <input type="text" name="valor" value="<?php echo $fila['valor'];?>" placeholder="Puntuación">
        <label>Imagen Actual:</label>
        <img src="data:image/png;base64,<?php echo $fila['imagen'];?>" alt="Imagen Actual">
        <label>(*) Imagen:</label>
        <input type="file" name="imagen">
        <input type="submit" value="Guardar cambios">
    </form>
</main>

