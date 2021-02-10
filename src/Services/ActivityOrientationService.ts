import axios from "axios";
import { ORIENTATION_URL } from "../Utility/Endpoints";

class ActivityOrientationService {
  getAllOrientations = (): Promise<ActivityOrientation[]> => {
    return axios.get(ORIENTATION_URL).then((response) => {
      return response.data;
    });
  };
}

export default new ActivityOrientationService();
