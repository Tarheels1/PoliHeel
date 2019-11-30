import React from "react";
import Background from "../uncpic4.jpg";

import "../App.css";

var sectionStyle = {
  height: "700px",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  overflow: "hidden",
  opacity: "1"
};

function About() {
  return (
    <body style={sectionStyle}>
      <h1 className="about">About PoliHeel</h1>
      <div>Created by Eric D. Moreno in the fall of 2019</div>
    </body>
  );
}

export default About;
