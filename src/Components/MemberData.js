import React, { useEffect, useState } from "react";
import axios from "axios";
/* 
Federal Congress
    2 state senators
    1 Representative
State
    1 state senator
    1 Representative
*/
function MemberData() {
  const [fedSen, setFedSen] = useState([]);
  // const [fedRep, setFedRep] = null;
  // const [stateSen, setStateSen] = null;
  // const [stateRep, setStateRep] = null;

  /*
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBbGJ3XcM9-XacuimgHWxbeJb3FPkZydsY`,
        {
          params: {
            address: "27613",
            includeOffices: true,
            levels: "country",
            roles: "legislatorLowerBody",
          },
          headers: {
            Accept: "application / json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
*/
  useEffect(() => {
    axios
      .get(`https://api.propublica.org/congress/v1/116/senate/members.json`, {
        headers: {
          "X-API-Key": "9wGKmWl3kNiiSqesJf74uGl0PtStbcP2mEzSvjxv",
          Accept: "application / json",
        },
      })

      .then((result) => {
        setFedSen(result.data);
      }, []);
  });
  console.log(fedSen);
  return <div>hello</div>;
}

export default MemberData;
