import { animals } from './animals';
import React from "react";
import ReactDOM from "react-dom";

const images = [];
for(const animal in animals){
  images.push(
    <img 
    key={animal} 
    className="animal" 
    alt={animal} 
    src={animals[animal].image} 
    aria-label={animal} 
    role="button"
    onClick={displayFact}
    />);
}

const title = "";

const background = <img className="background" alt="ocean" src="/images/ocean.jpg" />;

const showBackground = true;

const animalFacts = 
(<div>
  <p id="fact"></p>
  <h1>{title || "Click an animal for a fun fact!"}</h1>
  {showBackground && background}
  <div className="animals">
    {images}
  </div>
</div>);



function displayFact(e) {
  const facts = animals[e.target.alt].facts;
  const factIndex = Math.floor(Math.random()*facts.length);
  document.getElementById("fact").innerHTML = facts[factIndex];
}

ReactDOM.render(animalFacts, document.getElementById("root"));

