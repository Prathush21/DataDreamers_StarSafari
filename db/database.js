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

const insertPlanet = (name) => {
    db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO planet (planet_name) VALUES (?)',
          [name],
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
          'INSERT INTO trip (vehicle_id, departure_planet_id, destination_planet_id, price, departure_datetime, trip_facilities, passenger_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
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

      } catch (error) {
        console.log("Error executing SQL statement:", error);
      }
};

const setupDatabase = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS planet ( planet_id	INTEGER primary key , planet_name	TEXT, culture	TEXT, climate	TEXT, top_tourist_attraction	TEXT, image	BLOB, culture_image	BLOB, climate_image	BLOB, top_tourist_attraction_image	BLOB)",
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
            departure_datetime TEXT,
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
  } catch (error) {
    console.log("Error executing SQL statement:", error);
  }
  tableExists()
    .then((length) => {
      if (length ===0) {
        console.log("Initializing tables")
        insertPlanet("Jupiter")
        insertPlanet("mars")
        insertTrip(1, 2, 3, 250.0, '2023-09-01 10:00:00', 'Wi-Fi, Snacks', 5);
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
  setupDatabase,
  dropDatabaseTables,
  tableExists,
  insertTrip
};
