import React from "react";
import "./Page.scss";

export default function IsReading({ setter, title, description, image, video, text }) {

    const handleClick = () => {

        setter(false)
    }
  return (
    <div onClick={handleClick} className="page">
      <span className="page__close">&times;</span>
      <h2 className="page__title">{title}</h2>
      {video 
      ? (
        <video className="page__image" controls poster={image}>
          <source src={video}></source>
        </video>
      )
      : image ? (
        <img src={image} alt="Thumbnail" className="page__image" />
      ) : null}
      <h4 className="page__desc">{description}</h4>
      <p className="page__text">{text}</p>
    </div>
  );
}
