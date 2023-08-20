import React, {useEffect, useState} from 'react';

import {database} from '../../db/database'

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);

  useEffect(() => {
     async function loadData() {
      try {
        await  database.dropDatabaseTables()
        await  database.setupDatabase()
        await  database.tableExists()


        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadData();
  }, []);

  return isDBLoadingComplete;
}