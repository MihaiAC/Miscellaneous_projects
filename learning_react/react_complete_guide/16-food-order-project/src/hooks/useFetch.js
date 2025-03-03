import { useState, useCallback } from "react";

export default function useFetch(url, initialState) {
  const [data, setData] = useState(initialState.data);
  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);

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
