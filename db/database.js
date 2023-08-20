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
  } catch (error) {
    console.log("Error executing SQL statement:", error);
  }
  tableExists()
    .then((length) => {
      if (length ===0) {
        console.log("Initializing tables")
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
  setupDatabase,
  dropDatabaseTables,
  tableExists
};
