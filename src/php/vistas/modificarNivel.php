<?php
/**
 * Página para la modificación de la información de nivel.
 *
 * PHP version 7.0
 *
 * @category Nivel
 * @package  Modificar_Nivel
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

// Sección HTML para la interfaz de modificación de nivel.
?>
<main id="gestorN">
    <a href="index.php?control=nivel_con">Volver</a>
    <?php
        $fila = $datosVista["datos"];
    ?>
    <h1>Configuración nivel</h1>
    <form action="index.php?control=nivel_con&metodo=modificar&id=<?php echo $fila['id'];?>" method="POST">
        <label for="nombre">(*) Nombre:</label>
        <input type="text" name="nombre" value="<?php echo $fila['nombre'];?>" placeholder="Nombre nivel">
        <label for="valor">(*) Items:</label>
        <input type="text" name="cantidadItems" value="<?php echo $fila['cantidadItems'];?>" placeholder="Cantidad de items">
        <label for="imagen">(*) Velocidad:</label>
        <input type="text" name="velocidadBarco" value="<?php echo $fila['velocidadBarco'];?>" placeholder="Velocidad del barco">
    <h1>Mensajes</h1>
    <table>
        <tr>
            <th>Contenido</th>
            <th>Puntos requeridos</th>
            <th>Tipo</th>
            <th>Opción</th>
        </tr>
        <?php
            $obj = new $controlador;
            $datos = $obj->mostrarMensajes();

            // Iteración sobre los datos para mostrar en la tabla.
            foreach ($datos as $mensaje) {
                ?>
                <tr>
                    <td><?php echo $mensaje['contenido']; ?></td>
                    <td><?php echo $mensaje['puntosHasta']; ?></td>
                    <td><?php echo $mensaje['tipo']; ?></td>
                    <td>
                        <a href="index.php?control=nivel_con&metodo=borrarMensaje&idNivel=<?php echo $fila['id']; ?>&id=<?php echo $mensaje['id']; ?>">🗑️</a>
                        <a href="index.php?control=nivel_con&metodo=buscarMensaje&idNivel=<?php echo $fila['id']; ?>&id=<?php echo $mensaje['id']; ?>">🔄</a>
                    </td>
                </tr>
                <?php
            }
        ?>
    </table>
    <input type="submit" value="Guardar cambios">
    </form>
</main>
<script src="expresionesRegulares.js" type="module"></script>

