import React from "react";
import { Segment } from "semantic-ui-react";
import headerImage from "../Images/linna.jpg";

export const Hero = () => (
  <Segment
    inverted
    textAlign="center"
    style={{
      marginTop: "3em",
      minHeight: "14em",
      padding: "1em 0em",
      backgroundImage: `url(${headerImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    vertical
  ></Segment>
);
