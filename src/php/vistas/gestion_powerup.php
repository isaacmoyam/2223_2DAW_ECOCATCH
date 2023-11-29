<?php
/**
 * Página principal para la gestión de powerup.
 *
 * PHP version 8.2
 *
 * @category PowerUp
 * @package  Gestión_Basura
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

// Sección HTML para la interfaz de gestión de powerup.
?>
<main id="gestor">
    <h1>PowerUps</h1>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Aumento</th>
            <th>Nombre Imagen</th>
            <th>Descripcion</th>
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
                <td><?php echo $fila['aumento']; ?></td>
                <td><?php echo $fila['nombreImagen']; ?></td>
                <td><?php echo $fila['descripcion']; ?></td>
                <td>
                    <a href="index.php?control=powerup_con&metodo=buscarModificar&id=<?php echo $fila['id']; ?>">✏️</a>
                </td>
            </tr>
            <?php
        }
        ?>
    </table>
    <?php echo "<p>".$mensaje."</p>" ?>
</main>
