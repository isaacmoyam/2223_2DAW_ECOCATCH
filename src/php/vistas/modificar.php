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
<main id="gestorM">
    <a href="index.php">Volver</a>
    <?php
        $fila = $datosVista["datos"];
    ?>
    <form action="index.php?control=Basura&metodo=modificar&id=<?php echo $fila['id'];?>" method="POST">
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

