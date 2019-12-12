import React, { useEffect, useState } from "react";
import app from "../config/base.js";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Timeline } from "react-twitter-widgets";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import Portal from "@material-ui/core/Portal";

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

const useStyles1 = makeStyles(theme => ({
  alert: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    border: "1px solid"
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
      userFedSen: [],
      error: null,
      testerA: [],
      showMessage: false,
      value: null
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

      setTimeout(() => {
        this.getReps(this.state.userInfo);
      }, 3000);
    });
  }

  getReps(tester) {
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
    ])
      .then(([rest3, rest4, rest5, rest6]) => {
        // console.log(rest4);
        this.setState({
          userStateRep: rest4,
          userFedRep: rest3,
          userFedSen: rest5,
          userStateSen: rest6
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error
        });
      });
  }

  getInitialState() {
    return {
      textFieldValue: ""
    };
  }

  _handleTextFieldChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  _showMessage = bool => {
    this.setState({
      showMessage: bool
    });
  };

  render() {
    //address if can't load
    if (this.state.error != null) {
      return (
        <div>
          <span>You're address could not be found</span>
          <br></br>
          <br></br>
          <span>Please hit the return button to try again</span>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => app.auth().signOut()}
          >
            Return
          </Button>
        </div>
      );
    } else if (
      this.state.fedReps.length <= 0 &&
      this.state.userInfo.length <= 0
    ) {
      return (
        <div>
          <span>Loading...</span>
          <br></br>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => app.auth().signOut()}
          >
            Sign Out
          </Button>
        </div>
      );
    } else if (
      this.state.userFedRep.length <= 0 &&
      this.state.userStateRep.length <= 0
    ) {
      return (
        <div>
          <span>Loading...</span>
          <br></br>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => app.auth().signOut()}
          >
            Sign Out
          </Button>
        </div>
      );
    } else if (this.state.userFedSen <= 0 && this.state.userStateSen <= 0) {
      return (
        <div>
          <span>Loading...</span>
          <br></br>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => app.auth().signOut()}
          >
            Sign Out
          </Button>
        </div>
      );
    }

    //once everything loads
    else {
      let person = "";
      let senInfo = [];
      let repInfo = [];
      let fedReps = this.state.fedReps.data.results[0].members;
      let fedSens = this.state.fedSens.data.results[0].members;
      let stateRepTwitter = "";
      let stateSenTwitter = "";
      let searchRep = [];

      console.log(this.state.value);

      for (let i = 0; i < fedSens.length; i++) {
        if (
          fedSens[i].first_name + " " + fedSens[i].last_name ==
          this.state.value
        ) {
          searchRep.push(fedSens[i]);
        }
      }
      for (let i = 0; i < fedReps.length; i++) {
        if (
          fedReps[i].first_name + " " + fedReps[i].last_name ==
          this.state.value
        ) {
          searchRep.push(fedReps[i]);
        }
      }

      console.log(searchRep);

      for (let i = 0; i < fedReps.length; i++) {
        if (
          fedReps[i].ocd_id == this.state.userFedRep.data.offices[0].divisionId
        ) {
          person = this.state.fedReps.data.results[0].members[i].last_name;
          repInfo.push(this.state.fedReps.data.results[0].members[i]);
        }
      }

      for (let i = 0; i < fedSens.length; i++) {
        if (fedSens[i].state == this.state.userInfo[0].State) {
          senInfo.push(this.state.fedSens.data.results[0].members[i]);
        }
      }

      if (this.state.userStateRep.data.officials[0].channels[1] == null) {
        stateRepTwitter = "No Twitter";
      } else {
        stateRepTwitter = this.state.userStateRep.data.officials[0].channels[1]
          .id;
      }

      if (this.state.userStateSen.data.officials[0].channels[1] == null) {
        stateSenTwitter = "No Twitter";
      } else {
        stateSenTwitter = this.state.userStateSen.data.officials[0].channels[1]
          .id;
      }

      return (
        <div className="user-img">
          <div>
            <h2 align="left" className="title">
              Federal Senators
            </h2>
            <Grid className="Grid" container spacing={3} justify="center">
              <Grid item xs>
                <Paper>
                  <h2 className="gridHeading">
                    {senInfo[0].first_name + " " + senInfo[0].last_name}
                  </h2>
                  <ul>
                    <li align="left">Party - {senInfo[0].party} </li>
                    <li align="left">D.O.B - {senInfo[0].date_of_birth} </li>
                    <li align="left">Office - {senInfo[0].office} </li>
                    <li align="left">Office - {senInfo[0].phone} </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <h2 class="gridHeading">Voting Infomation</h2>
                  <ul>
                    <li align="left">
                      Election year - {senInfo[0].next_election}{" "}
                    </li>
                    <li align="left">
                      Total Votes Cast - {senInfo[0].total_votes}{" "}
                    </li>
                    <li align="left">
                      Missed Votes - {senInfo[0].missed_votes}{" "}
                    </li>
                    <li align="left">
                      Missed Votes Percentage - {senInfo[0].missed_votes_pct}{" "}
                    </li>
                    <li align="left">
                      Votes With Party Percentage -{" "}
                      {senInfo[0].votes_with_party_pct}{" "}
                    </li>
                    <li align="left">
                      Votes Against Party Percentage -{" "}
                      {senInfo[0].votes_against_party_pct}{" "}
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <Timeline
                    dataSource={{
                      sourceType: "profile",
                      screenName: senInfo[0].twitter_account
                    }}
                    options={{
                      username: "TomTillis",
                      height: "400"
                    }}
                    onLoad={() => console.log("Timeline is loaded!")}
                  />
                </Paper>
              </Grid>
            </Grid>

            <Grid className="Grid" container spacing={3} justify="center">
              <Grid item xs>
                <Paper>
                  <h2 class="gridHeading">
                    {senInfo[1].first_name + " " + senInfo[1].last_name}
                  </h2>
                  <ul>
                    <li align="left">Party - {senInfo[1].party} </li>
                    <li align="left">D.O.B - {senInfo[1].date_of_birth} </li>
                    <li align="left">Office - {senInfo[1].office} </li>
                    <li align="left">Office - {senInfo[1].phone} </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <h2 class="gridHeading">Voting Infomation</h2>
                  <ul>
                    <li align="left">
                      Election year - {senInfo[1].next_election}{" "}
                    </li>
                    <li align="left">
                      Total Votes Cast - {senInfo[1].total_votes}{" "}
                    </li>
                    <li align="left">
                      Missed Votes - {senInfo[1].missed_votes}{" "}
                    </li>
                    <li align="left">
                      Missed Votes Percentage - {senInfo[1].missed_votes_pct}{" "}
                    </li>
                    <li align="left">
                      Votes With Party Percentage -{" "}
                      {senInfo[1].votes_with_party_pct}{" "}
                    </li>
                    <li align="left">
                      Votes Against Party Percentage -{" "}
                      {senInfo[1].votes_against_party_pct}{" "}
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <Timeline
                    dataSource={{
                      sourceType: "profile",
                      screenName: senInfo[1].twitter_account
                    }}
                    options={{
                      username: "TomTillis",
                      height: "400"
                    }}
                    onLoad={() => console.log("Timeline is loaded!")}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>

          <div>
            <h2 className="title" align="left">
              Federal Representative
            </h2>
            <Grid className="Grid" container spacing={3} justify="center">
              <Grid item xs>
                <Paper>
                  <h2 class="gridHeading">
                    {repInfo[0].first_name + " " + repInfo[0].last_name}
                  </h2>
                  <ul>
                    <li align="left">Party - {repInfo[0].party} </li>
                    <li align="left">D.O.B - {repInfo[0].date_of_birth} </li>
                    <li align="left">Office - {repInfo[0].office} </li>
                    <li align="left">Office - {repInfo[0].phone} </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <h2 class="gridHeading">Voting Infomation</h2>
                  <ul>
                    <li align="left">
                      Election year - {repInfo[0].next_election}{" "}
                    </li>
                    <li align="left">
                      Total Votes Cast - {repInfo[0].total_votes}{" "}
                    </li>
                    <li align="left">
                      Missed Votes - {repInfo[0].missed_votes}{" "}
                    </li>
                    <li align="left">
                      Missed Votes Percentage - {repInfo[0].missed_votes_pct}{" "}
                    </li>
                    <li align="left">
                      Votes With Party Percentage -{" "}
                      {repInfo[0].votes_with_party_pct}{" "}
                    </li>
                    <li align="left">
                      Votes Against Party Percentage -{" "}
                      {repInfo[0].votes_against_party_pct}{" "}
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <Timeline
                    dataSource={{
                      sourceType: "profile",
                      screenName: repInfo[0].twitter_account
                    }}
                    options={{
                      username: "TomTillis",
                      height: "400"
                    }}
                    onLoad={() => console.log("Timeline is loaded!")}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>

          <div>
            <h2 className="title" align="left">
              State Senator
            </h2>
            <Grid className="Grid" container spacing={3} justify="center">
              <Grid item xs>
                <Paper>
                  <h2 class="gridHeading">
                    {this.state.userStateSen.data.officials[0].name}
                  </h2>
                  <ul>
                    <li align="left">
                      Party - {this.state.userStateSen.data.officials[0].party}
                    </li>
                    <li align="left">
                      Street -{" "}
                      {
                        this.state.userStateSen.data.officials[0].address[0]
                          .line1
                      }
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <h2 class="gridHeading">More Info</h2>
                  <ul>
                    <li>
                      Email -{" "}
                      {this.state.userStateSen.data.officials[0].emails[0]}
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <Timeline
                    dataSource={{
                      sourceType: "profile",
                      screenName: stateSenTwitter
                    }}
                    options={{
                      username: "TomTillis",
                      height: "400"
                    }}
                    onLoad={() => console.log("Timeline is loaded!")}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>

          <div>
            <h2 className="title" align="left">
              State Representative
            </h2>

            <Grid className="Grid" container spacing={3} justify="center">
              <Grid item xs>
                <Paper>
                  <h2 class="gridHeading">
                    {this.state.userStateRep.data.officials[0].name}
                  </h2>
                  <ul>
                    <li align="left">
                      Party - {this.state.userStateRep.data.officials[0].party}
                    </li>
                    <li align="left">
                      Street -{" "}
                      {
                        this.state.userStateRep.data.officials[0].address[0]
                          .line1
                      }
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <h2>More info</h2>
                  <ul>
                    <li>
                      Email -{" "}
                      {this.state.userStateRep.data.officials[0].emails[0]}
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <Timeline
                    dataSource={{
                      sourceType: "profile",
                      screenName: stateRepTwitter
                    }}
                    options={{
                      username: "TomTillis",
                      height: "400"
                    }}
                    onLoad={() => console.log("Timeline is loaded!")}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <br></br>
          <Container maxWidth="md">
            <TextField
              id="outlined-textarea"
              label="Want to add another congress member? Enter their name here"
              placeholder="Enter Here"
              multiline
              size="small"
              fullWidth
              variant="filled"
              value={this.state.textFieldValue}
              onChange={this._handleTextFieldChange}
            />
          </Container>

          <br></br>

          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={this._showMessage.bind(null, true)}
            >
              Show Member
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this._showMessage.bind(null, false)}
            >
              Hide Member
            </Button>
            {this.state.showMessage && (
              //search
              <div>
                <Grid className="Grid" container spacing={3} justify="center">
                  <Grid item xs>
                    <Paper>
                      <h2 className="gridHeading">
                        {searchRep[0].first_name + " " + searchRep[0].last_name}
                      </h2>
                      <ul>
                        <li align="left">Party - {searchRep[0].party} </li>
                        <li align="left">
                          D.O.B - {searchRep[0].date_of_birth}{" "}
                        </li>
                        <li align="left">Office - {searchRep[0].office} </li>
                        <li align="left">Office - {searchRep[0].phone} </li>
                      </ul>
                    </Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper>
                      <h2 class="gridHeading">Voting Infomation</h2>
                      <ul>
                        <li align="left">
                          Election year - {searchRep[0].next_election}{" "}
                        </li>
                        <li align="left">
                          Total Votes Cast - {searchRep[0].total_votes}{" "}
                        </li>
                        <li align="left">
                          Missed Votes - {searchRep[0].missed_votes}{" "}
                        </li>
                        <li align="left">
                          Missed Votes Percentage -{" "}
                          {searchRep[0].missed_votes_pct}{" "}
                        </li>
                        <li align="left">
                          Votes With Party Percentage -{" "}
                          {searchRep[0].votes_with_party_pct}{" "}
                        </li>
                        <li align="left">
                          Votes Against Party Percentage -{" "}
                          {searchRep[0].votes_against_party_pct}{" "}
                        </li>
                      </ul>
                    </Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper>
                      <Timeline
                        dataSource={{
                          sourceType: "profile",
                          screenName: searchRep[0].twitter_account
                        }}
                        options={{
                          username: "TomTillis",
                          height: "400"
                        }}
                        onLoad={() => console.log("Timeline is loaded!")}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => app.auth().signOut()}
          >
            Sign Out
          </Button>
          <br></br>

          <div>{searchRep.first_name}</div>
        </div>
      );
    }
  }
}

export default RepRequest;
