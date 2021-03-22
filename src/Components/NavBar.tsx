import React from "react";
import { Link } from "react-router-dom";
import { Menu, Container, MenuProps, MenuItemProps } from "semantic-ui-react";
import { LoginFormDropdown } from "./LoginFormDropdown";
import styles from "../index.css";

interface Props {
  position: "bottom" | "top";
  handleAccessToken: (accessToken: string) => void;
  handleLogOut: () => void;
  user: User;
}

const AdminPageLinkSettings: MenuItemProps = {
  color: "red",
  as: "a",
  active: true,
};

export const NavBar = ({
  position,
  handleAccessToken,
  user,
  handleLogOut,
}: Props) => {
  return (
    <Menu fixed={position} inverted size="large">
      <Container>
        <Menu.Item as="a" header>
          <Link to="/">Tettilä</Link>
        </Menu.Item>

        <Menu.Item as="a">
          <Link to="/paikat">Paikat</Link>
        </Menu.Item>

        {user?.accessToken && (
          <Menu.Item as="a">
            <Link to="/profile">
              <b>Muokkaa oman paikan tietoja</b>
            </Link>
          </Menu.Item>
        )}
        {user?.role === "admin" && (
          <Menu.Item {...AdminPageLinkSettings}>
            <Link to="/admin">
              <b>Järjestelmänvalvojan hallintapaneeli</b>
            </Link>
          </Menu.Item>
        )}
        {user?.accessToken ? (
          <Menu.Item position="right" as="a" onClick={() => handleLogOut()}>
            Kirjaudu ulos
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <LoginFormDropdown handleAccessToken={handleAccessToken} />
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};
