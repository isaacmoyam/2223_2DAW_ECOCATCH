<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../css/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Modificar basura</title>
    </head>
    <body>
        <div id="logo">
            <img src="../img/logo.png">
        </div>
        <div id="gestorM">
            <a href="gestionbasura.php">Volver</a>
            <form action="../../src/index.php?control=Basura_Con&metodo=modificar">
                <label for="nombre">Nombre:</label>
                <input type="text" name="nombre" value="Basura1" placeholder="Nombre basura">
                <label for="valor">Valor:</label>
                <input type="text" name="valor" value="4" placeholder="Puntuación">
                <label for="imagen">Imagen:</label>
                <input type="file" name="imagen">
                <input type="submit" value="Guardar cambios">
            </form>

            <?php
                require_once ('../../src/index.php');
                $fila = modificar();
                echo $fila['nombre'].''.$fila['nombreImagen'].''.$fila['valor'];
                // echo '
                // <form action="../../src/index.php?control=Basura_Con&metodo=modificar&ruta='.$rutaActual.'" method="POST">
                //     <label for="nombre">Nombre:</label>
                //     <input type="text" name="nombre" value="'.$fila['nombre'].'" placeholder="Nombre basura">
                //     <label for="valor">Valor:</label>
                //     <input type="text" name="valor" value="'.$fila['valor'].'" placeholder="Puntuación">
                //     <label for="imagen">Imagen:</label>
                //     <input type="file" name="imagen" value="'.$fila['nombreImagen'].'">
                //     <input type="submit" value="Guardar cambios">
                // </form>
                // ';
            ?>
        </div>
    </body>
</html>