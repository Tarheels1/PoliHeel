import React, { useEffect, useState } from "react";
import RenderToLayer from "material-ui/internal/RenderToLayer";
import axios from "axios";
import SearchBar from "../SearchBar";

//need member location to come in state and zip?
//have then after return members
function MemberSearch() {
  const [fedMembers, setFedMembers] = useState({
    senators: [],
    representatives: [],
  });

  //sets federal congress members
  useEffect(() => {
    const fetchData = async () => {
      const fedSens = await axios.get(
        `https://api.propublica.org/congress/v1/116/senate/members.json`,
        {
          headers: {
            "X-API-Key": "9wGKmWl3kNiiSqesJf74uGl0PtStbcP2mEzSvjxv",
            Accept: "application/json",
          },
        }
      );

      const fedreps = await axios.get(
        `https://api.propublica.org/congress/v1/116/house/members.json`,
        {
          headers: {
            "X-API-Key": "9wGKmWl3kNiiSqesJf74uGl0PtStbcP2mEzSvjxv",
            Accept: "application/json",
          },
        }
      );

      setFedMembers({
        senators: fedSens.data.results[0].members,
        representatives: fedreps.data.results[0].members,
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <SearchBar mems={fedMembers.senators[0]} />
    </div>
  );
}

export default MemberSearch;
