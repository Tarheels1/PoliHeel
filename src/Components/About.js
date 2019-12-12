import React from "react";
import Background from "../uncpic4.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import "../App.css";

var sectionStyle = {
  height: "700px",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  overflow: "hidden",
  opacity: "1"
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

function About() {
  const classes = useStyles();
  return (
    <body style={sectionStyle}>
      <h1 className="about">About PoliHeel</h1>

      <Container className="aboutText">
        Imagine someone came up to you on the street and asked you, “Hey, who’s
        your state representative?” I know, not a standard question to randomly
        ask someone, but be honest, if someone did ask you, would you know the
        answer?
        <br></br>
        <br></br>
        If you said no, well, you wouldn’t be alone. According to a 2017 Haven
        Insights poll, only 37% percent of Americans could name their elected
        Congressional Representative, and only 56% even knew what party they
        were affiliated with.
        <br></br>
        <br></br>
        Enter: PoliHeel. PoliHeel is a site that displays all your federal and
        state elected officials with the click of a button. Just sign in, and
        you can see a list of all your elected officials on your user page. You
        can see their biographical information, party affiliation, voting
        statistics, their twitter feed, and other information, all displayed in
        a quick and engaging way tailored to a younger audience.
      </Container>
    </body>
  );
}

export default About;
