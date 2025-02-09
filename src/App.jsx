import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import "./index.css"
import MovieInfo from "./pages/MovieInfo"

function App() {


  return (
    <>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search/:searchTerm?" element={<SearchPage />}/>
        <Route path="/movie/:imdbID" element={<MovieInfo />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App


