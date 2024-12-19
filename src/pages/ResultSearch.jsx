import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from '../component/NewsCard';
import { fetchNews } from '../redux/slices/savedArticlesSlice'; 
import { useLocation } from 'react-router-dom';

const ResultSearch = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  
 
  const { news, loading, error } = useSelector(state => state.savedArticles);

  useEffect(() => {
    if (query) {
      dispatch(fetchNews(query));
    }
  }, [query, dispatch]);

  return (
    <div className="container mt-5 pt-5">
      <h1>Hasil Pencarian: <span className="text-danger">{query}</span></h1>
      
      {loading && <p>Memuat hasil pencarian...</p>}
      {error && <p className="text-danger">{error}</p>}
      {news.length > 0 ? (
        <div className="row">
          {news.map((article, index) => (
            <div className="col-md-4" key={index}>
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>Tidak ada hasil ditemukan</p>
      )}
    </div>
  );
};

export default ResultSearch;
