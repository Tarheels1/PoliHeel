import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FacebookIcon from "@material-ui/icons/Facebook";
import Link from "@material-ui/core/Link";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const preventDefault = (event) => event.preventDefault();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Quick Facts" {...a11yProps(0)} />
          <Tab label="Place Holder" {...a11yProps(1)} />
          <Tab label="Contact Information" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Next Election Year : {props.member.next_election}
        <br />
        Seniority: {props.member.seniority}
        <br />
        Leadership Role :{" "}
        {props.member.leadership_role
          ? props.member.leadership_role
          : "No current role"}
        <br />
        Party Voting Allegiance: {props.member.votes_with_party_pct} %
        <br />
        Missed Votes Percentage: {props.member.missed_votes_pct} %
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Office: {props.member.office}
        <br></br>
        Phone: {props.member.phone}
        <br></br>
        Fax: {props.memberfax ? props.memberfax : "no fax available"}
        <br></br>
        Facebook:
        <br></br>
        Instagram:
        <br></br>
        Twitter:
      </TabPanel>
    </div>
  );
}
