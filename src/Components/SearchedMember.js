import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Typography from "material-ui/styles/typography";
import TabBar from "./TabBar";
import "typeface-roboto";

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
    let url = "https://theunitedstates.io/images/congress/225x275/";
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
        <Fade in={true}>
          <Grid className="mainGrid" container spacing={2}>
            <Grid item xs={3}>
              <Paper elevation={3} variant="outlined">
                {props.member} Party - {props.membersData[props.member].party}
                <br></br>
                <img src={memberPicture}></img>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={3} variant="outlined">
                <TabBar
                  election={props.membersData[props.member].next_election}
                  leadershipRole={
                    props.membersData[props.member].leadership_role
                  }
                />
                Sign in or Sign up to view more information!
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      </div>
    );
  }
}

export default SearchedMember;
