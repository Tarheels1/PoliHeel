import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [memberPicture, setMemberPicture] = useState();
  const [loading, setLoading] = useState(true);
  let testing = "A000360";
  let url = "https://theunitedstates.io/images/congress/225x275/";
  let urlEnding = ".jpg";
  let combine = url + testing + urlEnding;

  console.log(memberPicture);

  if (!loading) {
    return <div>loading</div>;
  } else {
    return (
      <div>
        <img src={combine}></img>
      </div>
    );
  }
}

export default Test;
