import React, { useState } from "react";
import {
  Container,
  Dimmer,
  Divider,
  Header,
  Image,
  Loader,
  Placeholder,
  Segment,
  Transition,
} from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { JobListGroup } from "./JobListGroup";

//Import Components
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { JobEditView } from "./JobEditView";
import { JobFullView } from "./JobFullView";
import { Hero } from "./Hero";
import { Snackbar } from "./Snackbar";
import { FrontPage } from "./FrontPage";
import Searchbar from "./Searchbar";
import { render } from "@testing-library/react";
import { JsxElement } from "typescript";

interface Props {
  handleAccessToken: (accessToken: string) => void;
  handleLogOut: () => void;
  jobs: Job[];
  degrees: Degree[];
  orientations: ActivityOrientation[];
  loading: boolean;
  user: User;
  isAuthenticated: boolean;
}

const renderLoader = () => (
  <>
    <Segment>
      <Dimmer active>
        <Loader>Ladataan...</Loader>
      </Dimmer>
      {[1, 2, 3, 4].map((e: any, i: number) => (
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      ))}
    </Segment>
  </>
);

const ListPageLayout = ({
  handleAccessToken,
  jobs,
  degrees,
  user,
  loading,
  handleLogOut,
  isAuthenticated,
  orientations,
}: Props) => {
  const [filtered, setFiltered] = useState<Job[]>([]);

  return (
    <div className="wrapper">
      <Router>
        <NavBar
          user={user}
          handleAccessToken={handleAccessToken}
          position="top"
          handleLogOut={handleLogOut}
        />
        {/* idk let's try a banner here */}
        <Hero />
        <Switch>
          <Route
            path="/paikka"
            render={() => (
              <Container style={{ marginTop: "2em" }}>
                <JobFullView />
              </Container>
            )}
          />
          <Route
            path="/paikat"
            render={() => (
              <Container style={{ marginTop: "2em" }}>
                <Header as="h1">
                  Hämeenlinnan Tettilässä listatut työssäoppipaikat
                </Header>
                <Header as="h2">
                  Tettilä on Hämeenlinnan ja lähiseudun nuorille tarkoitettu
                  palvelu josta voit löytää itsellesi TET-paikan.
                </Header>
                <Searchbar
                  orientations={orientations}
                  jobs={jobs}
                  setFiltered={setFiltered}
                />
                {/* Transition, show only loader if still loading. */}
                {loading && renderLoader()}

                <Transition.Group animation={"fade in"} duration={1500}>
                  {!loading && (
                    <Container fluid>
                      <JobListGroup
                        jobs={filtered.length > 0 ? filtered : jobs}
                      />
                    </Container>
                  )}
                </Transition.Group>
              </Container>
            )}
          />
          <Route
            path="/profile"
            render={() =>
              isAuthenticated ? (
                <JobEditView
                  jobs={jobs}
                  degrees={degrees}
                  user={user}
                  orientations={orientations}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/">
            <FrontPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
      <Snackbar timeout={6000} />
    </div>
  );
};

export default ListPageLayout;
