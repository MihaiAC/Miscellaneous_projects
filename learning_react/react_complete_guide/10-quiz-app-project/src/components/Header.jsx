import logoUrl from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={logoUrl} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
