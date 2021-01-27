import axios from "axios";
import { JOB_URL } from '../Utility/Endpoints';

class JobService {
  getAllJobs = (): Promise<Job[]> => {
    return axios.get(JOB_URL).then(response => {
        return response.data
    });
  }
  postNewJob = (data: any, user: User): Promise<Job[]> => {
    let config = {
      headers: {
        "Authorization": "Basic " + user.accessToken,
      }
    }

    return axios.post(JOB_URL, data, config).then(response => {
      console.log(response);
      return response.data
    })
  }
}

export default new JobService();