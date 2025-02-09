import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
  const { searchTerm } = useParams(); // Use URL to get search term
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=d65f83fb&s=${searchTerm}`
        );
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.error("Error:", error);
      }
      setIsLoading(false);
    };

    fetchMovies();
  }, [searchTerm]); // Fetch new results when URL changes

  useEffect(() => {
    if (!searchTerm) {
      const storedSearchTerm = sessionStorage.getItem("lastSearchTerm");
      if (storedSearchTerm) {
        navigate(`/search/${encodeURIComponent(storedSearchTerm)}`, {
          replace: true,
        });
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      sessionStorage.setItem("lastSearchTerm", searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
      <Header />
      <SearchResults
        searchTerm={searchTerm}
        movies={movies}
        isLoading={isLoading}
      />
    </>
  );
};

export default SearchPage;
