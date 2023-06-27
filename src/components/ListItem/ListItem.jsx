import React from "react";
import { useState } from "react";
import "./ListItem.scss";
import Page from '../Page/Page.jsx';

export default function ListItem({ image, video, title, description, text, id }) {

  const [isReading, setIsReading] = useState(false);
  const descriptionId = `desc-${id}`;

  const handleHoverIn = () => {
    const descriptionBox = document.getElementById(descriptionId);
    descriptionBox.style.visibility = "visible";
  };

  const handleHoverOut = () => {
    const descriptionBox = document.getElementById(descriptionId);
    // const id = x.target.id;
    descriptionBox.style.visibility = "hidden";
  };

  const togglePage = (value) => {
    setIsReading(value);

  }

  console.log(video);

  return (
    <div className="item-container">
      <div
        className="list-item"
        id={id}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
        onClick={() => togglePage(true)}
      >
        {image ? <img 
        src={image} 
        alt="thumbnail" 
        className="list-item__thumbnail" />
        : null}
        <h1 className="list-item__title">{title}</h1>
        
      </div>

       
      <p className="list-item--description" id={descriptionId}>
        {description ? description : "No description available"}
      </p>
      
      {isReading && 
            <Page 
            setter={togglePage} 
            title={title} 
            description={description} 
            image={image} 
            video={video}
            text={text} 
            />

      }
    </div>
  );
}
