import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
  
    setIsLoading(true); // Start loading animation
    sessionStorage.setItem("lastSearchTerm", searchTerm.trim()); // Store search term
  
    setTimeout(() => {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
      setIsLoading(false); // Reset loading state
    }, 1000); 
  };

  return (
    <div id="Home">
      <div className="backdrop"></div>
      <header className="header__home">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for movies..."
              className="home-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading} // Disable input during loading
            />
            <button type="submit" className="home-button" disabled={isLoading}>
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin /> // Spinning animation
              ) : (
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              )}
            </button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default HomePage;


