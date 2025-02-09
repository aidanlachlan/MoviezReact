import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Header.css";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search/${encodeURIComponent(inputValue.trim())}`); // Update URL on search
    }
  };


  return (
    <div id="search">
      <div className="overlay"></div>
      <header>
        <h1>Browse Our Movies</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search"
              className="searchBar"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="icon-wrapper" aria-label="Search">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
            </button>
          </div>
        </form>
      </header>
    </div>
  );
};

export default Header;
