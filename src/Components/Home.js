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

function Home() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      );
      await sleep(1e3); // For demo purposes.
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map(key => countries[key].item[0]));
      }
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
            getOptionLabel={option => option.name}
            options={options}
            loading={loading}
            renderInput={params => (
              <TextField
                {...params}
                label="Enter Congress Member Here"
                fullWidth
                variant="outlined"
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
      </section>
    </div>
  );
}

export default Home;
