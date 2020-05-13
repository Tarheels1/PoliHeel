import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Container from "@material-ui/core/Container";
import MemberSearch from "./MemberSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function SearchedMember(props) {
  const classes = useStyles();
  const [memberPicture, setMemberPicture] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let id = props.membersData[props.member].id;
    let url = "https://theunitedstates.io/images/congress/original/";
    let urlEnding = ".jpg";
    let combinedUrl = url + id + urlEnding;
    setMemberPicture(combinedUrl);
    setLoading(false);
  });

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper>
              Name<br></br>
              {props.member}
              <br></br>
              {props.membersData[props.member].id}
              <br></br>
              <img src={memberPicture}></img>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper>hello1</Paper>
          </Grid>
          <Grid item xs>
            <Paper>hello2</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SearchedMember;
