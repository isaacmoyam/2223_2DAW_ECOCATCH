<?php
/**
 * Página para la modificación de la información de nivel.
 *
 * PHP version 8.2
 *
 * @category Nivel
 * @package  Gestión_Nivel
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

// Sección HTML para la interfaz de modificación de nivel.
?>
<main id="gestionNiveles">
    <?php
        $fila = $datosVista["datos"];
    ?>
    <h1>Configuración nivel</h1>
    <form action="index.php?control=nivel_con&metodo=modificarNivelMensaje&id=<?php echo $fila['id'];?>" method="POST">
        <label for="nombre">(*) Nombre:</label>
        <input type="text" name="nombre" value="<?php echo $fila['nombre'];?>" placeholder="Nombre nivel">
        <label for="valor">(*) Items:</label>
        <input type="text" name="cantidadItems" value="<?php echo $fila['cantidadItems'];?>" placeholder="Cantidad de items">
        <label for="imagen">(*) Velocidad:</label>
        <input type="text" name="velocidadBarco" value="<?php echo $fila['velocidadBarco'];?>" placeholder="Velocidad del barco">
        <h1>Mensajes</h1>
        <table id="tablaDinamica">
            <thead>
                <tr>
                    <th>Contenido</th>
                    <th>Puntos Requeridos</th>
                    <th>Tipo</th>
                    <th>Opción</th>
                </tr>
            </thead>          
            <tbody>
                <?php
                    $obj = new $controlador;
                    $datos = $obj->mostrarMensajes();

                    // Iteración sobre los datos para mostrar en la tabla.
                    foreach ($datos as $mensaje) {
                        ?>
                        <tr>
                            <input name="idMsg[]" type="hidden"value="<?php echo $mensaje['id']; ?>">
                            <td><input name="contenido[]" type="text" value="<?php echo $mensaje['contenido']; ?>"></td>
                            <td><input name="puntosHasta[]" type="text" value="<?php echo $mensaje['puntosHasta']; ?>"></td>
                            <td>
                            <select name="tipo[]">
                                <option value="A" <?php echo ($mensaje['tipo'] == 'A') ? 'selected' : ''; ?>>Antes del nivel</option>
                                <option value="B" <?php echo ($mensaje['tipo'] == 'B') ? 'selected' : ''; ?>>Durante el nivel</option>
                                <option value="C" <?php echo ($mensaje['tipo'] == 'C') ? 'selected' : ''; ?>>Después del nivel</option>
                            </select>
                            </td>
                            <td>
                                <a id="botonBorrar" href="index.php?control=nivel_con&metodo=borrarMensaje&idNivel=<?php echo $fila['id']; ?>&id=<?php echo $mensaje['id']; ?>">🗑️</a>
                                <a href="index.php?control=nivel_con&metodo=buscarMensaje&idNivel=<?php echo $fila['id']; ?>&id=<?php echo $mensaje['id']; ?>">🔄</a>
                            </td>
                        </tr>
                        <?php
                    }
                ?>
            </tbody>
        </table>
        <button type="button" id="btnAgregarFila">Agregar mensaje</button>
        <input type="submit" value="Guardar cambios">
    </form>
</main>
<script src="js/vistas/administrador/preguntarborrar.js" type="module"></script>
<script src="js/vistas/administrador/tablamensajes.js" type="module"></script>

