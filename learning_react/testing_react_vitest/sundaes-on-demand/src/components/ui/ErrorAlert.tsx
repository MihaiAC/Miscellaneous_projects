interface ErrorAlertProps {
  errorMessage: string;
}

export default function ErrorAlert({ errorMessage }: ErrorAlertProps) {
  return (
    <div
      role="alert"
      className="p-4 bg-red-500 text-white rounded-md shadow-md"
    >
      <strong>{errorMessage}</strong>
    </div>
  );
}
