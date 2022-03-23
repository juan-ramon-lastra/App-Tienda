INSERT INTO clientes (nombre, apellidos, email) VALUES ('Juan','Gonzalez Perez','jgp@email.com');
INSERT INTO clientes (nombre, apellidos, email) VALUES ('Rosa','Martinez Lopez','rml@email.com');
INSERT INTO clientes (nombre, apellidos, email) VALUES ('Pepe','Alvarez Gonzalez','pag@email.com');
INSERT INTO clientes (nombre, apellidos, email) VALUES ('Maria','Rodriguez Arias','mra@email.com');
INSERT INTO clientes (nombre, apellidos, email) VALUES ('Angela','Perez Lopez','apl@email.com');

INSERT INTO compras (cliente_id, fecha_compra) VALUES (1, '2005-11-12');
INSERT INTO compras (cliente_id, fecha_compra) VALUES (1, '2014-12-05');
INSERT INTO compras (cliente_id, fecha_compra) VALUES (3, '2017-07-07');
INSERT INTO compras (cliente_id, fecha_compra) VALUES (3, '2001-05-11');
INSERT INTO compras (cliente_id, fecha_compra) VALUES (5, '2000-08-10');

INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('iPhone 13','Smartphone de ultima generacion','Apple',1000,1);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Zapatillas','Zapatillas running','Asics',85.50,1);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Chaqueta','Una chaqueta manga larga','Nike',74.95,2);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Ordenador','Un ordenador portatil','Apple',2500,2);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Pantalón','Un pantalon vaquero','Levis',60,3,3);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Pelota','Un balon de futbol','Adidas',15.50,3);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Television','Smart TV 32 pulgadas','LG',240,4);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Ordenador','Un ordenador portatil','MSI',2350,4);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Chandal','Un chandal deportivo','Adidas',95.75,5);
INSERT INTO productos (nombre,descripcion,marca,precio,compra_id) VALUES ('Television','Smart TV 4K 50 pulgadas','Samsung',1250,5);

INSERT INTO usuarios (username, password, enabled) VALUES ('juan', '$2a$10$yeqoMjvycPuJCTPkBpRDkuayucBeU60gLMJJiJ4T2H4WUF/kiQTMe', 1);
INSERT INTO usuarios (username, password, enabled) VALUES ('admin', '$2a$10$ICI0GPO8S2v1kz9ti3nsqO6chteolicAUWA1VDkTXFp5Cp2sbfxsi', 1);

INSERT INTO roles (nombre) VALUES ('ROLE_USER');
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (1, 1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2, 2);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2, 1);


