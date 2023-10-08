# Esquema
CREATE SCHEMA tebanilia;
USE tebanilia;

CREATE TABLE `tb_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tb_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productCode` varchar(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productDetail` varchar(255) DEFAULT NULL,
  `productPrice` decimal(10,2) NOT NULL,
  `productDescription` text NOT NULL,
  `productImage` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tb_products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tb_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO tb_categories
(categoryName, createdAt, updatedAt)
VALUES
('Aceites', now(), now()),
('Acetos', now(), now()),
('Aceitunas', now(), now());
  
INSERT INTO tb_products
(productCode,
productName,
productDetail,
productPrice,
productDescription,
productImage,
createdAt,
updatedAt,
category_id)
VALUES
('aceitem1',
'Blend Sabor Medio',
'Bivarietal Arbequina Picual',
1500.00,
'Es un aceite equilibrado y estable por su alto contenido en ácido oleico y concentración de polifenoles. Se destaca como cualidad la persistencia de su sabor, con un resultado en boca de ligero amargor picante. De aromas delicados, con notas herbáceas, de banana y frutos maduros.
Muy apropiado para potenciar sabores preparados en crudo, ensaladas y cualquier plato que requiera de un sabor intenso con ciertos aromas frutados.',
'1695593768064-973328627.png',
now(),
now(),
1),
('aceitei1',
'Blend Sabor Intenso',
'Bivarietal Arbequina Coratina',
1800.00,
'Aceite de notas verdes y frescas que remiten a los aromas del pasto cortado y la alfalfa. Su frutado se expresa con un suave perfume de manzanas verdes y plátanos. Ligero amargor y picor persistente, en boca se confirman las notas frescas y sutiles dejos de frutos secos.
Complemento perfecto para carnes rojas, quesos duros y pastas al pesto. Sugerencia gourmet: increíbles sensaciones cuando se lo marida con chocolate amargo o pan de membrillo.',
'1695593800266-297966683.png',
now(),
now(),
1),
('aceitea1',
'Apulia',
'Arauco Coratina Picual',
2100.00,
'De las bondades del olivo y su tenacidad, surge Apulia, un blend perfectamente estructurado y lleno de personalidad que incita al catador a recorrer una multitud de matices.
Su frutado se expresa con intensidad media en notas verdes y frutales: hierba recién cortada, alcaucil, almendra, manzana y plátano.
Su amargor y picor de intensidad media ofrecen una sensación de equilibrio que se funde con la frescura de la hierba y la fruta en un final de persistencia agradable.',
'1695594550682-755918895.png',
now(),
now(),
1),
('aceto1',
'Aceto Balsámico',
'Aceto Balsámico',
1400.00,
'Sutil combinación de vinagres y mosto de uva para evocar las fragancias y sabores que dan fama al aceto balsámico oriundo de Italia. Se perciben notas de sidra, vino y tomates secos. Su acidez, potente y ligera, se equilibra con un dulzor que regala dejos finales de café.
Ideal para aliñar ensaladas de hojas verdes, zanahoria y tomate, incluso macerar peras y manzanas. Es un perfecto complemento para las salsas agridulces que acompañan la carne asada.',
'1695592635950-437519013.png',
now(),
now(),
2),

('aceituna1',
'Aceitunas verdes',
'Premium 00 x460g VIDRIO',
1400.00,
'Aceituna entera.',
'1695586716545-848342786.png',
now(),
now(),
3);