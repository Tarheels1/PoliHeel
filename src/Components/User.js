import React, { Component, useEffect, useState } from "react";
import app from "../config/base.js";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "material-ui/styles/typography";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const headingStyle = {
  textAlign: "left",
  padding: "30px"
};

const User = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    let user = app.auth().currentUser;
    let userId = user.uid;
    let db = app
      .firestore()
      .collection("user")
      .doc(userId);

    db.get().then(doc => {
      const data = doc.data();
      setUserInfo(data);
    });
  }, []);

  console.log(userInfo.State);

  return (
    <div>
      <h1>Welcome {userInfo.FirstName}!</h1>
      <subtitle>
        Listed below are your Federal and State Congressional Members
      </subtitle>
      <div></div>

      <div className="federalSenators">
        <h2 style={headingStyle}>Federal Senators</h2>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            edkjsa;ajkda;j;kaf<br></br> dsa;ljfa;dsjfas kj;fdas;
          </Paper>
        </Grid>
      </div>
      <div className="federalRep">
        <h2 style={headingStyle}>Federal Represenative</h2>
      </div>
      <div className="stateSenators">
        <h2 style={headingStyle}>State Senators</h2>
      </div>
      <div className="stateRep">
        <h2 style={headingStyle}>State Representative</h2>
      </div>

      <button onClick={() => app.auth().signOut()}>Sign Out</button>
    </div>
  );
};

export default User;
