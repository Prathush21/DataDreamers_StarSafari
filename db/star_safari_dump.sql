BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "vehicle" (
	"vehicle_id"	TEXT NOT NULL,
	"row_count"	INTEGER,
	"column_count"	INTEGER,
	PRIMARY KEY("vehicle_id")
);
CREATE TABLE IF NOT EXISTS "planet" (
	"planet_id"	TEXT NOT NULL,
	"planet_name"	TEXT,
	"culture"	TEXT,
	"climate"	TEXT,
	"top_tourist_attraction"	TEXT,
	"image"	BLOB,
	"culture_image"	BLOB,
	"climate_image"	BLOB,
	"top_tourist_attraction_image"	BLOB,
	PRIMARY KEY("planet_id")
);
CREATE TABLE IF NOT EXISTS "trip" (
	"trip_id"	TEXT NOT NULL,
	"vehicle_id"	TEXT,
	"price"	REAL,
	"departure_planet_id"	TEXT,
	"destination_planet_id"	TEXT,
	"departure_datetime"	TEXT,
	"trip_facilities"	TEXT,
	"passenger_count"	INTEGER,
	FOREIGN KEY("vehicle_id") REFERENCES "vehicle"("vehicle_id"),
	FOREIGN KEY("departure_planet_id") REFERENCES "planet"("planet_id"),
	FOREIGN KEY("destination_planet_id") REFERENCES "planet"("planet_id"),
	PRIMARY KEY("trip_id")
);
CREATE TABLE IF NOT EXISTS "user" (
	"user_id"	INTEGER NOT NULL,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"address"	TEXT,
	"contact_number"	TEXT,
	PRIMARY KEY("user_id")
);
CREATE TABLE IF NOT EXISTS "booking" (
	"booking_id"	TEXT NOT NULL,
	"user_id"	INTEGER,
	"trip_id"	TEXT,
	"is_paid"	INTEGER DEFAULT 0,
	"traveller_count"	INTEGER,
	"status"	TEXT,
	"total_amount"	REAL,
	FOREIGN KEY("trip_id") REFERENCES "trip"("trip_id"),
	FOREIGN KEY("user_id") REFERENCES "user"("user_id"),
	PRIMARY KEY("booking_id")
);
CREATE TABLE IF NOT EXISTS "passenger" (
	"passport_number"	TEXT NOT NULL,
	"booking_id"	TEXT,
	"name"	TEXT,
	"seat_id"	TEXT,
	FOREIGN KEY("booking_id") REFERENCES "booking"("booking_id"),
	PRIMARY KEY("passport_number","booking_id")
);

-- INSERT INTO "planet" ("planet_id","planet_name","culture","climate","top_tourist_attraction","image","culture_image","climate_image","top_tourist_attraction_image") VALUES ('P2','Venus',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
--  ('P3','Earth',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
--  ('P4','Mars',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
--  ('P5','Jupiter',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
--  ('P6','Saturn',NULL,NULL,NULL,NULL,NULL,NULL,NULL);



INSERT INTO "user" ("user_id", "first_name", "last_name", "address", "contact_number")
VALUES
    (1, 'Ravi', 'Silva', '123 Galle Rd, Colombo', '+94 77 123 4567'),
    (2, 'Saman', 'Perera', '456 Kandy Rd, Kandy', '+94 76 234 5678'),
    (3, 'Kamala', 'Fernando', '789 Negombo Rd, Negombo', '+94 71 345 6789'),
    (4, 'Malini', 'Jayawardena', '101 Anuradhapura Rd, Anuradhapura', '+94 72 456 7890'),
    (5, 'Nimal', 'Ratnayake', '202 Matara Rd, Matara', '+94 70 567 8901');


INSERT INTO "planet" (
    "planet_id", 
    "planet_name", 
    "culture", 
    "climate", 
    "top_tourist_attraction", 
    "image", 
    "culture_image", 
    "climate_image", 
    "top_tourist_attraction_image"
) VALUES
    ('P2', 'Venus', 'Venusian culture is shrouded in mystery and speculation.', 'Venus experiences extreme heat and a toxic atmosphere.', 'The enigmatic volcanic activity of Venus is a top sight to explore.', NULL, NULL, NULL, NULL),
    ('P3', 'Earth', 'Earth boasts a rich tapestry of diverse cultures, languages, and traditions.', 'Earths climate ranges from polar ice caps to tropical rainforests.', 'The iconic Eiffel Tower in Paris is a world-renowned landmark.', NULL, NULL, NULL, NULL),
    ('P4', 'Mars', 'Marsian culture has captured human imagination as a potential home for exploration.', 'Mars features a cold and arid climate with dusty landscapes.', 'Olympus Mons, the tallest volcano in the solar system, is a marvel to behold.', NULL, NULL, NULL, NULL),
    ('P5', 'Jupiter', 'Jovian culture remains speculative due to its inhospitable environment.', 'Jupiter is a gas giant with tumultuous storms and a lack of solid surface.', 'The massive Great Red Spot is a swirling storm that captivates astronomers.', NULL, NULL, NULL, NULL),
    ('P6', 'Saturn', 'Saturnian culture is a fascination with its unique ring system and beauty.', 'Saturns climate is defined by its rings and features extreme cold.', 'The stunning rings of Saturn provide an iconic and breathtaking view.', NULL, NULL, NULL, NULL),
    ('P7', 'Uranus', 'Uranian culture remains a mystery due to its distance and harsh conditions.', 'Uranus has frigid icy winds and unique rotational axis.', 'Uranus tilted axis and its moons make for an intriguing study.', NULL, NULL, NULL, NULL),
    ('P8', 'Neptune', 'Neptunian culture is speculative due to its remote location and harsh climate.', 'Neptune boasts violent storms and a turbulent atmosphere.', 'The Great Dark Spot is a fascinating feature of Neptunes tumultuous weather.', NULL, NULL, NULL, NULL);


INSERT INTO "vehicle" ("vehicle_id", "row_count", "column_count")
VALUES
    ('v1', 6, 5),
    ('v2', 7, 4),
    ('v3', 8, 4),
    ('v4', 5, 6),
    ('v5', 6, 6),
    ('v6', 7, 5),
    ('v7', 8, 5),
    ('v8', 7, 7),
    ('v9', 6, 8),
    ('v10', 8, 6);


INSERT INTO "trip" (
    "trip_id", 
    "vehicle_id", 
    "departure_planet_id", 
    "destination_planet_id", 
    "price", 
    "departure_datetime", 
    "trip_facilities", 
    "passenger_count"
) VALUES
    ('T1', 'v1', 'P3', 'P4', 250.0, '2023-09-01 10:00:00', 'Wi-Fi, Snacks', 15),
    ('T2', 'v2', 'P3', 'P5', 350.0, '2023-09-02 14:30:00', 'Entertainment System', 25),
    ('T3', 'v3', 'P3', 'P6', 300.0, '2023-09-03 12:45:00', 'Refreshments', 8),
    ('T4', 'v4', 'P3', 'P4', 200.0, '2023-09-04 08:15:00', 'Wi-Fi', 10),
    ('T5', 'v5', 'P3', 'P5', 400.0, '2023-09-05 09:30:00', 'Entertainment, Snacks', 15);


INSERT INTO "booking" (
    "booking_id", 
    "user_id", 
    "trip_id", 
    "is_paid", 
    "traveller_count", 
    "status", 
    "total_amount"
) VALUES
    ('B21', 1, 'T1', 1, 10, 'Upcoming', 2500.0),
    ('B22', 2, 'T1', 1, 5, 'Upcoming', 1250.0),
    ('B23', 3, 'T2', 1, 10, 'Upcoming', 3500.0),
    ('B24', 4, 'T2', 1, 10, 'Upcoming', 3500.0),
    ('B25', 5, 'T2', 1, 5, 'Upcoming', 1750.0),
    ('B26', 1, 'T3', 1, 2, 'Upcoming', 600.0),
    ('B27', 2, 'T3', 1, 2, 'Upcoming', 600.0),
    ('B28', 3, 'T3', 1, 2, 'Upcoming', 600.0),
    ('B29', 4, 'T3', 1, 2, 'Upcoming', 600.0),
    ('B30', 1, 'T4', 1, 2, 'Upcoming', 400.0),
    ('B31', 2, 'T4', 1, 2, 'Upcoming', 400.0),
    ('B32', 3, 'T4', 1, 2, 'Upcoming', 400.0),
    ('B33', 4, 'T4', 1, 2, 'Upcoming', 400.0),
    ('B34', 5, 'T4', 1, 2, 'Upcoming', 400.0),
    ('B35', 1, 'T5', 1, 10, 'Upcoming', 4000.0),
    ('B36', 2, 'T5', 1, 3, 'Upcoming', 1200.0),
    ('B37', 3, 'T5', 1, 2, 'Upcoming', 800.0);


INSERT INTO "passenger" (
    "passport_number",
    "booking_id",
    "name",
    "seat_id"
) VALUES
    ('P12345', 'B21', 'John Doe', 'A1'),
    ('P67890', 'B21', 'Jane Doe', 'A2'),
    ('P24681', 'B21', 'David Smith', 'B1'),
    ('P13580', 'B21', 'Sophia Johnson', 'B2'),
    ('P98766', 'B21', 'Michael Brown', 'C1'),
    ('P54322', 'B21', 'Emma Wilson', 'C2'),
    ('P86421', 'B21', 'Matthew Taylor', 'D1'),
    ('P35988', 'B21', 'Isabella Davis', 'D2'),
    ('P79124', 'B21', 'Ethan Martinez', 'E1'),
    ('P80247', 'B21', 'Olivia Anderson', 'E2'),
	('P12345', 'B22', 'John Doe', 'A1'),
    ('P67890', 'B22', 'Jane Doe', 'A2'),
    ('P24681', 'B22', 'David Smith', 'B1'),
    ('P13580', 'B22', 'Sophia Johnson', 'B2'),
    ('P98766', 'B22', 'Michael Brown', 'C1'),
	('P12345', 'B23', 'John Doe', 'A1'),
    ('P67890', 'B23', 'Jane Doe', 'A2'),
    ('P24681', 'B23', 'David Smith', 'B1'),
    ('P13580', 'B23', 'Sophia Johnson', 'B2'),
    ('P98766', 'B23', 'Michael Brown', 'C1'),
    ('P54322', 'B23', 'Emma Wilson', 'C2'),
    ('P86421', 'B23', 'Matthew Taylor', 'D1'),
    ('P35988', 'B23', 'Isabella Davis', 'D2'),
    ('P79124', 'B23', 'Ethan Martinez', 'E1'),
    ('P80247', 'B23', 'Olivia Anderson', 'E2'),
	('P12345', 'B24', 'John Doe', 'A1'),
    ('P67890', 'B24', 'Jane Doe', 'A2'),
    ('P24681', 'B24', 'David Smith', 'B1'),
    ('P13580', 'B24', 'Sophia Johnson', 'B2'),
    ('P98766', 'B24', 'Michael Brown', 'C1'),
    ('P54322', 'B24', 'Emma Wilson', 'C2'),
    ('P86421', 'B24', 'Matthew Taylor', 'D1'),
    ('P35988', 'B24', 'Isabella Davis', 'D2'),
    ('P79124', 'B24', 'Ethan Martinez', 'E1'),
    ('P80247', 'B24', 'Olivia Anderson', 'E2'),
	('P12345', 'B25', 'Aruna Raman', 'A1'),
    ('P67890', 'B25', 'Karthik Balaji', 'A2'),
    ('P24681', 'B25', 'Devi Rajan', 'B1'),
    ('P13580', 'B25', 'Meera Venkatesh', 'B2'),
    ('P98766', 'B25', 'Rajesh Krishnan', 'C1'),
	('P12345', 'B26', 'Aruna Raman', 'A1'),
    ('P67890', 'B26', 'Karthik Balaji', 'A2'),
	('P24681', 'B27', 'Devi Rajan', 'B1'),
    ('P13580', 'B27', 'Meera Venkatesh', 'B2'),
	('P98766', 'B28', 'Rajesh Krishnan', 'C1'),
    ('P54322', 'B28', 'Saranya Suresh', 'C2'),
	('P86421', 'B29', 'Matthew Taylor', 'D1'),
    ('P35988', 'B29', 'Isabella Davis', 'D2'),
	('P12345', 'B30', 'Aruna Raman', 'A1'),
    ('P67890', 'B30', 'Karthik Balaji', 'A2'),
    ('P24681', 'B31', 'Devi Rajan', 'B1'),
    ('P13580', 'B31', 'Meera Venkatesh', 'B2'),
    ('P98766', 'B32', 'Rajesh Krishnan', 'C1'),
    ('P54322', 'B32', 'Saranya Suresh', 'C2'),
    ('P86421', 'B33', 'Matthew Taylor', 'D1'),
    ('P35988', 'B33', 'Isabella Davis', 'D2'),
    ('P79124', 'B34', 'Ethan Martinez', 'E1'),
    ('P80247', 'B34', 'Olivia Anderson', 'E2'),
    ('P12345', 'B35', 'Aruna Raman', 'A1'),
    ('P67890', 'B35', 'Karthik Balaji', 'A2'),
    ('P24681', 'B35', 'Devi Rajan', 'B1'),
    ('P13580', 'B35', 'Meera Venkatesh', 'B2'),
    ('P98766', 'B35', 'Rajesh Krishnan', 'C1'),
    ('P54322', 'B35', 'Saranya Suresh', 'C2'),
    ('P86421', 'B35', 'Matthew Taylor', 'D1'),
    ('P35988', 'B35', 'Isabella Davis', 'D2'),
    ('P79124', 'B35', 'Ethan Martinez', 'E1'),
    ('P80247', 'B35', 'Olivia Anderson', 'E2'),
    ('P86421', 'B36', 'Matthew Taylor', 'A1'),
    ('P35988', 'B36', 'Isabella Davis', 'A2'),
    ('P79124', 'B36', 'Ethan Martinez', 'B1'),
    ('P80247', 'B37', 'Olivia Anderson', 'A1'),
    ('P45678', 'B37', 'Arjun Raj', 'A2');
COMMIT;
