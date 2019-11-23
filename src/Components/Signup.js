import React, { useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
//import { app } from "firebase";
import app from "../config/base.js";

import { withRouter } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        PoliHeel
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const usStates = [
  {
    value: "AL",
    label: "Alabama"
  },
  {
    value: "AK",
    label: "Alaska"
  },
  {
    value: "AZ",
    label: "Arizona"
  },
  {
    value: "AR",
    label: "Arkansas"
  },
  {
    value: "CA",
    label: "California"
  },
  {
    value: "CO",
    label: "Colorado"
  },
  {
    value: "CT",
    label: "Connecticut"
  },
  {
    value: "DE",
    label: "Delaware"
  },
  {
    value: "DC",
    label: "Distric of Columbia"
  },
  {
    value: "FL",
    label: "Florida"
  },
  {
    value: "GA",
    label: "Georgia"
  },
  {
    value: "HI",
    label: "Hawaii"
  },
  {
    value: "ID",
    label: "Idaho"
  },

  {
    value: "IL",
    label: "Illinois"
  },
  {
    value: "IN",
    label: "Indiana"
  },
  {
    value: "IA",
    label: "Iowa"
  },
  {
    value: "KS",
    label: "Kansas"
  },
  {
    value: "KY",
    label: "Kentucky"
  },
  {
    value: "LA",
    label: "Louisiana"
  },
  {
    value: "ME",
    label: "Maine"
  },
  {
    value: "MD",
    label: "Maryland"
  },
  {
    value: "MA",
    label: "Massachusetts"
  },
  {
    value: "MI",
    label: "Michigan"
  },
  {
    value: "MN",
    label: "Minnesota"
  },
  {
    value: "MS",
    label: "Mississippi"
  },
  {
    value: "MO",
    label: "Missouri"
  },
  {
    value: "MT",
    label: "Montana"
  },
  {
    value: "NE",
    label: "Nevada"
  },
  {
    value: "NH",
    label: "New Hampshire"
  },
  {
    value: "NJ",
    label: "New Jersey"
  },
  {
    value: "NM",
    label: "New Mexico"
  },
  {
    value: "NY",
    label: "New York"
  },
  {
    value: "NC",
    label: "North Carolina"
  },
  {
    value: "ND",
    label: "North Dakota"
  },
  {
    value: "OH",
    label: "Ohio"
  },
  {
    value: "OK",
    label: "Oklahoma"
  },
  {
    value: "OR",
    label: "Oregon"
  },
  {
    value: "PA",
    label: "Pennsylvania"
  },
  {
    value: "RI",
    label: "Rhode Island"
  },
  {
    value: "SC",
    label: "South Carolina"
  },
  {
    value: "SD",
    label: "South Dakota"
  },
  {
    value: "TN",
    label: "Tennessee"
  },
  {
    value: "TX",
    label: "Texas"
  },
  {
    value: "UT",
    label: "Utah"
  },
  {
    value: "VT",
    label: "Vermont"
  },
  {
    value: "VA",
    label: "Virgina"
  },
  {
    value: "WA",
    label: "Washington"
  },
  {
    value: "WV",
    label: "West Virgina"
  },
  {
    value: "WI",
    label: "Wisconsin"
  },
  {
    value: "WY",
    label: "Wyoming"
  }
];

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = ({ history }) => {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("AL");
  const handleChange = event => {
    setCurrency(event.target.value);
  };

  let db = app.firestore();

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();

      const {
        email,
        password,
        firstName,
        lastName,
        street,
        state,
        zipCode
      } = event.target.elements;

      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        let user = app.auth().currentUser;
        db.collection("user")
          .doc(user.uid)
          .set({
            FirstName: firstName.value,
            LastName: lastName.value,
            Street: street.value,
            State: state.value,
            ZipCode: zipCode.value
          });

        history.push("/User");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  //var userUID;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autofoucs
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="street"
                label="123 Main Drive"
                name="street"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select State"
                name="state"
                fullWidth
                className={classes.textField}
                value={currency}
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                variant="outlined"
              >
                {usStates.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zipCode"
                label="Zip"
                name="lastName"
                autoComplete="zipcode"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withRouter(SignUp);
