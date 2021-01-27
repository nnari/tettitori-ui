import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import decodejwt, { InvalidTokenError } from 'jwt-decode';

//Import services
import JobService from '../Services/JobService';
import DegreeService from '../Services/DegreeService';
import { Console } from 'console';

const App = () => {
  //We want to be storing global state here
  const [user, setUser] = useState<User>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    JobService.getAllJobs().then(jobs => {
      setJobs(jobs);
    })
    DegreeService.getAllDegrees().then(degrees => {
      setDegrees(degrees);
    }) 
  }, [])

  //Check localStorage for user data before log in
  useEffect(() => {
    if(localStorage.getItem('user')) {
      const userJson: unknown = localStorage.getItem('user');
      const user = JSON.parse(userJson as string);
      setUser(user as User)
      setIsAuthenticated(true);
    }
  }, []);

  function handleAccessToken(accessToken: string) {
    try {
      const jwtPayload: unknown = decodejwt(accessToken);
      const decodedJwt = {
        accessToken,
        ...jwtPayload as {},
      }
      setUser(decodedJwt as User);
      localStorage.setItem("user", JSON.stringify(decodedJwt));
      setIsAuthenticated(true);
    } catch (e: any) {
      console.log("Decoding JWT failed.");
    }
  }

  function handleLogOut() {
    console.log("User logged out!");
    setUser({} as User);
    setIsAuthenticated(false);
    console.log("SET HERE!!!!")
    localStorage.removeItem("user");
  }

  return (
    <div>
      <HomePage
      user={user as User}
      handleAccessToken={handleAccessToken}
      jobs={jobs}
      degrees={degrees}
      loading
      handleLogOut={handleLogOut}
      isAuthenticated={isAuthenticated}
      />
    </div>
  )
}

export default App;
