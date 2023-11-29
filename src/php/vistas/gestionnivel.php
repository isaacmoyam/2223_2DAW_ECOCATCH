<?php
/**
 * Página principal para la gestión de nivel.
 *
 * PHP version 8.2
 *
 * @category Nivel
 * @package  Gestión_Nivel
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

// Sección HTML para la interfaz de gestión de niveles.
?>
<main id="niveles">
    <h1>Niveles</h1>
    <a href="index.php?control=nivel_con&metodo=vistaCrear">+</a>
    <a href="index.php">Volver</a>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Items</th>
            <th>Velocidad</th>
            <th>Opción</th>
        </tr>
        <?php
            $obj = new Nivel_con();
            $datos = $obj->mostrar();

            // Iteración sobre los datos para mostrar en la tabla.
            foreach ($datos as $fila) {
                ?>
                <tr>
                    <td><?php echo $fila['nombre']; ?></td>
                    <td><?php echo $fila['cantidadItems']; ?></td>
                    <td><?php echo $fila['velocidadBarco']; ?></td>
                    <td>
                        <a id="botonBorrar" href="index.php?control=nivel_con&metodo=borrar&id=<?php echo $fila['id']; ?>">🗑️</a>
                        <a href="index.php?control=nivel_con&metodo=buscarModificar&id=<?php echo $fila['id']; ?>">✏️</a>
                    </td>
                </tr>
                <?php
            }
        ?>
    </table>
    <?php echo "<p>".$mensaje."</p>" ?>
</main>
<script src="js/vistas/administrador/vistamostrarnivel.js" type="module"></script>