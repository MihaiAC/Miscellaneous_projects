import { useState, useCallback } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async function fetchData(config = null) {
      setLoading(true);
      try {
        let response;
        if (config !== null) {
          response = await fetch(url, config);
        } else {
          response = await fetch(url);
        }

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { data, loading, error, sendRequest };
}
