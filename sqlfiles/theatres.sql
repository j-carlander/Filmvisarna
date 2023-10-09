INSERT INTO theatres (name)
VALUES ("Lilla Visaren"),
("Stora Visaren");

INSERT INTO theatrerows (rownumber, numberofseats, theatreid)
VALUES (1,8,(SELECT id FROM theatres WHERE name = "Stora Visaren")),
(2,9,(SELECT id FROM theatres WHERE name = "Stora Visaren")),
(3,10,(SELECT id FROM theatres WHERE name = "Stora Visaren")),
(4,10,(SELECT id FROM theatres WHERE name = "Stora Visaren")),
(5,10,(SELECT id FROM theatres WHERE name = "Stora Visaren")),
(6,10,(SELECT id FROM theatres WHERE name = "Stora Visaren")),
(7,12,(SELECT id FROM theatres WHERE name = "Stora Visaren")),
(8,12,(SELECT id FROM theatres WHERE name = "Stora Visaren")),
(1,6,(SELECT id FROM theatres WHERE name = "Lilla Visaren")),
(2,8,(SELECT id FROM theatres WHERE name = "Lilla Visaren")),
(3,9,(SELECT id FROM theatres WHERE name = "Lilla Visaren")),
(4,10,(SELECT id FROM theatres WHERE name = "Lilla Visaren")),
(5,10,(SELECT id FROM theatres WHERE name = "Lilla Visaren")),
(6,12,(SELECT id FROM theatres WHERE name = "Lilla Visaren"));


