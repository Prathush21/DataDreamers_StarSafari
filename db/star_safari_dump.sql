BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "vehicle" (
	"vehicle_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"vehicle_name" TEXT,
	"vehicle_image" TEXT,
	"row_count"	INTEGER,
	"column_count"	INTEGER
);
CREATE TABLE IF NOT EXISTS "planet" (
	"planet_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"planet_name"	TEXT,
	"culture"	TEXT,
	"climate"	TEXT,
	"top_tourist_attraction"	TEXT,
	"image"	TEXT,
	"culture_image"	TEXT,
	"climate_image"	TEXT,
	"top_tourist_attraction_image"	TEXT
);
CREATE TABLE IF NOT EXISTS "trip" (
	"trip_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"vehicle_id"	INTEGER,
	"price"	REAL,
	"departure_planet_id"	TEXT,
	"destination_planet_id"	TEXT,
	"departure_datetime"	TEXT,
	"trip_facilities"	TEXT,
	"passenger_count"	INTEGER,
	FOREIGN KEY("vehicle_id") REFERENCES "vehicle"("vehicle_id"),
	FOREIGN KEY("departure_planet_id") REFERENCES "planet"("planet_id"),
	FOREIGN KEY("destination_planet_id") REFERENCES "planet"("planet_id")
);
CREATE TABLE IF NOT EXISTS "user" (
	"user_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"address"	TEXT,
	"contact_number"	TEXT
);
CREATE TABLE IF NOT EXISTS "booking" (
	"booking_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"user_id"	INTEGER,
	"trip_id"	INTEGER,
	"is_paid"	INTEGER DEFAULT 0,
	"traveller_count"	INTEGER,
	"status"	TEXT,
	"total_amount"	REAL,
	"seat_id" TEXT,
	FOREIGN KEY("trip_id") REFERENCES "trip"("trip_id"),
	FOREIGN KEY("user_id") REFERENCES "user"("user_id")
);
CREATE TABLE IF NOT EXISTS "passenger" (
	"passport_number"	TEXT NOT NULL,
	"booking_id"	INTEGER,
	"name"	TEXT,
	FOREIGN KEY("booking_id") REFERENCES "booking"("booking_id"),
	PRIMARY KEY("passport_number","booking_id")
);

-- INSERT INTO "planet" ("planet_id","planet_name","culture","climate","top_tourist_attraction","image","culture_image","climate_image","top_tourist_attraction_image") VALUES ('P2','Venus',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
--  ('P3','Earth',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
--  ('P4','Mars',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
--  ('P5','Jupiter',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
--  ('P6','Saturn',NULL,NULL,NULL,NULL,NULL,NULL,NULL);



INSERT INTO "user" ("first_name", "last_name", "address", "contact_number")
VALUES ('Ravi', 'Silva', '123 Galle Rd, Colombo', '+94 77 123 4567');

INSERT INTO "planet" (
    "planet_name", 
    "culture", 
    "climate", 
    "top_tourist_attraction", 
    "image", 
    "culture_image", 
    "climate_image", 
    "top_tourist_attraction_image"
) VALUES
    ('Venus', 'Venusian culture is shrouded in mystery and speculation.', 'Venus experiences extreme heat and a toxic atmosphere.', 'The enigmatic volcanic activity of Venus is a top sight to explore.', 'venus.jpg', 'venus_culture.jpg', 'venus_climate.jpg', 'venus_attraction.jpg'),
    ('Earth', 'Earth boasts a rich tapestry of diverse cultures, languages, and traditions.', 'Earths climate ranges from polar ice caps to tropical rainforests.', 'The iconic Eiffel Tower in Paris is a world-renowned landmark.', 'earth.jpg', 'earth_culture.jpg', 'earth_climate.jpg', 'earth_attraction.jpg'),
    ('Mars', 'Marsian culture has captured human imagination as a potential home for exploration.', 'Mars features a cold and arid climate with dusty landscapes.', 'Olympus Mons, the tallest volcano in the solar system, is a marvel to behold.', 'mars.gif', 'upscaled.png', 'mars_climate.png', 'tourist.png'),
    ('Jupiter', 'Jovian culture remains speculative due to its inhospitable environment.', 'Jupiter is a gas giant with tumultuous storms and a lack of solid surface.', 'The massive Great Red Spot is a swirling storm that captivates astronomers.', 'jupiter.jpg', 'jupiter_culture.jpg', 'jupiter_climate.jpg', 'jupiter_attraction.jpg'),
    ('Saturn', 'Saturnian culture is a fascination with its unique ring system and beauty.', 'Saturns climate is defined by its rings and features extreme cold.', 'The stunning rings of Saturn provide an iconic and breathtaking view.', 'saturn.jpg', 'saturn_culture.jpg', 'saturn_climate.jpg', 'saturn_attraction.jpg');

INSERT INTO "vehicle" ("vehicle_name", "vehicle_image", "row_count", "column_count")
VALUES 
    ('NASA', 'nasa.png', 6, 5),
    ('SpaceX', 'spacex.jpeg', 7, 4),
    ('Blue Origin', 'blue_origin.jpg', 8, 4),
    ('Galactic', 'galactic_spaceship.jpg', 5, 6),
    ('Mars Rover', 'mars_rover.jpg', 6, 6);


INSERT INTO "trip" (
    "vehicle_id", 
    "departure_planet_id", 
    "destination_planet_id", 
    "price", 
    "departure_datetime", 
    "trip_facilities", 
    "passenger_count"
) VALUES
    (1, 2, 3, 250.0, '2023-09-01 10:00:00', 'Wi-Fi, Snacks', 5);

INSERT INTO "booking" ("user_id", "trip_id", "is_paid", "traveller_count", "status", "total_amount", "seat_id")
VALUES 
    (1, 1, 1, 3, 'Upcoming', 2500.0, '1A,1B,1C');

INSERT INTO "passenger" (
    "passport_number",
    "booking_id",
    "name"
) VALUES
    ('P12345', 1, 'Laksika'),
    ('P67890', 1, 'Niruthikka'),
    ('P24681', 1, 'Nishaanthini');

COMMIT;
