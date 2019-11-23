import React, { Component, useEffect, useState } from "react";
import app from "../config/base.js";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
      <div>
        <h2></h2>
      </div>
      <h2></h2>
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
    </div>
  );
};

export default User;
