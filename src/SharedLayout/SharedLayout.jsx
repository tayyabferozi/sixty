import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "antd/dist/antd.less";
import { FaAlignJustify } from "react-icons/fa";
import {
  Router,
  Route,
  NavLink,
  BrowserRouter,
  Routes,
  Switch,
  Outlet,
} from "react-router-dom";
import { authenticationService } from "../_services";

class SharedLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false,
    };
  }

  componentDidMount = () => {
    // this.connection
    //     .start({ withCredentials: false })
    //     .catch(err => console.error(err));

    authenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: x, //,
        // isAdmin: x && x.role === Role.Admin
      })
    );
  };

  logout() {
    authenticationService.logout();
    history.push("/login");
  }
  render() {
    const { currentUser, isAdmin } = this.state;

    return (
      <>
        <Navbar
          className="navbar navbar-expand-lg dt_navbar ftco-navbar-light"
          expand="lg"
        >
          <Navbar.Brand>Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="dt-nav">
            <FaAlignJustify />
          </Navbar.Toggle>
          <Navbar.Collapse id="dt-nav">
            <Nav className="ml-auto navbar-nav ">
              <NavLink to="/home" className="nav-item nav-link">
                Home
              </NavLink>
              {!currentUser && (
                <NavLink to="/login" className="nav-item nav-link">
                  Login
                </NavLink>
              )}
              {!currentUser && (
                <NavLink to="/register" className="nav-item nav-link">
                  Register
                </NavLink>
              )}
              {currentUser && (
                <NavLink to="/schedule" className="nav-item nav-link">
                  schedule
                </NavLink>
              )}
              {currentUser && isAdmin && (
                <NavLink to="/admin" className="nav-item nav-link">
                  Admin
                </NavLink>
              )}
              {currentUser && (
                <a onClick={this.logout} className="nav-item nav-link">
                  Logout
                </a>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Outlet />
      </>
    );
  }
}
export { SharedLayout };
