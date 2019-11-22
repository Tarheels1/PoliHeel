import React, { Component } from "react";
import app from "../config/base";

const User = () => {
  return (
    <div>
      <h1>User Page!</h1>
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
    </div>
  );
};

export default User;
