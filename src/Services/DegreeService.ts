import axios from "axios";
import { DEGREE_URL } from "../Utility/Endpoints";

class DegreeService {
  getAllDegrees = (): Promise<Degree[]> => {
    return axios.get(DEGREE_URL).then((response) => {
      return response.data;
    });
  };
}

export default new DegreeService();
