import React from "react";
import { Link } from "react-router-dom";
import {
  Header,
  Container,
  Divider,
  Segment,
  Button,
  Grid,
} from "semantic-ui-react";
import { ActivityOrientationLabelGroup } from "./ActivityOrientation/ActivityOrientationLabelGroup";
import { DegreeLabelGroup } from "./Degree/DegreeLabelGroup";

interface Props {
  job: Job;
}

export const JobListItem = ({ job }: Props) => {
  return (
    <>
      <Segment>
        <Grid columns="equal">
          <Grid.Column floated="left">
            <Header as="h2">{job.title}</Header>
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right">
            <Header as="h3">{job.companyName}</Header>
          </Grid.Column>
        </Grid>

        <Divider />
        <p>{job.body.description}</p>
        <ActivityOrientationLabelGroup
          activityOrientations={job.relevantOrientations}
        />
        <DegreeLabelGroup degrees={job.relevantDegrees} limit={100} />
        <Button
          as={Link}
          fluid
          color="black"
          style={{ marginTop: "1em" }}
          to={`/paikka?id=${job._id}`}
        >
          Katsele paikan tietoja
        </Button>
      </Segment>
    </>
  );
};
