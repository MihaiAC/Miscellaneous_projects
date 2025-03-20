import { useLoaderData } from "react-router-dom";

export default function ComponentTwo() {
  const data = useLoaderData();

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (data.isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1>Component Two</h1>
      <ul>
        {data["products"].map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
