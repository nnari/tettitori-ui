import axios from "axios";
import { REGISTER_URL } from "../Utility/Endpoints";

class RegistrationService {
  public RequestAccount(userdata: {
    username: string;
    email: string;
    recaptcha: string;
  }) {
    return axios.post(REGISTER_URL, userdata);
  }
}

export default new RegistrationService();
