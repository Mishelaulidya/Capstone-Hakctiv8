import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Indonesia from "./pages/Indonesia";
import Programming from "./pages/Programming";
import Covid19 from "./pages/Covid19";
import Saved from "./pages/Saved";
import ResultSearch from "./pages/ResultSearch";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Indonesia />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/covid19" element={<Covid19 />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/search" element={<ResultSearch />} />
          <Route
            path="*"
            element={
              <div className="container text-center mt-5 pt-5">
                <p>Halaman tidak ditemukan.</p>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

function Navbar() {
  const navigate = useNavigate(); 

  const handleClickTechPedia = () => {
    navigate("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <a
          href="#"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            console.log("Navigasi ke Halaman Utama");
          }}
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          TechPedia
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
        
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/" end>
                Indonesia
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/programming">
                Programming
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/covid19">
                COVID-19
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/saved">
                Saved
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/search">
                Search
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


export default App;
