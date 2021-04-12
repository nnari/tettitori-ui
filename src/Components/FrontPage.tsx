import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Divider,
  Header,
  Segment,
  Image,
  Button,
} from "semantic-ui-react";

/* Import images we will use in this component
   Slightly dirty, but we aren't dealing with that many images.
*/
import Img1 from "../Images/carousel/1.jpg";
import Img2 from "../Images/carousel/2.jpg";
import Img3 from "../Images/carousel/3.jpg";

export const FrontPage = ({ jobs }: { jobs: Job[] }) => {
  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h1" style={{ fontSize: "4.5em", textAlign: "center" }}>
        Tettilä
      </Header>
      <Divider />
      <Segment clearing id="frontpage-info">
        <Image src={Img1} size="medium" floated="left" />
        <p>
          <b>Tettilä</b> on Hämeenlinnan ja lähiseudun nuorille tarkoitettu
          palvelu josta voit löytää itsellesi TET-paikan.
        </p>
        <p>
          Palvelussa Hämeen alueen yritykset voivat listata mahdolliset
          tettipaikat sekä niihin liittyvää informaatiota.
        </p>
        <Link to="/paikat">
          <Button size="large" color="blue">
            Tettiläiselle
          </Button>
        </Link>
        <Link to="/companies">
          <Button size="large" color="blue">
            Yrityksille
          </Button>
        </Link>
      </Segment>
    </Container>
  );
};
