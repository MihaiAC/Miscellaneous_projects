import cssClasses from "./loading.module.css";

export default function MealsLoadingPage() {
  return <p className={cssClasses.loading}>Fetching meals...</p>;
}
