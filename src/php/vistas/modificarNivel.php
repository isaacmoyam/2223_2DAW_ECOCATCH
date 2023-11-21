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
    <form action="index.php?control=nivel_con&metodo=modificar&id=<?php echo $fila['id'];?>" method="POST">
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" value="<?php echo $fila['nombre'];?>" placeholder="Nombre nivel">
        <label for="valor">Items:</label>
        <input type="text" name="cantidadItems" value="<?php echo $fila['cantidadItems'];?>" placeholder="Cantidad de items">
        <label for="imagen">Velocidad:</label>
        <input type="text" name="velocidadBarco" value="<?php echo $fila['velocidadBarco'];?>" placeholder="Velocidad del barco">
        <input type="submit" value="Guardar cambios">
    </form>
</main>
<script src="expresionesRegulares.js" type="module"></script>

