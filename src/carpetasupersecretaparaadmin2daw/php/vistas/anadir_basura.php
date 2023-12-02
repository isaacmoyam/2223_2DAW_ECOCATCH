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
?>
<main id="gestorM">
    <form enctype="multipart/form-data" action="index.php?control=basura_con&metodo=crear" method="POST" id="formBasura">
        <label for="nombre">(*) Nombre:</label>
        <input type="text" name="nombre" placeholder="Nombre basura">
        <label for="valor">(*) Valor:</label>
        <input type="text" name="valor" placeholder="Puntuación">
        <label for="imagen">Imagen:</label>
        <input type="file" name="imagen">
        <img id="imagenMiniatura">
        <p id="msgCampos"></p>
        <input type="submit" value="Añadir basura"><a id="btnVolver" href="index.php?control=basura_con">Cancelar</a>
    </form>
</main>
<script src="js/vistas/administrador/vistaanadirbasura.js" type="module"></script>
