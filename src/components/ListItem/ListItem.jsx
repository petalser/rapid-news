import React from "react";
import "./ListItem.scss";
import { Link } from "react-router-dom";

const ListItem = ({ data, id }) => {
  const descriptionId = `desc-${id}`;
  const { title, description, image } = data;

  const slug = encodeURIComponent(title.toLowerCase());

  const handleHoverIn = () => {
    const descriptionBox = document.getElementById(descriptionId);
    descriptionBox.style.visibility = "visible";
  };

  const handleHoverOut = () => {
    const descriptionBox = document.getElementById(descriptionId);
    descriptionBox.style.visibility = "hidden";
  };

  return (
    <Link to={`/article/${slug}`} state={data} className="item-container">
      <div
        className="list-item"
        id={id}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
      >
        {image && <img src={image} alt="thumbnail" className="list-item__thumbnail" />}
        <h1 className="list-item__title">{title}</h1>
      </div>

      <p className="list-item--description" id={descriptionId}>
        {description ? description : "No description available"}
      </p>
    </Link>
  );
}

export default ListItem