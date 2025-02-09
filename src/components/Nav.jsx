import React, { useEffect, useState } from "react";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import moviezLogo from "../assets/moviez-logo1.jpg";

const Nav = () => {
  const location = useLocation(); // Detects when route changes
  const [lastSearchTerm, setLastSearchTerm] = useState(
    sessionStorage.getItem("lastSearchTerm") || ""
  );
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu visibility

  // Update lastSearchTerm when the user navigates
  useEffect(() => {
    const searchTerm = sessionStorage.getItem("lastSearchTerm") || "";
    setLastSearchTerm(searchTerm);
  }, [location]); // Run effect every time route changes

  // Function to handle mailto link
  const handleContactClick = () => {
    window.location.href =
      "mailto:aidanlmcmurray@gmail.com?subject=Moviez Contact&body=Hello, I would like to...";
  };

  return (
    <div className="nav__container">
      <nav>
        <figure>
          <Link to="/">
            <img className="logo" src={moviezLogo} alt="Moviez Logo" />
          </Link>
        </figure>

        {/* Burger Menu */}
        <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>

        {/* Nav Links - Hidden on small screens unless menuOpen is true */}
        <ul className={`nav__links ${menuOpen ? "open" : ""}`}>
          <li className="nav__link" onClick={() => setMenuOpen(!menuOpen)}>
            <Link to="/" style={{ color: "silver", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li className="nav__link" onClick={() => setMenuOpen(!menuOpen)}>
            <Link
              to={
                lastSearchTerm
                  ? `/search/${encodeURIComponent(lastSearchTerm)}`
                  : "/search"
              }
              style={{ color: "silver", textDecoration: "none" }}
            >
              Find Movies
            </Link>
          </li>

          {/* Contact Button */}
          <button className="contact__button" onClick={handleContactClick}>
            CONTACT
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
