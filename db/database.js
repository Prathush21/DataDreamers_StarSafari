import React from "react";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("star_safari.db");

const getPlanets = (setUserFunc) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'select * from planet',
          [],
          (_, { rows: { _array } }) => {
            setUserFunc(_array)
          }
        );
      },
      (t, error) => { console.log("db error load planets"); console.log(error) },
      (_t, _success) => { console.log("planets loaded")}
    );
  }


  const getTrips = (setUserFunc) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'select * from trip',
          [],
          (_, { rows: { _array } }) => {
            setUserFunc(_array)
          }
        );
      },
      (t, error) => { console.log("db error load trips"); console.log(error) },
      (_t, _success) => { console.log("trips loaded")}
    );
  }

  const getVehicles = (setUserFunc) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'select * from vehicle',
          [],
          (_, { rows: { _array } }) => {
            setUserFunc(_array)
          }
        );
      },
      (t, error) => { console.log("db error load vehicles"); console.log(error) },
      (_t, _success) => { console.log("vehicles loaded")}
    );
  }


const insertPlanet = (planet_name,culture, climate, top_tourist_attraction, image, culture_image, climate_image, top_tourist_attraction_image) => {
    db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO planet (planet_name,culture, climate, top_tourist_attraction, image, culture_image, climate_image, top_tourist_attraction_image) VALUES (?,?,?,?,?,?,?,?)',
          [planet_name,culture, climate, top_tourist_attraction, image, culture_image, climate_image, top_tourist_attraction_image],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              console.log("Planet record inserted with ID:", {insertId});
            }
          },
          (_, error) => {
            console.log("Error inserting planet record:", error);
          }
        );
      });
};

const insertTrip = (
  vehicle_id,
  departure_planet_id,
  destination_planet_id,
  price,
  departure_datetime,
  trip_facilities,
  passenger_count
) => {
  db.transaction(tx => {
      tx.executeSql(
          'INSERT INTO trip (vehicle_id, departure_planet_id, destination_planet_id, price, departure_date, departure_time, trip_facilities, passenger_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [vehicle_id, departure_planet_id, destination_planet_id, price, departure_datetime, trip_facilities, passenger_count],
          (_, { rowsAffected, insertId }) => {
              if (rowsAffected > 0) {
                  console.log("Trip record inserted with ID:", {insertId});
              }
          },
          (_, error) => {
              console.log("Error inserting trip record:", error);
          }
      );
  });
};


const insertBooking = (user_id, trip_id, is_paid,traveller_count, status, total_amount, seat_id) => {
  db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO booking (user_id, trip_id, is_paid,traveller_count, status, total_amount, seat_id) VALUES (?,?,?,?,?,?,?)',
        [user_id, trip_id, is_paid,traveller_count, status, total_amount, seat_id],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            console.log("Booking record inserted with ID:", {insertId});
          }
        },
        (_, error) => {
          console.log("Error inserting booking record:", error);
        }
      );
    });
};

const insertVehicle = (vehicle_name, vehicle_image, row_count, column_count) => {
  db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO vehicle (vehicle_name, vehicle_image, row_count, column_count) VALUES (?,?,?,?)',
        [vehicle_name, vehicle_image, row_count, column_count],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            console.log("Vehicle record inserted with ID:", {insertId});
          }
        },
        (_, error) => {
          console.log("Error inserting vehicle record:", error);
        }
      );
    });
};

const insertUser = (first_name, last_name, address, contact_number) => {
  db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO user (first_name, last_name, address, contact_number) VALUES (?,?,?,?)',
        [first_name, last_name, address, contact_number],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            console.log("User record inserted with ID:", {insertId});
          }
        },
        (_, error) => {
          console.log("Error inserting user record:", error);
        }
      );
    });
};

const insertPassenger = (passport_number, booking_id, name) => {
  db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO passenger (passport_number, booking_id, name) VALUES (?,?,?)',
        [passport_number, booking_id, name],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            console.log("Passenger record inserted with ID:", {insertId});
          }
        },
        (_, error) => {
          console.log("Error inserting passenger record:", error);
        }
      );
    });
};


const dropDatabaseTables =  () => {
    try {
        db.transaction((tx) => {
          tx.executeSql(
            "Drop TABLE planet",
            [],
            () => {
              console.log("Table dropped successfully.");
            },
            (error) => {
              console.log("Error dropping table:", error);
            }
          );
        });

        db.transaction((tx) => {
          tx.executeSql(
            "Drop TABLE trip",
            [],
            () => {
              console.log("Trip Table dropped successfully.");
            },
            (error) => {
              console.log("Error dropping Trip table:", error);
            }
          );
        });
       
          db.transaction((tx) => {
            tx.executeSql(
              "Drop TABLE booking",
              [],
              () => {
                console.log("Booking Table dropped successfully.");
              },
              (error) => {
                console.log("Error dropping table:", error);
              }
            );
          });

          db.transaction((tx) => {
            tx.executeSql(
              "Drop TABLE vehicle",
              [],
              () => {
                console.log("Vehicle Table dropped successfully.");
              },
              (error) => {
                console.log("Error dropping vehicle table:", error);
              }
            );
          });

          db.transaction((tx) => {
            tx.executeSql(
              "Drop TABLE user",
              [],
              () => {
                console.log("User Table dropped successfully.");
              },
              (error) => {
                console.log("Error dropping user table:", error);
              }
            );
          });

          db.transaction((tx) => {
            tx.executeSql(
              "Drop TABLE passenger",
              [],
              () => {
                console.log("Passenger Table dropped successfully.");
              },
              (error) => {
                console.log("Error dropping passenger table:", error);
              }
            );
          });
      
      } catch (error) {
        console.log("Error executing SQL statement:", error);
      }
};

const setupDatabase = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS planet ( planet_id	INTEGER primary key , planet_name	TEXT, culture	TEXT, climate	TEXT, top_tourist_attraction	TEXT, image	TEXT, culture_image	TEXT, climate_image	TEXT, top_tourist_attraction_image	TEXT)",
        [],
        () => {
          console.log("Planet Table created successfully.");
        },
        (error) => {
          console.log("Error creating table:", error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS trip (
            trip_id INTEGER PRIMARY KEY AUTOINCREMENT,
            vehicle_id INTEGER,
            price REAL,
            departure_planet_id TEXT,
            destination_planet_id TEXT,
            departure_date TEXT,
            departure_time TEXT,
            trip_facilities TEXT,
            passenger_count INTEGER,
            FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id),
            FOREIGN KEY(departure_planet_id) REFERENCES planet(planet_id),
            FOREIGN KEY(destination_planet_id) REFERENCES planet(planet_id)
        )`,
        [],
        () => {
            console.log("Trip Table created successfully.");
        },
        (error) => {
            console.log("Error creating trip table:", error);
        }
      );
    });
    
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "booking" (
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
        );`,
        [],
        () => {
          console.log("Booking Table created successfully.");
        },
        (error) => {
          console.log("Error creating table:", error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "vehicle" (
          "vehicle_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
          "vehicle_name" TEXT,
          "vehicle_image" TEXT,
          "row_count"	INTEGER,
          "column_count"	INTEGER
        );`,
        [],
        () => {
          console.log("Vehicle Table created successfully.");
        },
        (error) => {
          console.log("Error creating vehicle table:", error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "user" (
          "user_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
          "first_name"	TEXT,
          "last_name"	TEXT,
          "address"	TEXT,
          "contact_number"	TEXT
        );`,
        [],
        () => {
          console.log("User Table created successfully.");
        },
        (error) => {
          console.log("Error creating user table:", error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "passenger" (
          "passport_number"	TEXT NOT NULL,
          "booking_id"	INTEGER,
          "name"	TEXT,
          FOREIGN KEY("booking_id") REFERENCES "booking"("booking_id"),
          PRIMARY KEY("passport_number","booking_id")
        );`,
        [],
        () => {
          console.log("Passenger Table created successfully.");
        },
        (error) => {
          console.log("Error creating passenger table:", error);
        }
      );
    });

  } catch (error) {
    console.log("Error executing SQL statement:", error);
  }
  tableExists()
    .then((length) => {
      if (length ===0) {
        console.log("Initializing tables")
        insertTrip(1, 2, 3, 250.0, '2023-09-01','10:00:00', 'Wi-Fi, Snacks', 5);
        insertBooking(1, 1, 1, 3, 'Upcoming', 2500.0, '1A,1B,1C')
        insertVehicle('NASA', 'nasa.png', 6, 5)
        insertVehicle('SpaceX', 'spacex.jpeg', 7, 4)
        insertVehicle('Blue Origin', 'blue_origin.jpg', 8, 4)
        insertVehicle('Galactic', 'galactic_spaceship.jpg', 5, 6)
        insertVehicle('Mars Rover', 'mars_rover.jpg', 6, 6)
        insertUser('Ravi', 'Silva', '123 Galle Rd, Colombo', '+94 77 123 4567')
        insertPassenger('P12345', 1, 'Laksika')
        insertPassenger('P67890', 1, 'Niruthikka')
        insertPassenger('P24681', 1, 'Nishaanthini')
        insertPlanet('Jupiter', 'Jovian culture remains speculative due to its inhospitable environment.', 'Jupiter is a gas giant with tumultuous storms and a lack of solid surface.', 'The massive Great Red Spot is a swirling storm that captivates astronomers.', 'jupiter.jpg', 'jupiter_culture.jpg', 'jupiter_climate.jpg', 'jupiter_attraction.jpg')
        insertPlanet('Mars', 'Marsian culture has captured human imagination as a potential home for exploration.', 'Mars features a cold and arid climate with dusty landscapes.', 'Olympus Mons, the tallest volcano in the solar system, is a marvel to behold.', 'mars.gif', 'upscaled.png', 'mars_climate.png', 'tourist.png')

      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

    


// Check if the "planets" table records exist
const tableExists = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type=? AND name=?",
          ["table", "planets"],
          (_, { rows: { _array } }) => {
            resolve(_array.length);
          },
          (error) => {
            console.log("Error fetching table:", error);
            reject(error);
          }
        );
      });
    });
  };
  

export const database = {
  getPlanets,
  insertPlanet,
  insertBooking,
  insertUser,
  insertVehicle,
  insertPassenger,
  setupDatabase,
  dropDatabaseTables,
  tableExists,
  insertTrip,
  getTrips,
  getVehicles
};
