import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import "./Page.scss";

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const info = location.state || {};

  const [data] = useState(info);
  const { title, description, content, url, image, publishedAt, source } = data;

  useEffect(() => {
    if (!location.state && slug) {
      const decodedSlug = decodeURIComponent(slug);
      navigate(`/?q=${encodeURIComponent(decodedSlug)}`);
    }
  }, [location, navigate, slug]);

  if (!data) return <Loading />;

  const publishDate = new Date(publishedAt).toLocaleDateString("en-GB").replace(/\//g, ".");

  return (
    <main className="page">
      <div className="page__header">
        {image && <div className="page__imageContainer">
          <img src={image} alt="Thumbnail" className="page__image" />
        </div>
        }
        <div className="page__info">
          <div className="page__tools">
            <p>{publishDate}</p>
            <a href={url}>Read Origin</a>
          </div>
          <h1 className="page__title">{title}</h1>
          <p className="page__desc">{description}</p>
        </div>
      </div>
      <p className="page__text">{content}</p>
      <p>NOTE: This website uses a free news API that does not provide the full article text. To read the full text, please either view the original article (via the "Read Original" link in the top right) or consider using a different branch of the source code.</p>
    </main>
  );
}

export default Page;