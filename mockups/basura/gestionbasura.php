<?php
/**
 * Página principal para la gestión de basura.
 *
 * PHP version 7.4.3
 *
 * @category Basura
 * @package  Gestión_Basura
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

// Verificación de parámetro 'mensaje' en la URL para mostrar mensajes.
if (!isset($_GET['mensaje']) || empty($_GET['mensaje'])) {
    // No hay mensaje, no se muestra nada.
} else {
    // Se verifica si el mensaje es verdadero o falso y se muestra en consecuencia.
    if ($_GET['mensaje'] == true) {
        echo 'Todo ha salido correctamente';
    } else {
        echo 'Algo ha salido mal';
    }
}

// Sección HTML para la interfaz de gestión de basura.
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../css/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gestión de basura</title>
    </head>
    <body>
        <header>
            <img src="../img/logo.png" alt="Logo de la aplicación">
        </header>
        <main id="gestor">
            <h1>Basura</h1>
            <a href="anadir.html">+</a>
            <a href="">Volver</a>
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Valor</th>
                    <th>Imagen</th>
                    <th>Opción</th>
                </tr>
                <?php
                // Inclusión del controlador de basura y obtención de datos.
                require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/controladores/basura_con.php');
                $obj = new Basura_Con();
                $datos = $obj->mostrar();

                // Iteración sobre los datos para mostrar en la tabla.
                foreach ($datos as $fila) {
                    ?>
                    <tr>
                        <td><?php echo $fila['nombre']; ?></td>
                        <td><?php echo $fila['valor']; ?></td>
                        <td><?php echo $fila['nombreImagen']; ?></td>
                        <td>
                            <a href="../../src/index.php?control=Basura&metodo=borrar&id=<?php echo $fila['id']; ?>">🗑️</a>
                            <a href="../../src/index.php?control=Basura&metodo=buscarModificar&id=<?php echo $fila['id']; ?>">✏️</a>
                        </td>
                    </tr>
                    <?php
                }
                ?>
            </table>
        </main>
        <script src="expresionesRegulares.js" type="module"></script>
    </body>
</html>