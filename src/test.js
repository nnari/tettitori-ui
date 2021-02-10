import React, { useReducer } from "react";
import {
  Card,
  Segment,
  Header,
  Button,
  TextArea,
  Form,
  Container,
} from "semantic-ui-react";

const init = (initialJobs) => {
  return { count: initialCount };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "remove":
      console.log(`payload id: ${action.payload._id}`);
      return state.filter((job) => job._id !== action.payload._id);
    case "add":
      console.log("add event");
      return [
        ...state,
        {
          title: "Uusi tettipaikka",
          body: "Uuden tettipaikan kuvaus",
        },
      ];
  }
};

export const JobEditView = ({ jobs }) => {
  const [state, dispatch] = useReducer(reducer, jobs, init);
  return (
    <Container style={{ marginTop: "6em" }}>
      <Header as="h1">Omat listatut tettipaikat</Header>
      <Button color="green" onClick={() => dispatch({ type: "add" })}>
        Lisää uusi tettipaikka
      </Button>
      {state.map((job, idx) => (
        <Segment key={idx}>
          <Form>
            {job.title}
            <Button
              color="red"
              floated="right"
              onClick={() => dispatch({ type: "remove", payload: job })}
            >
              Poista tämä tettipaikka
            </Button>
          </Form>
        </Segment>
      ))}
    </Container>
  );
};
