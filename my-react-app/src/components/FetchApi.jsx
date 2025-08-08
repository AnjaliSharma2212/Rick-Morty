import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
function FetchData() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPgesRef = useRef(1);
  const charPerPage = 10;
  useEffect(() => {
    fetchapi();
  }, []);
  async function fetchapi() {
    let response = await axios.get("https://rickandmortyapi.com/api/character");
    setCharacters(response.data.results);
    totalPgesRef.current = Math.ceil(
      response.data.results.length / charPerPage
    );
  }
  function handlePrev() {
    setCurrentPage((prev) => prev - 1);
  }
  function handleNext() {
    if (currentPage < totalPgesRef.current) {
      setCurrentPage((prev) => prev + 1);
    }
  }
  let lastIndex = currentPage * charPerPage;
  let firstIndex = lastIndex - charPerPage;
  let currentChar = characters.slice(firstIndex, lastIndex);

  return (
    <>
      <div
        style={{
          display: "grid",
          margin: "20px",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "20px",
        }}
      >
        {currentChar.map((character) => (
          <div
            style={{
              border: "1px solid lightgray",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
            }}
            key={character.id}
          >
            <img
              style={{ width: "250px", height: "200px" }}
              src={character.image}
              alt={character.name}
            />
            <b> {character.name}</b>
          </div>
        ))}
      </div>
      <div
        style={{
          backgroundColor: "lightblue",
          width: "100px",
          height: "30px",
          padding: "10px",
          gap: "10px",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        <b>Page: </b>
        {currentPage}
      </div>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPgesRef.current}
      >
        Next
      </button>
    </>
  );
}
export default FetchData;
