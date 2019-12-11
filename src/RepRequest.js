import React, { useEffect, useState } from "react";
import app from "./config/base.js";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

class RepRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      fedSens: [],
      fedReps: [],
      userStateRep: [],
      userStateSen: [],
      userFedRep: [],
      userFedSen: []
    };
  }

  componentDidMount() {
    const items = [];
    app.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User is signed in");
        let db = app
          .firestore()
          .collection("user")
          .doc(user.uid);
        db.get().then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            items.push(doc.data());
          } else {
            console.log("No doc exists");
          }
        });
      }
      this.setState({ userInfo: items });
    });

    Promise.all([
      axios.get(
        `https://api.propublica.org/congress/v1/116/senate/members.json`,
        {
          headers: { "X-API-Key": "9wGKmWl3kNiiSqesJf74uGl0PtStbcP2mEzSvjxv" }
        }
      ),
      axios.get(
        `https://api.propublica.org/congress/v1/116/house/members.json`,
        {
          headers: { "X-API-Key": "9wGKmWl3kNiiSqesJf74uGl0PtStbcP2mEzSvjxv" }
        }
      )
    ]).then(([rest1, rest2]) => {
      this.setState({
        fedSens: rest1,
        fedReps: rest2
      });
      this.getReps(this.state.userInfo);
    });
  }

  getReps(tester) {
    console.log();
    Promise.all([
      //gets federal rep
      axios.get(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBbGJ3XcM9-XacuimgHWxbeJb3FPkZydsY`,
        {
          params: {
            address: tester[0].Street,
            includeOffices: true,
            levels: "country",
            roles: "legislatorLowerBody"
          },
          headers: {
            Accept: "application / json"
          }
        }
      ),
      //get state rep
      axios.get(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBbGJ3XcM9-XacuimgHWxbeJb3FPkZydsY`,
        {
          params: {
            address: tester[0].Street,
            includeOffices: true,
            levels: "administrativeArea1",
            roles: "legislatorLowerBody"
          },
          headers: {
            Accept: "application / json"
          }
        }
      ),
      //get fed sen
      axios.get(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBbGJ3XcM9-XacuimgHWxbeJb3FPkZydsY`,
        {
          params: {
            address: tester[0].Street,
            includeOffices: true,
            levels: "country",
            roles: "legislatorUpperBody"
          },
          headers: {
            Accept: "application / json"
          }
        }
      ),
      //get state sen
      axios.get(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBbGJ3XcM9-XacuimgHWxbeJb3FPkZydsY`,
        {
          params: {
            address: tester[0].Street,
            includeOffices: true,
            levels: "administrativeArea1",
            roles: "legislatorUpperBody"
          },
          headers: {
            Accept: "application / json"
          }
        }
      )
    ]).then(([rest3, rest4, rest5, rest6]) => {
      // console.log(rest3.data.officials[0].name);
      // console.log(rest4);
      this.setState({
        userStateRep: rest3,
        userFedRep: rest4,
        userFedSen: rest5,
        userStateSen: rest6
      });
    });
  }

  render() {
    if (this.state.fedReps.length <= 0 && this.state.userInfo.length <= 0) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    } else if (
      this.state.userFedRep.length <= 0 &&
      this.state.userStateRep.length <= 0
    ) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    } else if (this.state.userFedSen <= 0 && this.state.userStateSen <= 0) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    } else {
      console.log(this.state.userStateRep.data.officials[0].name);
      let person = "";
      let fedReps = this.state.fedReps.data.results[0].members;
      for (let i = 0; i < fedReps.length; i++) {
        if (fedReps[i].state == this.state.userInfo[0].State) {
          person = this.state.fedReps.data.results[0].members[i].last_name;
        }
      }

      return (
        <div>
          <div>
            <h4>Federal Senator</h4>
            {this.state.userFedSen.data.officials[0].name}
          </div>

          <div>
            <h4>Federal Representative</h4>
            {this.state.userFedRep.data.officials[0].name}
          </div>

          <div>
            <h4>State Senator</h4>
            {this.state.userStateSen.data.officials[0].name}
          </div>

          <div>
            <h4>State Representative</h4>
            {this.state.userStateRep.data.officials[0].name}
          </div>
          <Grid container spacing={3} justify="center">
            <Grid item xs>
              <Paper>
                <h6>hello</h6>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper>
                <h6>Office Information</h6>
                <div></div>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper>hello mate</Paper>
            </Grid>
          </Grid>
          <TextField
            id="outlined-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            variant="outlined"
          />
        </div>
      );
    }
  }
}

export default RepRequest;
