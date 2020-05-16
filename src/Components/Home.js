import React from "react";
import "../App.css";
import Background from "../uncpic1-64.jpg";
import { useState } from "react";
import "isomorphic-fetch";
import Container from "@material-ui/core/Container";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import MemberSearch from "./MemberSearch";

let backgroundImgStyle = {
  width: "100vw",
  height: "100vh  ",
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
  color: "rgb(19, 41, 75)",
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

function Home(mems) {
  const [selectedMember, setSelectedMember] = useState();

  return (
    <div style={backgroundImgStyle}>
      <div>
        <Container maxWidth>
          <Typography className="regular" variant="subtitle1" style={textStyle}>
            To search a member of congress enter their name below.
            <br></br>
            Or signup to view all your federal and local officials!
          </Typography>
        </Container>
        <Container maxWidth="lg" style={{}}>
          <MemberSearch />
        </Container>
      </div>
      <Container></Container>
    </div>
  );
}

export default Home;
