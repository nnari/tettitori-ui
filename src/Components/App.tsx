import React, { useState, useEffect } from "react";
import ListPageLayout from "./ListPageLayout";
import decodejwt, { InvalidTokenError } from "jwt-decode";

//Import services
import JobService from "../Services/JobService";
import DegreeService from "../Services/DegreeService";
import { Console } from "console";
import { snackbarNotify } from "./Snackbar";
import ActivityOrientationService from "../Services/ActivityOrientationService";

const App = () => {
  //We want to be storing global state here
  const [user, setUser] = useState<User>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [orientations, setOrientations] = useState<ActivityOrientation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    JobService.getAllJobs().then((jobs) => {
      setJobs(jobs);
    });
    DegreeService.getAllDegrees().then((degrees) => {
      setDegrees(degrees);
    });
    ActivityOrientationService.getAllOrientations().then((orientations) => {
      setOrientations(orientations);
    });
    //Check localStorage for user
    if (localStorage.getItem("user")) {
      const userJson: unknown = localStorage.getItem("user");
      const user = JSON.parse(userJson as string) as User;
      snackbarNotify("Tervetuloa Tettilään, " + user?.username);
      setUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  function handleAccessToken(accessToken: string) {
    try {
      const jwtPayload: unknown = decodejwt(accessToken);
      const decodedJwt = {
        accessToken,
        ...(jwtPayload as {}),
      };
      setUser(decodedJwt as User);
      localStorage.setItem("user", JSON.stringify(decodedJwt));
      setIsAuthenticated(true);
    } catch (e: any) {
      console.log("Decoding JWT failed.");
    }
  }

  function handleLogOut() {
    setUser({} as User);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    snackbarNotify("Olet kirjautunut ulos.");
  }

  return (
    <div>
      <ListPageLayout
        user={user as User}
        handleAccessToken={handleAccessToken}
        jobs={jobs}
        degrees={degrees}
        loading
        handleLogOut={handleLogOut}
        isAuthenticated={isAuthenticated}
        orientations={orientations}
      />
    </div>
  );
};

export default App;
