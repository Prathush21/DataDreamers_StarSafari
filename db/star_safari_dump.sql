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
	PRIMARY KEY("passport_number")
);
INSERT INTO "planet" ("planet_id","planet_name","culture","climate","top_tourist_attraction","image","culture_image","climate_image","top_tourist_attraction_image") VALUES ('P2','Venus',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 ('P3','Earth',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 ('P4','Mars',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 ('P5','Jupiter',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 ('P6','Saturn',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
COMMIT;
