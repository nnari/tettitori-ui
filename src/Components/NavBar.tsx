import React from 'react';
import {
  Link
} from 'react-router-dom';
import { Menu, Container, Dropdown, Form, Segment, Button } from 'semantic-ui-react';
import { LoginFormDropdown } from './LoginFormDropdown';

interface Props {
  position: 'bottom' | 'top',
  handleAccessToken: (accessToken: string) => void,
  handleLogOut: () => void,
  user: User,
}

export const NavBar = ({ position, handleAccessToken, user, handleLogOut }: Props) => {
  return (
    <Menu fixed={position} inverted size='large'>
      <Container>
        <Link to="/">
          <Menu.Item as='a' header>
            Tettitori
              </Menu.Item>
        </Link>
        <Link to="/"><Menu.Item as='a'>Paikat</Menu.Item></Link>
        {user?.accessToken && (
          <Link to="/profile"><Menu.Item as='a'>Omat lisätyt paikat</Menu.Item></Link>
        )}

        {user?.accessToken ? <Menu.Item position='right' as='a' onClick={() => handleLogOut()}>Kirjaudu ulos</Menu.Item> : <Menu.Item position='right'><LoginFormDropdown handleAccessToken={handleAccessToken} /></Menu.Item>}

      </Container>
    </Menu>
  )
}