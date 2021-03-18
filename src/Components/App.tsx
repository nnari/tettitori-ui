import React, { useState, useEffect } from "react";
import ListPageLayout from "./ListPageLayout";
import decodejwt from "jwt-decode";

//Import services
import JobService from "../Services/JobService";
import DegreeService from "../Services/DegreeService";
import { snackbarNotify } from "./Snackbar";
import ActivityOrientationService from "../Services/ActivityOrientationService";
import FavoriteService from "../Services/FavoriteService";

const App = () => {
  //We want to be storing global state here
  const [user, setUser] = useState<User>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [orientations, setOrientations] = useState<ActivityOrientation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = "Tettilä";
    JobService.getAllJobs().then((jobs) => {
      //sort by job.title in descending order
      jobs.sort((a, b) => a.title.localeCompare(b.title)); //sorted
      setJobs(jobs);
      setLoading(false);
    });
    DegreeService.getAllDegrees().then((degrees) => {
      setDegrees(degrees);
    });
    ActivityOrientationService.getAllOrientations().then((orientations) => {
      setOrientations(orientations);
    });
    setFavorites(FavoriteService.getFavorites());
    //Check localStorage for user
    if (localStorage.getItem("user")) {
      const userJson: unknown = localStorage.getItem("user");
      const user = JSON.parse(userJson as string) as User;
      snackbarNotify("Tervetuloa Tettilään, " + user?.username);
      setUser(user);
      if (user.role === "admin") setIsAdmin(true);
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
      if ((decodedJwt as User).role === "admin") setIsAdmin(true);
      localStorage.setItem("user", JSON.stringify(decodedJwt));
      setIsAuthenticated(true);
    } catch (e) {
      console.log("Decoding JWT failed.");
    }
  }

  function handleLogOut() {
    setUser({} as User);
    setIsAdmin(false);
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
        loading={loading}
        favorites={favorites}
        handleLogOut={handleLogOut}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        orientations={orientations}
      />
    </div>
  );
};

export default App;
