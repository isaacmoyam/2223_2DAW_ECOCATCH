<main id="gestor">
    <h1>Modificación Powerup</h1>
    <?php
    $fila = $datosVista["datos"];
    ?>
    <!--enctype="multipart/form-data" es para que se pueda pasar el FILE -->
    <form enctype="multipart/form-data" action="index.php?control=powerup_con&metodo=modificar&id=<?php echo $fila['id'];?>" method="POST" id="formPowerup">
        <label>(*) Nombre:</label>
        <input type="text" name="nombre" value="<?php echo $fila['nombre'];?>" placeholder="Nombre Powerup">
        <label>(*) Aumento:</label>
        <input type="text" name="aumento" value="<?php echo $fila['aumento'];?>" placeholder="Aumento">
        <label>(*) Imagen:</label>
        <input type="file" name="imagen">
        <label>Descripción:</label>
        <input type="text" name="descripcion" value="<?php echo $fila['descripcion'];?>">
        <label>Imagen Actual:</label>
        <img src="data:image/png;base64,<?php echo $fila['imagen'];?>" alt="Imagen Actual">
        <img id="imagenMiniatura">
        <p id="msgCampos"></p>
        <input type="submit" value="Modificar Powerup">
    </form>
</main>
<?php
