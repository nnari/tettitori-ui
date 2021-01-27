import React, { useReducer, useState, useEffect } from 'react';
import { Card, Segment, Header, Container, Divider, Button, Form } from 'semantic-ui-react';
import { DegreeLabelGroup } from './Degree/DegreeLabelGroup';
import {
  useFormik
} from 'formik';

//Import JobAddForm component
import { JobAddForm } from './JobAddForm';

interface Props {
  jobs: Job[],
  degrees: Degree[],
  user: User,
}

const onSubmit = () => {
  console.log("fuck");
};

const init = (initialJobs: Job[]) => {
  return initialJobs.map((job: Job, idx: number) => (
    {
      relevantDegrees: job.relevantDegrees,
      description: job.body.description,
      contactInfo: job.body.contactInfo,
      address: job.body.address,
      title: job.title,
      id: job._id ?? idx
    }
  ))
}

type Action =
  | { type: 'update' }
  | { type: 'add' }
  | { type: 'remove', payload: any };

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'remove':
      console.log(`payload id: ${action.payload.id}`)
      return state.filter((job: any) => job.id !== action.payload.id);
    case 'add':
      console.log('add event');

      return [
        ...state,
        {
          title: "Uusi tettipaikka",
          body: "Uuden tettipaikan kuvaus",
          id: state.length,
        }
      ]
  }
}

export const JobEditView = ({ jobs, degrees, user }: Props) => {
  const [state, dispatch] = useReducer(reducer, jobs, init);

  const handleDelete = (action: Action) => {
    return dispatch(action);
  }

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as='h1'>Lisää uusi tettipaikka</Header>
      <JobAddForm degrees={degrees} user={user} />
      <Divider />
      <Header as='h1'>Omat listatut tettipaikat</Header>
      {
        state.map((job: any, idx: number) => (
          <Segment key={job.id}>
              <Header as='h1'>{job.title}</Header>
              <Divider />
              <p>{job.description}</p>
              <Button color='red' onClick={() => handleDelete({ type: 'remove', payload: { id: job.id } })}>Poista tämä tettipaikka</Button>
          </Segment>
        ))
      }
    </Container >
  );
}
