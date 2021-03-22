import axios from "axios";
import { ADMIN_URL, ADMIN_URL_USER } from "../Utility/Endpoints";

export interface AdminViewUser {
  _id?: string;
  username: string;
  password?: string;
  email?: string;
}

export type AdminViewCreatedDTO = Required<AdminViewUser>;
export type AdminDbView = Omit<Required<AdminViewUser>, "password">[];
export type AdminViewUserDeleteRequest =
  | Pick<Required<AdminViewUser>, "_id">
  | string;

class AdminService {
  getAllUsers = (user: User): Promise<AdminDbView> => {
    let config = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };

    return axios.get(ADMIN_URL + ADMIN_URL_USER, config).then((response) => {
      return response.data;
    });
  };

  createUser = (
    userdata: Partial<AdminViewUser>,
    user: User
  ): Promise<AdminViewUser> => {
    let config = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };

    return axios
      .post(ADMIN_URL + ADMIN_URL_USER, userdata, config)
      .then((response) => {
        return response.data;
      });
  };

  deleteUser = (
    id: AdminViewUserDeleteRequest,
    user: User
  ): Promise<AdminViewUser> => {
    let config = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };

    return axios
      .delete(ADMIN_URL + ADMIN_URL_USER + `?id=${id}`, config)
      .then((response) => {
        return response.data;
      });
  };
}

export default new AdminService();
