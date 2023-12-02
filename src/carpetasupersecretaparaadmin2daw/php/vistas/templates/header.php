<?php
/**
 * Cabecera para las vistas que llama el controlador en Index.
 *
 * PHP version 8.2
 *
 * @category Header
 * @package  Header
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../css/styleAdmin.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $controlador->pagina ?></title>
    </head>
    <body>
        <header>
            <img src="../img/logo.png" alt="Logo de la aplicación">
        </header>
