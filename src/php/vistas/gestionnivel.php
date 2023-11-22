<?php
/**
 * Página principal para la gestión de basura.
 *
 * PHP version 7.4.3
 *
 * @category Basura
 * @package  Gestión_Basura
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

// Sección HTML para la interfaz de gestión de basura.
?>
<main id="gestor">
    <h1>Niveles</h1>
    <a href="php/vistas/anadirNivel.html">+</a>
    <a href="">Volver</a>
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
                        <a href="index.php?control=nivel_con&metodo=borrar&id=<?php echo $fila['id']; ?>">🗑️</a>
                        <a href="index.php?control=nivel_con&metodo=buscarModificar&id=<?php echo $fila['id']; ?>">✏️</a>
                    </td>
                </tr>
                <?php
            }
        ?>
    </table>
    <?php echo "<p>".$mensaje."</p>" ?>
</main>
<script src="expresionesRegulares.js" type="module"></script>