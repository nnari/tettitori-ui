import { title } from 'process';
import React, { useReducer, useState, useEffect } from 'react';
import { Card, Segment, Header, Button, TextArea, Form, Container, Divider } from 'semantic-ui-react';
import { DegreeLabelGroup } from './Degree/DegreeLabelGroup';

interface Props {
  jobs: Job[]
  user: User,
}

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

export const JobEditView = ({ jobs }: Props) => {
  const [state, dispatch] = useReducer(reducer, jobs, init);
  const [isSettingNew, setIsSettingNew] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = () => {
    console.log(state);
    setIsSettingNew(true);
    return dispatch({ type: 'add', });
  }

  const handleDelete = (action: Action) => {
    setIsSettingNew(false);
    return dispatch(action);
  }

  const handleUpdate = () => {
    
  }

  useEffect(() => {
    console.log(state)
  }, [state])


  //handleDelete({type: 'remove', payload: { id: job.id}})

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as='h1'>Omat listatut tettipaikat</Header>
      <Button color='green' disabled={isSettingNew} onClick={handleClick}>Lisää uusi tettipaikka</Button>
      {
        state.map((job: any, idx: number) => (
          <Segment key={job.id}>
            <Form>
              <Header as='h1'>{job.title}</Header>
              <Divider />
              <p>{job.description}</p>
              <Button color='red' onClick={() => handleDelete({type: 'remove', payload: { id: job.id}})}>Poista tämä tettipaikka</Button>
            </Form>
          </Segment>
        ))
      }
    </Container >
  );
}
