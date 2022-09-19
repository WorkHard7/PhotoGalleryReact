import React, { useState, useEffect } from "react";
import "./index.scss";
import { Collection } from "./Collection";

const categories = [
  { name: "All" },
  { name: "Sea" },
  { name: "Mountains" },
  { name: "Architecture" },
  { name: "Cities" },
];

function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const category = categoryId ? `category=${categoryId}` : "";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63286974a2e90dab7bdf7c47.mockapi.io/photo_collections?page=${page}&limit=3&${category}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.warn("Error encountered while loading data");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My images collection</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((elem, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? "active" : ""}
              key={index}
            >
              {elem.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search by name"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
            key={i}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
