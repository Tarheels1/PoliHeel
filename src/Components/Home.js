import React from "react";
import "../App.css";
import Background from "../uncpic1.jpg";
import { useState } from "react";
import "isomorphic-fetch";
import Container from "@material-ui/core/Container";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MemberSearch from "./MemberSearch";

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

function Home(mems) {
  const [selectedMember, setSelectedMember] = useState();

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
            <MemberSearch />
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default Home;
