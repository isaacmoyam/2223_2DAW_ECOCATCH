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
            <th>Opción</th>
            <th>Nombre</th>
            <th>Aumento</th>
            <th>Imagen</th>
            <th>Descripcion</th>
        </tr>
        <?php
        $obj = new $controlador();
        $datos = $obj->mostrar();

        // Iteración sobre los datos para mostrar en la tabla.
        foreach ($datos as $fila) {
            ?>
            <tr>
                <td>
                    <a href="index.php?control=powerup_con&metodo=buscarModificar&id=<?php echo $fila['id']; ?>">✏️</a>
                </td>
                <td><?php echo $fila['nombre']; ?></td>
                <td><?php echo $fila['aumento']; ?></td>
                <td><img src="data:image/png;base64,<?php echo $fila['imagen'];?>"></td>
                <td><?php echo $fila['descripcion']; ?></td>
            </tr>
            <?php
        }
        ?>
    </table>
    <button>Restaurar de fábrica</button>
    <?php echo "<p>".$mensaje."</p>" ?>
</main>
