import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRephrase } from "../../hooks/useRephrase";
import Loading from "../../components/Loading/Loading";
import "./Page.scss";

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const info = location.state || {};
  const { rephrase } = useRephrase()

  const [data] = useState(info);
  const { title, description, content, url, image, publishedAt, source } = data;
  const [rephrasedContent, setRephrasedContent] = useState(content)

  useEffect(() => {
    const processText = async () => {
      const text = await rephrase(url)
      if (text) setRephrasedContent(text)
    }
    processText()
  }, [])

  useEffect(() => {
    if (!location.state && slug) {
      const decodedSlug = decodeURIComponent(slug);
      navigate(`/?q=${encodeURIComponent(decodedSlug)}`);
    }
  }, [location, navigate, slug]);

  if (!data) return <Loading />;

  return (
    <main className="page">
      <div className="page__header">
        {image && <div className="page__imageContainer">
          <img src={image} alt="Thumbnail" className="page__image" />
        </div>
        }
        <div className="page__info">
          <div className="page__tools">
            <p>{publishedAt}</p>
            <a href={source}>Read Origin</a>
          </div>
          <h1 className="page__title">{title}</h1>
          <p className="page__desc">{description}</p>
        </div>
      </div>
      <p className="page__text">{rephrasedContent}</p>
    </main>

  );
}

export default Page;