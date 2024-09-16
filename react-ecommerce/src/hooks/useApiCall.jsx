import { useEffect } from "react";

const base_url = "https://dummyjson.com/";

export default function useApiCallInitilaRender(
  endpoint, setData) {
  useEffect(() => {
    fetch(`${base_url}${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
}
