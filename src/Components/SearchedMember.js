import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Typography from "material-ui/styles/typography";
import TabBar from "./TabBar";
import "typeface-roboto";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    return <CircularProgress />;
  } else {
    return (
      <div className={classes.root}>
        <Fade in={true} timeout={900}>
          <Grid className="mainGrid" container spacing={2}>
            <Grid item xs={3}>
              <Paper elevation={3} variant="outlined">
                <h3>
                  {props.membersData[props.member].short_title} {props.member}
                  <br></br>
                  {states[props.membersData[props.member].state]} - {""}
                  {props.membersData[props.member].party}
                </h3>
                <Fade in={true} timeout={800}>
                  <img src={memberPicture}></img>
                </Fade>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={3} variant="outlined">
                <TabBar member={props.membersData[props.member]} />
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

const states = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virgina",
  WI: "Wisconsin",
  WY: "Wyoming",
};
