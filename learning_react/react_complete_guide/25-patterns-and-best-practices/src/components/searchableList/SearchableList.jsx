import { useState } from "react";

export default function SearchableList({ items, children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange}></input>
      <ul>
        {searchResults.map((item, idx) => (
          <li key={idx}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
