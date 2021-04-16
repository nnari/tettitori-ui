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
import { AdminView } from "./AdminView";
import { CompanyInfoPage } from "./CompanyInfoPage";
interface Props {
  handleAccessToken: (accessToken: string) => void;
  handleLogOut: () => void;
  jobs: Job[];
  degrees: Degree[];
  orientations: ActivityOrientation[];
  loading: boolean;
  user: User;
  favorites?: Favorite[];
  isAuthenticated: boolean;
  isAdmin: boolean;
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
  isAdmin,
  orientations,
}: Props) => {
  const [filtered, setFiltered] = useState<Job[]>([]);
  console.log("user is admin: ", isAdmin);
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
                  Hämeenlinnan Tettilässä listatut työharjoittelupaikat
                </Header>
                <Header as="h2">
                  Tettilä on Hämeenlinnan ja lähiseudun nuorille tarkoitettu
                  palvelu, josta voit löytää itsellesi TET-paikan.
                </Header>
                {/* Commented out for now because there is no use for orientations as of now */}
                {/* <Searchbar
                  orientations={orientations}
                  jobs={jobs}
                  setFiltered={setFiltered}
                /> */}
                {/* Transition, show only loader if still loading. */}
                {loading && renderLoader()}

                <Transition.Group animation={"fade in"} duration={1500}>
                  {!loading && (
                    <Container
                      fluid
                      style={{
                        width: "100% !important",
                        marginLeft: "1em!important",
                        marginRight: "1em!important",
                      }}
                    >
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
          <Route
            path="/admin"
            render={() =>
              user?.role === "admin" && isAuthenticated ? (
                <AdminView user={user} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/companies" render={() => <CompanyInfoPage />} />
          <Route path="/">
            <FrontPage jobs={jobs} />
          </Route>
        </Switch>
        <Footer />
      </Router>
      <Snackbar timeout={6000} />
    </div>
  );
};

export default ListPageLayout;
