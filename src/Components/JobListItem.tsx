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
  descriptionPreviewLength?: number;
}

export const JobListItem = ({ job, descriptionPreviewLength = 300 }: Props) => {
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
        {/* Truncate description */}
        {job.body.description.length > descriptionPreviewLength ? (
          <p>{`${job.body.description.substring(
            0,
            descriptionPreviewLength
          )} ...`}</p>
        ) : (
          <p>{job.body.description}</p>
        )}
        <ActivityOrientationLabelGroup
          activityOrientations={job.relevantOrientations}
        />
        <DegreeLabelGroup degrees={job.relevantDegrees} limit={100} />
        <Button
          as={Link}
          fluid
          color="black"
          style={{ marginTop: "1em" }}
          icon="search"
          to={`/paikka?id=${job._id}`}
          content="Katsele paikan tietoja"
        />
      </Segment>
    </>
  );
};
