import React from 'react'
import {
  Container,
  Header, Image
} from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { JobListGroup } from './JobListGroup';

//Import Components
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { JobEditView } from './JobEditView';
import { Hero } from './Hero'

interface Props {
  handleAccessToken: (accessToken: string) => void,
  handleLogOut: () => void,
  jobs: Job[],
  loading: boolean,
  user: User,
}

const HomepageLayout = ({ handleAccessToken, jobs, user, handleLogOut }: Props) => {
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
          <Route path='/profile'>
            <JobEditView jobs={jobs} user={user} />
          </Route>
          <Route path='/'>
            <Container style={{ marginTop: '2em' }}>
              <Header as='h1'>Hämeenlinnan Tettitorissa listatut työssäoppipaikat</Header>
              <p>Fixed container</p>
              <p>
                Single column paragraph
              </p>
              <JobListGroup jobs={jobs} />
            </Container>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default HomepageLayout
