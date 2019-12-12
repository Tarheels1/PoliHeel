import React from "react";
import "../App.css";
import Background from "../uncpic1.jpg";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import "isomorphic-fetch";
import Container from "@material-ui/core/Container";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import shadows from "@material-ui/core/styles/shadows";
import { black } from "material-ui/styles/colors";
import { fontFamily } from "@material-ui/system";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Portal from "@material-ui/core/Portal";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

var sectionStyle = {
  height: "700px",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  overflow: "hidden",
  opacity: "1"
};

let headingStyle = {
  display: "block",
  fontSize: "90px",
  fontWeight: "bold"
};

let textStyle = {
  color: "white",
  padding: "20px",
  display: "block",
  fontSize: "20px"
};

const useStyles = makeStyles(theme => ({
  alert: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0)
  }
}));

function Home({ history }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [congress, setCongress] = React.useState([]);
  const loading = open && options.length === 0;
  const [members, setMembers] = React.useState([]);
  const [userSearch, setUserSearch] = React.useState([]);
  const [memberToDisplay, setMemberTodisplay] = React.useState([]);
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);
  const [allData, setAllData] = React.useState([]);

  const handleNewClick = () => {
    setShow(!show);
  };
  function handleClick(e) {
    let value = e.target.value;
  }

  function toDisplay() {
    return (
      <div>
        <h2>hi</h2>
      </div>
    );
  }

  React.useEffect(() => {
    let active = true;
    let allMembers = [];
    let all = [];

    if (!loading) {
      return undefined;
    }

    (async () => {
      let response = await axios.get(
        `https://api.propublica.org/congress/v1/116/senate/members.json`,
        {
          headers: { "X-API-Key": "9wGKmWl3kNiiSqesJf74uGl0PtStbcP2mEzSvjxv" }
        }
      );

      let response2 = await axios.get(
        `https://api.propublica.org/congress/v1/116/house/members.json`,
        {
          headers: { "X-API-Key": "9wGKmWl3kNiiSqesJf74uGl0PtStbcP2mEzSvjxv" }
        }
      );

      let data = response.data.results[0].members;
      let data2 = response2.data.results[0].members;

      for (let i = 0; i < data.length; i++) {
        allMembers.push(data[i].first_name + " " + data[i].last_name);
        all.push(data[i]);
      }
      for (let i = 0; i < data2.length; i++) {
        allMembers.push(data2[i].first_name + " " + data2[i].last_name);
        all.push(data[i]);
      }
      setMembers(allMembers);
      setAllData(all);

      if (active) {
        setOptions(allMembers);
      }

      //setCongress(data);
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div>
      <section className="image" style={sectionStyle}>
        <h1 className="heading" style={headingStyle}>
          Welcome to PoliHeel!
        </h1>
        <Typography className="regular" variant="subtitle1" style={textStyle}>
          To search a member of congress enter their name below.
          <br></br>
          Or signup to view all your federal and local officials!
        </Typography>

        <Container
          className="contain"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Autocomplete
            id="search"
            style={{
              width: "50%",
              backgroundColor: "white",
              overflow: "hidden",
              borderRadius: 10
            }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionLabel={option => option}
            options={options}
            loading={loading}
            renderInput={params => (
              <TextField
                {...params}
                label="Enter Congress Member Here"
                fullWidth
                variant="outlined"
                inputValue
                onChange={handleClick}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  )
                }}
              />
            )}
          />
        </Container>
        <br></br>
        <div>
          <Button
            variant="contained"
            className="button"
            color="primary"
            onClick={handleNewClick}
          >
            {show ? "Unmount children" : "Search Member"}
          </Button>
          <div className={classes.alert}>
            {show ? (
              <Portal container={container.current}>
                <span>{userSearch}</span>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=12</Paper>
                  </Grid>
                </Grid>
              </Portal>
            ) : null}
          </div>
          <div className={classes.alert} ref={container} />
        </div>
      </section>
    </div>
  );
}

export default Home;
