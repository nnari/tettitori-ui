import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import decodejwt, { InvalidTokenError } from 'jwt-decode';

//Import services
import JobService from '../Services/JobService';
import { Console } from 'console';

const App = () => {
  //We want to be storing global state here
  const [user, setUser] = useState<User>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    JobService.getAllJobs().then(jobs => {
      setJobs(jobs);
      setLoading(false);
    })
  }, [])

  //Check localStorage for user data before log in
  useEffect(() => {
    if(localStorage.getItem('user')) {
      const userJson: unknown = localStorage.getItem('user');
      const user = JSON.parse(userJson as string);
      setUser(user as User)
    }
  }, []);

  useEffect(() => {
    console.log("User state changed");
  }, [user])

  function handleAccessToken(accessToken: string) {
    try {
      const jwtPayload: unknown = decodejwt(accessToken);
      const decodedJwt = {
        accessToken,
        ...jwtPayload as {},
      }
      setUser(decodedJwt as User);
      localStorage.setItem("user", JSON.stringify(decodedJwt));
    } catch (e: any) {
      console.log("Decoding JWT failed.");
    }
  }

  function handleLogOut() {
    console.log("User logged out!");
    setUser({} as User);
    localStorage.removeItem("user");
  }

  return (
    <div>
      <HomePage
      user={user as User}
      handleAccessToken={handleAccessToken}
      jobs={jobs}
      loading
      handleLogOut={handleLogOut}
      />
    </div>
  )
}

export default App;
