<main id="gestorM">
    <h1>Añadir nivel</h1>
    <a id="btnVolver" href="index.php?control=nivel_con">Volver</a>
    <form action="index.php?control=nivel_con&metodo=crear" method="POST">
        <label for="nombre">(*) Nombre:</label>
        <input type="text" name="nombre" placeholder="Nombre nivel">
        <label for="valor">(*) Items:</label>
        <input type="text" name="cantidadItems" placeholder="Cantidad de items">
        <label for="imagen">(*) Velocidad:</label>
        <input type="text" name="velocidadBarco" placeholder="Velocidad del barco">
        <p id="msgCampos"></p>
        <h1>Añadir mensaje</h1>
        <table id="tablaDinamica">
            <thead>
                <tr>
                    <th></th>
                    <th>Contenido</th>
                    <th>Puntos Requeridos</th>
                    <th>Tipo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><input name="contenido[]" type="text" placeholder="Contenido del mensaje"></td>
                    <td><input name="puntosHasta[]" type="text" placeholder="Puntos requeridos"></td>
                    <td><input name="tipo[]" type="text" placeholder="Aparición"></td>
                </tr>
            </tbody>
            </table>
            <button type="button" id="btnAgregarFila">Agregar Fila</button>
        <input type="submit" value="Añadir nivel">
    </form>
</main>
<script src="js/controladores/controladorAdmin.js" type="module"></script>