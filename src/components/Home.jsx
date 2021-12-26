import React from "react";

export default function Home(props) {
  return (
    <div className="landing">
      <h1> Welcome to IndianCinemaDAO </h1>
      <button onClick={props.clickHandler} className="btn-hero">
        Connect your wallet
      </button>
    </div>
  );
}
