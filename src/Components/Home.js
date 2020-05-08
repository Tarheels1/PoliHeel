import React from "react";
import "../App.css";
import Background from "../uncpic1.jpg";

import "isomorphic-fetch";
import Container from "@material-ui/core/Container";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SearchBar from "./SearchBar";
import { white } from "material-ui/styles/colors";

let backgroundImgStyle = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

let headingStyle = {
  display: "block",
  fontSize: "90px",
  fontWeight: "bold",
};

let textStyle = {
  color: "white",
  padding: "20px",
  display: "block",
  fontSize: "20px",
};

const useStyles = makeStyles((theme) => ({
  alert: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
  },
}));

function Home({ history }) {
  return (
    <div>
      <Container style={backgroundImgStyle} maxWidth>
        <h1 className="heading" style={headingStyle}>
          Welcome to PoliHeel!
        </h1>
        <Typography className="regular" variant="subtitle1" style={textStyle}>
          To search a member of congress enter their name below.
          <br></br>
          Or signup to view all your federal and local officials!
        </Typography>
        <div>
          <Container maxWidth="lg" style={{}}>
            <SearchBar />
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default Home;
