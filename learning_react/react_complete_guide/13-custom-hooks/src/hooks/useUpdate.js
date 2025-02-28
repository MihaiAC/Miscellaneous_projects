import { useState, useCallback } from "react";

export function useUpdate() {
  const [errorUpdating, setErrorUpdating] = useState(null);

  const updateData = useCallback(async function updateData(
    newData,
    updateFn,
    oldData,
    revertFn
  ) {
    try {
      await updateFn(newData);
      setErrorUpdating(null);
    } catch (error) {
      setErrorUpdating({
        message: error.message || "Failed to update data.",
        type: error.type || "Unknown",
        statusCode: error.statusCode || null,
      });
      revertFn(oldData);
    }
  }, []);

  return { errorUpdating, updateData, setErrorUpdating };
}
