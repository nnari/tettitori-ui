import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  Card,
  Segment,
  Header,
  Placeholder,
  Grid,
  Embed,
} from "semantic-ui-react";
import { DegreeLabelGroup } from "./Degree/DegreeLabelGroup";
import JobService from "../Services/JobService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const JobFullView = () => {
  const [job, setJob] = useState<Job>({} as Job);
  const [loading, setLoading] = useState(true);
  const [gmapsUri, setGmapsUri] = useState("");
  const query = useQuery();

  useEffect(() => {
    const id = query.get("id");
    console.log(id);
    JobService.getSingleJob(id)?.then((j) => {
      setJob(j);
      // Destructure city, zipcode and streetaddress for use with gmaps
      const {
        body: {
          address: { city, zipcode, streetaddress },
        },
      } = j;

      //Only show embed if we have all the fields
      if (city && zipcode && streetaddress) {
        const unencodedUri = `${streetaddress}, ${zipcode}, ${city}`;
        const encodedUri = encodeURIComponent(unencodedUri);
        setGmapsUri(encodedUri);
      }
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
      {job.body.contactInfo.email && job.body.contactInfo.phoneNumber && (
        <>
          <Header as="h3">Yhteystiedot</Header>
          <p>{`${job.body.contactInfo.phoneNumber}, ${job.body.contactInfo.email}`}</p>
        </>
      )}
      {job.body.address.streetaddress &&
        job.body.address.zipcode &&
        job.body.address.city && (
          <>
            <Header as="h3">Osoite</Header>
            <p>{`${job.body.address.streetaddress}, ${job.body.address.zipcode}, ${job.body.address.city}`}</p>
          </>
        )}
      {job.body.additionalInfo && (
        <>
          <Header as="h3">Lisätiedot</Header>
          <p>{`${job.body.additionalInfo}`}</p>
        </>
      )}
      {/* Map */}
      {gmapsUri !== "" ? (
        <>
          <Header as="h2" content="Tettipaikka kartalla" />
          <Embed
            defaultActive
            url={`https://maps.google.com/maps?q=${gmapsUri}&output=embed&z=15`}
          />
        </>
      ) : (
        <Header
          as="h3"
          content="Tettipaikka ei ole lisännyt osoitetietoja, karttaa ei ole saatavilla."
        />
      )}
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
