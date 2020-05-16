/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchedMember from "./SearchedMember";
import Fade from "@material-ui/core/Fade";

function SearchBar({ mems, membersData }) {
  const [membersNames, setMembersNames] = useState([]);
  const [allMemberinfo, setAllMemberInfo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState();
  const [showResult, setShowResults] = useState(false);
  const [checked, setChecked] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    let sens = mems.senators.map((sen) => sen.first_name + " " + sen.last_name);
    let reps = mems.representatives.map(
      (rep) => rep.first_name + " " + rep.last_name
    );

    const names = sens.concat(reps);
    setMembersNames(names);
  }

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      setShowResults(true);
    }
  }

  return (
    <div>
      <Autocomplete
        onClick={handleClick}
        id="combo-box-demo"
        options={membersNames}
        getOptionLabel={(option) => option}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setShowResults(false);
        }}
        onKeyDown={handleKeyDown}
        renderInput={(params) => (
          <TextField {...params} label="Select a Member" variant="outlined" />
        )}
      />
      <br></br>

      {showResult ? (
        <SearchedMember member={value} membersData={membersData} />
      ) : null}
    </div>
  );
}

export default SearchBar;
