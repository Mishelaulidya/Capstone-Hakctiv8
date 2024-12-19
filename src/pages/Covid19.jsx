import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NewsCard from "../component/NewsCard";
import NavbarWithSearch from "../component/NavbarWithSearch";
import { useDispatch, useSelector } from "react-redux";
import { saveArticle, removeArticle } from "../redux/slices/savedArticlesSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../image/Logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Covid19 = () => {
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState("covid-19");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const savedArticles = useSelector((state) => state.savedArticles.savedArticles);
  const dispatch = useDispatch();

  const newsSectionRef = useRef(null);

  const fetchNews = async (searchQuery) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=${apiKey}`;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(url);
      const articles = response.data.response.docs;

      if (articles && articles.length > 0) {
        setNews(articles);
      } else {
        setNews([]);
        setError("Tidak ada berita ditemukan untuk kata kunci tersebut.");
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Gagal memuat berita, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(keyword);
    AOS.init({ duration: 1000, once: false });
  }, [keyword]);

  const handleSearch = (query) => {
    if (query.trim()) {
      setKeyword(query);
    }
  };

  const getArticleData = (article) => ({
    title: article.headline.main,
    description: article.abstract || "Deskripsi tidak tersedia.",
    urlToImage: article.multimedia && article.multimedia[0] ? `https://static01.nyt.com/${article.multimedia[0].url}` : "https://via.placeholder.com/300x200?text=No+Image",
    url: article.web_url,
  });

  const isArticleSaved = (url) => {
    return savedArticles.some((article) => article.url === url);
  };

  const toggleSaveArticle = (article) => {
    if (isArticleSaved(article.url)) {
      dispatch(removeArticle(article.url));
    } else {
      dispatch(saveArticle(article));
    }
  };

  const scrollToNewsSection = () => {
    newsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container-fluid mt-5 pt-5">

      {/* Navbar */}
      <NavbarWithSearch onSearch={handleSearch} />

      <div className="d-flex justify-content-center mb-4" style={{ position: "relative" }}>

        {/* gambar */}
        <img
          src="https://www.allianz.co.id/explore/yuk-pahami-lebih-jelas-arti-pandemi-pada-covid19/_jcr_content/root/stage/stageimage.img.82.3360.jpeg/1621862725258/yuk,-pahami-lebih-jelas-arti-pandemi-pada-covid-19.jpeg"
          className="img-fluid"
          alt="COVID-19"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        />

        {/* Teks didalam gambar*/}
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "2rem",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
            textAlign: "center",
          }}
        >
          <p style={{ fontWeight: "bold" }}>BERITA COVID-19</p>
          <p style={{ fontSize: "1.5rem" }}>
            Yukk baca selengkapnya mengenai berita terkini seputar COVID-19
          </p>
          <button
            onClick={scrollToNewsSection}
            className="btn btn-primary"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "1rem" }}
          >
            Baca Berita
          </button>
        </div>
      </div>

      {/* Berita isi */}

      <div ref={newsSectionRef}>
        {loading ? (
          <p className="text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
            Memuat berita...
          </p>
        ) : error ? (
          <p className="text-center text-danger" style={{ fontFamily: "Poppins, sans-serif" }}>
            {error}
          </p>
        ) : news.length > 0 ? (
          <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {news.map((article) => {
              const articleData = getArticleData(article);
              return (
                <NewsCard key={article.web_url} article={articleData}>
                  <button
                    className={`btn btn-sm ${isArticleSaved(article.web_url) ? "btn-danger" : "btn-success"}`}
                    onClick={() => toggleSaveArticle(articleData)}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {isArticleSaved(article.web_url) ? "Hapus Simpan" : "Simpan"}
                  </button>
                </NewsCard>
              );
            })}
          </div>
        ) : (
          <p className="text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
            Tidak ada berita ditemukan.
          </p>
        )}
      </div>

      {/* Footer*/}
      <footer className="bg-light text-dark py-5 mt-5" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-md-start text-center mb-4 mb-md-0">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <img src={Logo} alt="TechPedia Logo" style={{ width: "90px", height: "90px", objectFit: "cover" }} className="me-2" />
                <h5 className="mb-0" style={{ color: "red" }}>
                  TECHPEDIA
                </h5>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <p className="mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                Hubungi Kami
              </p>
              <div className="d-flex justify-content-center">
                <a href="#" className="mx-3">
                  <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" />
                </a>
                <a href="#" className="mx-3">
                  <img src="https://img.icons8.com/color/48/whatsapp.png" alt="WhatsApp" />
                </a>
                <a href="#" className="mx-3">
                  <img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook" />
                </a>
              </div>
            </div>
            <div className="col-md-4 text-md-end text-center">
              <ul className="list-unstyled d-inline-flex flex-wrap justify-content-center justify-content-md-end mb-0">
                <li className="mx-3 mb-2">
                  <a href="#" className="text-dark text-decoration-none" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Kontak
                  </a>
                </li>
                <li className="mx-3 mb-2">
                  <a href="#" className="text-dark text-decoration-none" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Redaksi
                  </a>
                </li>
                <li className="mx-3 mb-2">
                  <a href="#" className="text-dark text-decoration-none" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Tentang Kami
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-5 text-center">
            <p className="mb-0" style={{ fontFamily: "Poppins, sans-serif" }}>
              &copy; 2024 TechPedia. All rights reserved.
            </p>
            <p> Mishel Aulidya</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Covid19;
