import React, { useEffect, useState, useRef } from "react";
import { Dropdown, Form, Segment, Button, Message } from "semantic-ui-react";
import { LOGIN_URL } from "../Utility/Endpoints";

interface Props {
  handleAccessToken: (accessToken: string) => void;
}

export const LoginFormDropdown = ({ handleAccessToken }: Props) => {
  //Store login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(`Username: ${username}, password: ${password}`);
  }, [username, password]);

  const submitLoginData = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const { accessToken } = await response.json();
    handleAccessToken(accessToken);
  };

  return (
    <Dropdown direction="left" text="Kirjaudu sisään" closeOnEscape={false}>
      <Dropdown.Menu>
        <Form>
          <Segment stacked>
            <Form.Input
              icon="user"
              placeholder="Käyttäjätunnus"
              onClick={(e: any) => e.stopPropagation()}
              onChange={(e: any) => setUsername(e.target.value)}
            />
            <Form.Input
              icon="lock"
              type="password"
              placeholder="Salasana"
              onClick={(e: any) => e.stopPropagation()}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={(e: any) => submitLoginData(e)}>
              Submit
            </Button>
            {
              <Message
                error
                color="red"
                visible={error !== ""}
                header="Sisäänkirjautuminen epäonnistui"
                content="Tarkistitko että kirjoitit käyttäjätunnuksen sekä salasanan oikein?"
              />
            }
          </Segment>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};
