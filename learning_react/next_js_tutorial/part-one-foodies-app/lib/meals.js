import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // Dummy async for illustration purposes.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare("SELECT * FROM meals").all();
}
