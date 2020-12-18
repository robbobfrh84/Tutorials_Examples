CREATE DATABASE jurassic_park;
USE jurassic_park;

CREATE TABLE actors (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  scenes int NOT NULL,
  role varchar(60) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO actors (name, scenes, role) VALUES ("Dr. Grant", 12, "Lead");
INSERT INTO actors (name, scenes, role) VALUES ("Nedrey", 4, "Villian");
INSERT INTO actors (name, scenes, role) VALUES ("Lex", 8, "Support");
INSERT INTO actors (name, scenes, role) VALUES ("Malcome", 7, "Support");
