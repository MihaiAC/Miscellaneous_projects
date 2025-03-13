import Link from "next/link";
import Image from "next/image";

import cssClasses from "./meal-item.module.css";

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={cssClasses.meal}>
      <header>
        <div className={cssClasses.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={cssClasses.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={cssClasses.content}>
        <p className={cssClasses.summary}>{summary}</p>
        <div className={cssClasses.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
