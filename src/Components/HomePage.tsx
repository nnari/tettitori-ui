import React, { useState, useEffect } from 'react'
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from 'semantic-ui-react'
import {
  BrowserRouter as Router
} from 'react-router-dom';
import JobService from '../Services/JobService';
import { JobListView } from '../Components/JobListView';

//Import Components
import { NavBar } from './NavBar';
import { Footer } from './Footer';

interface Props {
  handleAccessToken: (accessToken: string) => void,
  handleLogOut: () => void,
  jobs: Job[],
  loading: boolean,
  user: User,
}

const HomepageLayout = ({handleAccessToken, jobs, user, handleLogOut}: Props) => {

  return (
    <div className="wrapper">
      <Router>
      <NavBar 
      user={user}
      handleAccessToken={handleAccessToken} 
      position='top'
      handleLogOut={handleLogOut}/>
      

      <Container style={{ marginTop: '7em' }}>
        <Header as='h1'>Hämeenlinnan Tettitorissa listatut työssäoppipaikat</Header>
        <p>Fixed container</p>
        <p>
          Single column paragraph
        </p>
        <JobListView jobs={jobs} />
      </Container>
      <Footer/>
      </Router>
    </div>
  )
}

export default HomepageLayout