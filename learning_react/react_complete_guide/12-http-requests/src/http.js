export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  // Check for errors.
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}
