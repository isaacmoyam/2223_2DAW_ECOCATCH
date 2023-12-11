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
    <form enctype="multipart/form-data" action="index.php?control=powerup_con&metodo=modificar" method="POST" id="formPowerup">
        <table id="tablaPowerup">
            <tr>
                <th>Nombre</th>
                <th>Aumento</th>
                <th>Descripcion</th>
                <th>Imagen</th>
                <th>Cambiar Imagen</th>
            </tr>
            <?php
            $obj = new $controlador();
            $datos = $obj->mostrar();

            // Iteración sobre los datos para mostrar en la tabla.
            foreach ($datos as $fila) {
                ?>
                <tr>
                    <td><input type="text" name="nombre[]" value="<?php echo $fila['nombre'];?>" placeholder="Nombre Powerup" maxlength="20"></td>
                    <td><input type="text" name="aumento[]" value="<?php echo $fila['aumento'];?>" placeholder="Aumento"></td>
                    <td><textarea name="descripcion[]" maxlength="300"><?php echo $fila['descripcion'];?></textarea>
                    <td><img src="data:image/png;base64,<?php echo $fila['imagen'];?>"></td>
                    <td>
                        <img class="imagenMiniatura[]">
                        <input type="file" name="imagen[]">
                    </td>
                    <input type="hidden" name="id[]" value="<?php echo $fila['id'];?>">
                    <input type="hidden" name="imagen_actual[]" value="<?php echo $fila['imagen'];?>" >
                </tr>
                <?php
            }
            ?>
        </table>
        <p id="msgCampos"></p>
        <input type="submit" value="Modificar Powerup">
        
    </form>
    <a id="botonPorDefecto" href="index.php?control=powerup_con&metodo=restarurarValoresPowerup">Restaurar valores por defecto</a>
    <?php echo "<p>".$mensaje."</p>" ?>
</main>
