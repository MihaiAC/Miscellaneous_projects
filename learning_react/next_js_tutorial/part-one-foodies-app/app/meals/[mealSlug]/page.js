import { getMeal } from "@/lib/meals";
import Image from "next/image";
import cssClasses from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }) {
  const { mealSlug } = await params;
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br>");

  return (
    <>
      <header className={cssClasses.header}>
        <div className={cssClasses.image}>
          <Image src={meal.image} fill />
        </div>
        <div className={cssClasses.headerText}>
          <h1>{meal.title}</h1>
          <p className={cssClasses.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={cssClasses.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={cssClasses.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
