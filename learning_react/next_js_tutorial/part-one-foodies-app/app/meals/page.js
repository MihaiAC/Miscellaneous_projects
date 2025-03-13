import Link from "next/link";
import cssClasses from "./page.module.css";
import MealsGrid from "../components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

export default async function MealsPage() {
  const meals = await getMeals();

  return (
    <>
      <header className={cssClasses.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={cssClasses.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and Lorem it yourself. It is Ipsum-y and
          Dolor-y.
        </p>
        <p className={cssClasses.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={cssClasses.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
