-- Creación de la tabla "nivel"
CREATE TABLE nivel(
    id tinyint unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    cantidadItems tinyint unsigned NOT NULL,
    velocidadBarco tinyint unsigned NOT NULL
)ENGINE=InnoDB;

-- Creación de la tabla "partida"
CREATE TABLE partida(
    id int unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    correo varchar(100) NULL,
    puntuacion smallint unsigned NOT NULL,
    idNivel tinyint unsigned NOT NULL,
    CONSTRAINT nivelEnPartida FOREIGN KEY (idNivel) REFERENCES nivel(id)
)ENGINE=InnoDB;

-- Creación de la tabla "mensaje"
CREATE TABLE mensaje(
    id tinyint unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo char(1) NOT NULL,
    contenido varchar(500) NOT NULL,
    puntosHasta smallint unsigned NOT NULL,
    idNivel tinyint unsigned NOT NULL,
    CONSTRAINT nivelEnMensaje FOREIGN KEY (idNivel) REFERENCES nivel(id) ON DELETE CASCADE
)ENGINE=InnoDB;

-- Creación de la tabla "item"
CREATE TABLE item(
    id tinyint unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(20) NOT NULL,
    nombreImagen varchar(30) NOT NULL
)ENGINE=InnoDB;

-- Creación de la tabla "basura" con la columna "valor"
CREATE TABLE basura(
    id tinyint unsigned NOT NULL PRIMARY KEY,
    valor tinyint unsigned NOT NULL,
    CONSTRAINT itemEnBasura FOREIGN KEY (id) REFERENCES item(id) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=InnoDB;

-- Creación de la tabla "aumento" (supongo que es lo que deseas llamar a esta tabla)
CREATE TABLE powerup(
    id tinyint unsigned NOT NULL PRIMARY KEY,
    aumento tinyint unsigned NOT NULL,
    CONSTRAINT itemEnPowerup FOREIGN KEY (id) REFERENCES item(id) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=InnoDB;
