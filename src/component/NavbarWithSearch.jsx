import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../image/Logo.png";

const NavbarWithSearch = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(""); 

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (searchQuery.trim()) {
      onSearch(searchQuery); 
    }
  };


  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm fixed-top d-flex flex-column" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="container d-flex align-items-center">
        
        {/* Logo */}
        <a className="navbar-brand fw-bold text-danger" style={{ cursor: "pointer" }}>
          <img src={Logo} alt="Logo" className="me-2" style={{ width: "50px", height: "50px" }} />
          TECHPEDIA
        </a>

        {/* Navbar Link */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto d-flex gap-3">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link text-dark fw-bold" : "nav-link text-dark")} end>
                Indonesia
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/programming" className={({ isActive }) => (isActive ? "nav-link text-dark fw-bold" : "nav-link text-dark")}>
                Programming
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/covid19" className={({ isActive }) => (isActive ? "nav-link text-dark fw-bold" : "nav-link text-dark")}>
                COVID-19
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/saved" className={({ isActive }) => (isActive ? "nav-link text-dark fw-bold" : "nav-link text-dark")}>
                Simpan
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="d-flex">
          <input type="text" name="search" placeholder="Cari berita..." className="form-control me-2" value={searchQuery} onChange={handleInputChange} required />
          <button type="submit" className="btn btn-danger">
            Cari
          </button>
        </form>
      </div>

      {/* Tulisan berjalan */}
      <div className="bg-danger text-white w-100">
        <marquee>
          <span className="marquee-item">📢 Selamat datang di TechPedia! Temukan berita teknologi terkini.</span>
          <span className="marquee-item">📰 Berita Utama: Update terbaru seputar dunia programming dan teknologi.</span>
          <span className="marquee-item">🔴 Hot News: Simak informasi menarik seputar inovasi teknologi terbaru.</span>
        </marquee>
      </div>
    </nav>
  );
};

export default NavbarWithSearch;
