import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../image/Logo.png";
import NavbarWithSearch from "../component/NavbarWithSearch";
import { removeArticle } from "../redux/slices/savedArticlesSlice";


const Saved = () => {
  const dispatch = useDispatch();

  const savedArticles = useSelector((state) => state.savedArticles.savedArticles);

  const handleRemove = (indexToRemove) => {
    const articleToRemove = savedArticles[indexToRemove];
    dispatch(removeArticle(articleToRemove.url));
  };

  return (
    <div className="container-fluid mt-5 pt-5">
      
      {/* Header */}
      <NavbarWithSearch />

      <h1 className="text-center mb-4 mt-5 fw-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
        BERITA YANG DISIMPAN
      </h1>
      <hr className="border border-danger border-2 opacity-50" />

      {savedArticles.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover font-poppins">
            <thead className="table-light">
              <tr>
                <th className="text-center">Gambar</th>
                <th className="text-center">Judul Berita</th>
                <th className="text-center">Deskripsi</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {savedArticles.map((article, index) => (
                <tr key={article.url}>
                  <td>
                    <img src={article.urlToImage || "default-image.jpg"} alt={article.title || "No Title"} style={{ width: "100px", height: "auto", objectFit: "cover" }} />
                  </td>
                  <td>{article.title}</td>
                  <td>{article.description}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <a href={article.url} className="btn btn-primary btn-sm mb-2" target="_blank" rel="noopener noreferrer">
                        Baca
                      </a>
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemove(index)}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">Belum ada berita yang disimpan.</p>
      )}

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
                <li className="mx-3 mb-2">
                  <a href="#" className="text-dark text-decoration-none" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Hak Jawab
                  </a>
                </li>
                <li className="mx-3 mb-2">
                  <a href="#" className="text-dark text-decoration-none" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Kode Etik
                  </a>
                </li>
                <li className="mx-3 mb-2">
                  <a href="#" className="text-dark text-decoration-none" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Form Pengaduan
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

export default Saved;
