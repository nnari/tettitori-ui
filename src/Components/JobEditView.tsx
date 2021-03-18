import React, { useReducer, useState, useEffect } from "react";
import {
  Card,
  Segment,
  Header,
  Container,
  Divider,
  Button,
  Form,
  Confirm,
} from "semantic-ui-react";
import { DegreeLabelGroup } from "./Degree/DegreeLabelGroup";
import { useFormik } from "formik"; import { Link } from "react-router-dom";

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
  const [isConfirming, setIsConfirming] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState("");

  const handleDelete = (action: Action) => {
    dispatch(action);
    if (action.type === "remove") {
      JobService.deleteJob(action.payload.id, user);
    }
  };

  //#region Confirm handlers
  const handleConfirmCancel = () => {
    setIsConfirming(false);
  };

  const handleDeleteConfirm = () => {
    handleDelete({ type: "remove", payload: { id: deleteTarget } });
    setIsConfirming(false);
  };

  const handleShowConfirm = (jobId: any) => {
    setDeleteTarget(jobId);
    setIsConfirming(true);
  };
  //#endregion

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
            <Button.Group fluid>
              <Button
                color="blue"
                as={Link}
                to={`/paikka?id=${job.id}`}
                content="Katsele paikkaa"
                icon="search"
              />
              <Button.Or text="tai" />
              <Button
                color="red"
                onClick={(e: any) => handleShowConfirm(job.id)}
                content="Poista tämä tettipaikka"
                icon="trash"
              />
            </Button.Group>
          </Segment>
        ))
      ) : (
        <p>
          Et ole vielä lisännyt yhtään tettipaikkaa. Voit lisätä uuden
          tettipaikan käyttämällä sivun yläosassa sijaitsevaa kenttää.
        </p>
      )}
      <Confirm
        cancelButton="Ei, haluan pitää tettipaikan näkyvillä."
        confirmButton="Kyllä, haluan poistaa tämän tettipaikan Tettilästä."
        content="Jos poistat Tettipaikan ja haluat lisätä sen myöhemmin uudelleen, sinun pitää kirjoittaa sen tiedot uudestaan."
        open={isConfirming}
        onCancel={handleConfirmCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};
