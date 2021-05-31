import axios from "axios";
import { snackbarNotify } from "../Components/Snackbar";
import { JOB_URL } from "../Utility/Endpoints";

class JobService {
  getAllJobs = (): Promise<Job[]> => {
    return axios.get(JOB_URL).then((response) => {
      return response.data;
    });
  };
  getSingleJob = (id: string | null): Promise<Job> | null => {
    if (id) {
      return axios.get(`${JOB_URL}?id=${id}`).then((response) => {
        return response.data;
      });
    }
    return null;
  };
  postNewJob = (data: any, user: User): Promise<Job[]> => {
    let config = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };

    return axios.post(JOB_URL, data, config).then((response) => {
      snackbarNotify(`Uusi tettipaikka lisätty: ${data?.title}`);
      return response.data;
    });
  };
  editJob = (data: any, user: User): Promise<Job[]> => {
    let config = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };
    return axios
      .put(`${JOB_URL}?id=${data.id}`, data, config)
      .then((response) => {
        snackbarNotify(`Tettipaikka tallennettu: ${data?.title}`);
        return response.data;
      });
  };
  deleteJob = (id: string, user: User): void => {
    let config = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };

    axios
      .delete(`${JOB_URL}?id=${id}`, config)
      .then((response) => {
        snackbarNotify(`Tettipaikka poistettu.`);
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export default new JobService();
