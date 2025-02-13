import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGNews } from "../../hooks/useGNews";
import Loading from "../../components/Loading/Loading";
import "./Page.scss";

function Page() {
  const { getData } = useGNews();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const info = location.state || {};

  const [data, setData] = useState(info);

  useEffect(() => {
    if (!location.state && slug) {
      const decodedSlug = decodeURIComponent(slug);
      navigate(`/?q=${encodeURIComponent(decodedSlug)}`);
    }
  }, [location, navigate, slug]);

  if (!data) return <Loading />;

  const { title, description, content, url, image, publishedAt, source } = data;

  return (
    <div className="page">
      <h2 className="page__title">{title}</h2>
      {image && <img src={image} alt="Thumbnail" className="page__image" />}
      <h4 className="page__desc">{description}</h4>
      <p className="page__text">{content}</p>
    </div>
  );
}

export default Page;
