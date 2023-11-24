<?php
/**
 * Página principal para la gestión de basura.
 *
 * PHP version 7.0
 *
 * @category Basura
 * @package  Gestión_Basura
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */
?>
<main id="gestorM">
    <a id="btnVolver" href="index.php?control=basura_con">Volver</a>
    <form action="index.php?control=basura_con&metodo=crear" method="POST">
        <label for="nombre">(*) Nombre:</label>
        <input type="text" name="nombre" placeholder="Nombre basura">
        <label for="valor">(*) Valor:</label>
        <input type="text" name="valor" placeholder="Puntuación">
        <label for="imagen">Imagen:</label>
        <input type="file" name="imagen">
        <img id="imagenMiniatura">
        <p id="msgCampos"></p>
        <input type="submit" value="Añadir basura">
    </form>
</main>
<script src="expresionesRegulares.js" type="module"></script>
