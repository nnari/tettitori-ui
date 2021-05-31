import { Link } from "react-router-dom";
import {
  Segment,
  Container,
  Grid,
  List,
  Header,
  Divider,
  Image,
} from "semantic-ui-react";

export const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Lisää linkkejä" />
            <List link inverted>
              <List.Item as="a" href="https://github.com/nnari/tettitori-api">
                Rajapinta
              </List.Item>
              <List.Item as="a" href="https://github.com/nnari/tettitori-ui">
                UI
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={10} textAlign="center">
            <Grid.Row>
              <Header
                inverted
                as="a"
                size="small"
                href="/PrivacyPolicy.pdf"
                content="Tietosuojaseloste"
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <List horizontal inverted divided link size="small" target="_blank">
          <List.Item as="a" href="https://github.com/nnari">
            Tatu Pesonen {new Date().getFullYear()}
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};
