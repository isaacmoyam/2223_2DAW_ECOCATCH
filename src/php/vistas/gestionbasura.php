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
    <h1>Basura</h1>
    <a href="php/vistas/anadir.html">+</a>
    <a href="">Volver</a>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Imagen</th>
            <th>Opción</th>
        </tr>
        <?php
            $obj = new Basura_Con();
            $datos = $obj->mostrar();

            // Iteración sobre los datos para mostrar en la tabla.
            foreach ($datos as $fila) {
                ?>
                <tr>
                    <td><?php echo $fila['nombre']; ?></td>
                    <td><?php echo $fila['valor']; ?></td>
                    <td><?php echo $fila['nombreImagen']; ?></td>
                    <td>
                        <a href="index.php?control=basura_con&metodo=borrar&id=<?php echo $fila['id']; ?>">🗑️</a>
                        <a href="index.php?control=basura_con&metodo=buscarModificar&id=<?php echo $fila['id']; ?>">✏️</a>
                    </td>
                </tr>
                <?php
            }
        ?>
    </table>
    <?php echo "<p>".$mensaje."</p>" ?>
</main>
<script src="expresionesRegulares.js" type="module"></script>