-- ************************************** `client`

CREATE TABLE `client`
(
 `id`        integer NOT NULL AUTO_INCREMENT,
 `full_name` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);

-- ************************************** `item`

CREATE TABLE `item`
(
 `id`    integer NOT NULL AUTO_INCREMENT,
 `title` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);

-- ************************************** `transaction`

CREATE TABLE `transaction`
(
 `id`        integer NOT NULL AUTO_INCREMENT,
 `timestamp` timestamp NOT NULL ,
 `client_id` integer NULL ,

PRIMARY KEY (`id`),
KEY `FK_16` (`client_id`),
CONSTRAINT `FK_14` FOREIGN KEY `FK_16` (`client_id`) REFERENCES `client` (`id`)
);

-- ************************************** `transaction_item`

CREATE TABLE `transaction_item`
(
 `id`             integer NOT NULL AUTO_INCREMENT,
 `count`          integer NOT NULL ,
 `item_id`        integer NOT NULL ,
 `transaction_id` integer NOT NULL ,

PRIMARY KEY (`id`),
KEY `FK_23` (`transaction_id`),
CONSTRAINT `FK_21` FOREIGN KEY `FK_23` (`transaction_id`) REFERENCES `transaction` (`id`),
KEY `FK_26` (`item_id`),
CONSTRAINT `FK_24` FOREIGN KEY `FK_26` (`item_id`) REFERENCES `item` (`id`)
);

