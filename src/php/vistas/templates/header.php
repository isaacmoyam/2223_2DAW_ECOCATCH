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
        <link rel="stylesheet" href="css/styleAdmin.css">
        <link rel="stylesheet" href="css/hamburgers.css">
        <link rel="stylesheet" href="css/menu.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $controlador->pagina ?></title>
    </head>
    <body>
    <header>
        <img src="img/logo.png" alt="Logo de la aplicación"><br>
        <input class="side-menu" type="checkbox" id="side-menu"/>
        <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>
        <nav class="nav">
            <ul class="menu">
                <li><a href="index.php">Inicio</a></li>
                <li><a href="index.php?control=nivel_con">Niveles</a></li>
                <li><a href="index.php?control=basura_con">Basura</a></li>
                <li><a href="#">PowerUp</a></li>
            </ul>
        </nav>
    </header>

