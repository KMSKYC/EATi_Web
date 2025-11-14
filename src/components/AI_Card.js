import React from 'react';
import '../css/AI_Card.css';

function AICard(props) {
  const restaurant = props.restaurant;

  if (!restaurant) {
    return null;
  }

  return (
<div className="aiCard">
      <img 
        src={restaurant.imageUrl} 
        alt={restaurant.menu}      
        className="ai-card-image"  
      />
      <div className="ai-card-content">
        <span className="ai-card-category">{restaurant.category}</span>
        <h3>{restaurant.menu}</h3> 
        <p>{restaurant.description}</p>
      </div> 
    </div>
  );
}

export default AICard;