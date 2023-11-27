<?php
/**
 * Página principal para la gestión de basura.
 *
 * PHP version 8.2
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
    <a href="index.php?control=basura_con&metodo=vistaCrear">+</a>
    <a href="index.php">Volver</a>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Imagen</th>
            <th>Opción</th>
        </tr>
        <?php
            $obj = new $controlador();
            $datos = $obj->mostrar();

            // Iteración sobre los datos para mostrar en la tabla.
            foreach ($datos as $fila) {
                ?>
                <tr>
                    <td><?php echo $fila['nombre']; ?></td>
                    <td><?php echo $fila['valor']; ?></td>
                    <td><?php echo $fila['nombreImagen']; ?></td>
                    <td>
                        <a id="botonBorrar" href="index.php?control=basura_con&metodo=borrar&id=<?php echo $fila['id']; ?>">🗑️</a>
                        <a href="index.php?control=basura_con&metodo=buscarModificar&id=<?php echo $fila['id']; ?>">✏️</a>
                    </td>
                </tr>
                <?php
            }
        ?>
    </table>
    <?php echo "<p>".$mensaje."</p>" ?>
</main>
<script src="js/vistas/administrador/borrar.js" type="module"></script>