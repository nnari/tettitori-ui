import React, { useReducer, useState, useEffect } from "react";
import {
  Card,
  Segment,
  Header,
  Container,
  Divider,
  Button,
  Form,
} from "semantic-ui-react";
import { DegreeLabelGroup } from "./Degree/DegreeLabelGroup";
import { useFormik } from "formik";

//Import JobAddForm component
import { JobAddForm } from "./JobAddForm";
import JobService from "../Services/JobService";

interface Props {
  jobs: Job[];
  degrees: Degree[];
  orientations: ActivityOrientation[];
  user: User;
}

type Action =
  | { type: "update" }
  | { type: "add" }
  | { type: "remove"; payload: any };

const reducer = (state: any, action: Action) => {
  console.log("call in reducer");
  switch (action.type) {
    case "remove":
      return state.filter((job: any) => job.id !== action.payload.id);
    case "add":
      console.log("add event");

      return [
        ...state,
        {
          title: "Uusi tettipaikka",
          body: "Uuden tettipaikan kuvaus",
          id: state.length,
        },
      ];
  }
};

export const JobEditView = ({ jobs, degrees, user, orientations }: Props) => {
  const init = (initialJobs: Job[]) => {
    return initialJobs
      .filter((j) => j.authorDisplayName === user.username)
      .map((job: Job, idx: number) => ({
        relevantDegrees: job.relevantDegrees,
        description: job.body.description,
        contactInfo: job.body.contactInfo,
        address: job.body.address,
        title: job.title,
        id: job._id ?? idx,
      }));
  };

  const [state, dispatch] = useReducer(reducer, jobs, init);

  const handleDelete = (e: Event, action: Action) => {
    dispatch(action);
    if (action.type === "remove") {
      JobService.deleteJob(action.payload.id, user);
    }
  };

  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h1">Lisää uusi tettipaikka</Header>
      <JobAddForm degrees={degrees} user={user} orientations={orientations} />
      <Divider />
      <Header as="h1">Omat listatut tettipaikat</Header>
      {state.length !== 0 ? (
        state.map((job: any, idx: number) => (
          <Segment key={job.id}>
            <Header as="h1">{job.title}</Header>
            <Divider />
            <p>{job.description}</p>
            <Button
              color="red"
              onClick={(e: any) =>
                handleDelete(e, { type: "remove", payload: { id: job.id } })
              }
            >
              Poista tämä tettipaikka
            </Button>
          </Segment>
        ))
      ) : (
        <p>
          Et ole vielä lisännyt yhtään tettipaikkaa. Voit lisätä uuden
          tettipaikan käyttämällä sivun yläosassa sijaitsevaa kenttää.
        </p>
      )}
    </Container>
  );
};
