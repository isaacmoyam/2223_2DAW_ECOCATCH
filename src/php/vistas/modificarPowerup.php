<main id="gestor">
    <a id="btnVolver" href="index.php?control=powerup_con">Volver</a>
    <?php
    $fila = $datosVista["datos"];
    ?>
    <form action="index.php?control=powerup_con&metodo=modificar&id=<?php echo $fila['id'];?>" method="POST" id="formPowerup">
        <label>(*) Nombre:</label>
        <input type="text" name="nombre" value="<?php echo $fila['nombre'];?>" placeholder="Nombre Powerup">
        <label>(*) Aumento:</label>
        <input type="text" name="aumento" value="<?php echo $fila['aumento'];?>" placeholder="Aumento">
        <label>Imagen:</label>
        <input type="file" name="imagen" value="<?php echo $fila['nombreImagen'];?>">
        <label>Descripción:</label>
        <input type="text" name="descripcion" value="<?php echo $fila['descripcion'];?>">
        <img id="imagenMiniatura">
        <p id="msgCampos"></p>
        <input type="submit" value="Modificar Powerup">
    </form>
</main>
<?php
