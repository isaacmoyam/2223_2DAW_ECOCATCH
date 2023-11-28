<main id="gestor">
    <a id="btnVolver" href="index.php?control=powerup_con">Volver</a>
    <form action="" method="POST" id="formPowerup">
        <label>(*) Nombre:</label>
        <input type="text" name="nombre" placeholder="Nombre Powerup">
        <label>(*) Aumento:</label>
        <input type="text" name="valor" placeholder="Aumento">
        <label>Imagen:</label>
        <input type="file" name="imagen">
        <label>Descripción:</label>
        <input type="text" name="imagen">
        <img id="imagenMiniatura">
        <p id="msgCampos"></p>
        <input type="submit" value="Modificar Powerup">
    </form>
</main>
<?php
