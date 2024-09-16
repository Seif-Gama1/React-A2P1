import { useEffect, useState } from "react";

//Unused
export default function useLocalStorage(key, dataToSave) {
  const [data, setData] = useState(null);

  useEffect(() => {
      const localStorageData = JSON.parse(localStorage.getItem(key)) || null;
      if (dataToSave) { //store data
          localStorage.setItem(key, JSON.stringify(dataToSave));
      } else if (localStorageData !== null) { //load data
          setData(localStorageData);
      }
  }, [key, dataToSave]);
  
  return [data];
}
