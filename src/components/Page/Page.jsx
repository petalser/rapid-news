import React from "react";
import "./Page.scss";

export default function IsReading({ setter, title, description, image, text }) {

    const handleClick = () => {

        setter(false)
    }
  return (
    <div onClick={handleClick} className="page">
      <span className="page__close">&times;</span>
      <h2 className="page__title">{title}</h2>
      {image ? (
        <img src={image} alt="Thumbnail" className="page__image" />
      ) : null}
      <h4 className="page__desc">{description}</h4>
      <p className="page__text">{text}</p>
    </div>
  );
}
