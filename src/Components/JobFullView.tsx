import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Card, Segment, Header, Placeholder, Grid } from "semantic-ui-react";
import { DegreeLabelGroup } from "./Degree/DegreeLabelGroup";
import JobService from "../Services/JobService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const JobFullView = () => {
  const [job, setJob] = useState<Job>({} as Job);
  const [loading, setLoading] = useState(true);
  const query = useQuery();

  useEffect(() => {
    const id = query.get("id");
    console.log(id);
    JobService.getSingleJob(id)?.then((j) => {
      console.log(j);
      setJob(j);
      setLoading(false);
    });
  }, []);

  return !loading && job.author !== undefined ? (
    <Segment>
      <Grid columns="equal">
        <Grid.Column floated="left">
          <Header as="h2">{job.title}</Header>
        </Grid.Column>
        <Grid.Column floated="right" textAlign="right">
          <Header as="h3">{job.companyName}</Header>
        </Grid.Column>
      </Grid>
      <Header as="h3">Tettipaikan kuvaus</Header>
      <p>{job.body.description}</p>
      <Header as="h3">Yhteystiedot</Header>
      <p>{`${job.body.contactInfo.phoneNumber}, ${job.body.contactInfo.email}`}</p>
      <Header as="h3">Osoite</Header>
      <p>{`${job.body.address.streetaddress}, ${job.body.address.zipcode}, ${job.body.address.city}`}</p>
      <Card.Content>
        <DegreeLabelGroup degrees={job.relevantDegrees} limit={100} />
      </Card.Content>
    </Segment>
  ) : (
    renderPlaceHolder()
  );
};

const renderPlaceHolder = () => (
  <Segment>
    <Placeholder>
      {/* Title header */}
      <Placeholder.Header>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      {/* Description header */}
      <Placeholder.Header>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      {/* Description */}
      <Placeholder.Paragraph>
        <Placeholder.Line length="very long" />
        <Placeholder.Line length="very long" />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  </Segment>
);
