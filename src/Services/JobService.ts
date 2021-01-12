import axios from "axios";
import { JOB_URL } from '../Utility/Endpoints';

class JobService {
  getAllJobs = (): Promise<Job[]> => {
    return axios.get(JOB_URL).then(response => {
        return response.data
    });
    
  }
}

export default new JobService();