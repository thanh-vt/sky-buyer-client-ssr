import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { switchTheme } from '../../store/themeSlice';
import { useDispatch } from 'react-redux';
import { Switch } from '../../shared/switch/Switch';
import React, { ReactElement } from 'react';
import './AppHeader.module.scss';
import { LoginModal } from '../login/LoginModal';

export function AppHeader(): ReactElement {
  const dispatch = useDispatch();
  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Sky Buyer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav.Item>
            <Switch onChange={(val) => dispatch(switchTheme(val))} />
          </Nav.Item>
          <Nav.Item>
            <LoginModal />
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
