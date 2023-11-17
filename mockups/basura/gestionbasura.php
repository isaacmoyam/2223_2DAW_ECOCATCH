<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../css/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gestión de basura</title>
    </head>
    <body>
        <div id="logo">
            <img src="../img/logo.png">
        </div>
        <div id="gestor">
            <h1>Basura</h1>
            <a href="anadir.html">+</a>
            <a href="">Volver</a>
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Valor</th>
                    <th>Imagen</th>
                    <th></th>
                </tr>
                <tr>
                <?php 
                    require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/controladores/basura_con.php');
                    $obj = new Basura_Con();
                    $datos = $obj->mostrar();

                    foreach ($datos as $fila){
                ?>
                    <tr>
                    <td><?php echo $fila['nombre'];?></td>
                    <td><?php echo $fila['valor'];?></td>
                    <td><?php echo $fila['nombreImagen'];?></td>
                    <td>
                    <a href="../../src/index.php?control=Basura_Con&metodo=borrar&id=<?php echo $fila['id']?>">🗑️</a>
                    <a href="modificar.php?control=Basura_Con&metodo=buscarModificar&id=<?php echo $fila['id']?>">✏️</a>
                    </td>
                    </tr>
                    <?php
                    }
                ?>
                </tr>
            </table>
        </div>
        <script src="expresionesRegulares.js" type="module"></script>
    </body>
</html>