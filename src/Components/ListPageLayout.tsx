import React from 'react'
import {
  Container,
  Header, Image
} from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { JobListGroup } from './JobListGroup';

//Import Components
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { JobEditView } from './JobEditView';
import { JobFullView } from './JobFullView';
import { Hero } from './Hero'
import { Snackbar } from './Snackbar';
import { FrontPage } from './FrontPage';


interface Props {
  handleAccessToken: (accessToken: string) => void,
  handleLogOut: () => void,
  jobs: Job[],
  degrees: Degree[],
  loading: boolean,
  user: User,
  isAuthenticated: boolean,
}

const ListPageLayout = ({ handleAccessToken, jobs, degrees, user, handleLogOut, isAuthenticated }: Props) => {
  console.log("Props in HomePage: ", isAuthenticated);
  return (
    <div className="wrapper">
      <Router>
        <NavBar
          user={user}
          handleAccessToken={handleAccessToken}
          position='top'
          handleLogOut={handleLogOut} />
        {/* idk let's try a banner here */}
        <Hero />
        <Switch>
        <Route path='/paikka' render={() => (
          <Container style={{ marginTop: '2em' }}>
          <JobFullView />
        </Container>
        )}/>
        <Route path='/paikat' render={() => (
          <Container style={{ marginTop: '2em' }}>
          <Header as='h1'>Hämeenlinnan Tettilässä listatut työssäoppipaikat</Header>
          <Header as='h2'>Tettilä on Hämeenlinnan ja lähiseudun nuorille tarkoitettu palvelu josta voit löytää itsellesi TET-paikan.</Header>
          <p>
            Single column paragraph
          </p>
          <JobListGroup jobs={jobs} />
        </Container>
        )}/>
          <Route path='/profile' render={() =>
              isAuthenticated
              ? <JobEditView jobs={jobs} degrees={degrees} user={user} />
              : <Redirect to='/' />} />
          <Route path='/'>
            <FrontPage/>
          </Route>
        </Switch>
        <Footer />
      </Router>
      <Snackbar timeout={6000}/>
    </div>
  )
}

export default ListPageLayout
