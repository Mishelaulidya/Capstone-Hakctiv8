import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveArticle, removeArticle } from "../redux/slices/savedArticlesSlice";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsCard = ({ article, children }) => {
  const { title, description, urlToImage, url } = article;
  const dispatch = useDispatch();

  const savedArticles = useSelector((state) => state.savedArticles.savedArticles);

  const isSaved = savedArticles.some((a) => a.url === article.url);

  const handleSaveClick = () => {
    if (isSaved) {
      dispatch(removeArticle(article.url));
    } else {
      dispatch(saveArticle(article));
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div className="col" data-aos="zoom-in-up">
      <div className="card h-100 shadow-sm">
        {urlToImage && <img src={urlToImage} alt={title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />}
        <div className="card-body">
          <h5 className="card-title" style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.1rem" }}>
            {title}
          </h5>
          <p className="card-text" style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.9rem" }}>
            {description}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm px-2 py-1" style={{ minWidth: "140px" }}>
            Baca Selengkapnya
          </a>
          <button onClick={handleSaveClick} className={`btn ${isSaved ? "btn-danger" : "btn-success"} btn-sm px-2 py-1`} style={{ minWidth: "140px" }}>
            {isSaved ? "Hapus simpan" : "Simpan Berita"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
