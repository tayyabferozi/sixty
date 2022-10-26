import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
  Switch,
} from "react-router-dom";
import { UseLocation } from "react-router";

import { history, Role } from "../_helpers";
import { authenticationService } from "../_services";
import { PrivateRoute } from "@/_components";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { HomePage } from "../HomePage";
import { CalendarPage } from "../CalendarPage";
import Schedule from "../CalendarPageNew";
import { AdminPage } from "../AdminPage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { SharedLayout } from "../SharedLayout";

import NotFound from "./NotFound";
import { ConnectedRouter } from "connected-react-router";
import { HubService } from "../_services/HubConnection";

import "./App.scss";
import "./main.js";
import "antd/dist/antd.less";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false,
    };

    // this.connection = HubService.Build();
  }

  render() {
    var well = {
      top: 0,
      boxShadow: "gba(0, 0, 0, 0.2) 0px 6px 20px !important",
    };

    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SharedLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="*" component={<div>NotFound</div>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    calendars: state.calendar.calendars,
    currentCalendar: state.calendar.currentCalendar,
    schedules: state.schedule.schedules,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onRequestCalendars: () => requestCalendars(dispatch),
    onReceiveCalendar: (Color, BgColor, Name, Id, selected) =>
      dispatch(receiveCalendar(Color, BgColor, Name, Id, selected)),
    onSetCalendar: (calendar) => dispatch(setCalendar(calendar)),
    onRequestSchedules: () => requestSchedules(dispatch),
    onReceiveSchedule: (
      Name,
      Recurence,
      Category,
      Location,
      calendarId,
      id,
      Start,
      End,
      RoleGroupId
    ) =>
      dispatch(
        receiveSchedule(
          Name,
          Recurence,
          Category,
          Location,
          calendarId,
          id,
          Start,
          End,
          RoleGroupId
        )
      ),
  };
};

// export { App };

export default connect(mapStateToProps, mapDispatchToProps)(App);
//  {

//     <Navbar  className="navbar navbar-expand-lg dt_navbar ftco-navbar-light" expand="lg">
//     <Navbar.Brand><img src={logo} className="LogoDesign" alt="Logo" /> DiaryTree</Navbar.Brand>
//     <Navbar.Toggle aria-controls="dt-nav" ><FaAlignJustify /></Navbar.Toggle>
//     <Navbar.Collapse id="dt-nav">
//         <Nav className="ml-auto navbar-nav ">
//             <Link to="/" className="nav-item nav-link">Home</Link>
//             {!currentUser && <Link to="/login" className="nav-item nav-link" >Login</Link>}
//             {!currentUser && <Link to="/register" className="nav-item nav-link">Register</Link>}
//             {currentUser && <Link to="/schedule" className="nav-item nav-link" >schedule</Link>}
//             {currentUser && isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
//             {currentUser && <a onClick={this.logout} className="nav-item nav-link">Logout</a>}
//         </Nav>
//     </Navbar.Collapse>
// </Navbar>

/* {LoginPage} // <ConnectedRouter history={history}>
                        // <div>
                        //     <Navbar  className="navbar navbar-expand-lg dt_navbar ftco-navbar-light" expand="lg">
                        //         <Navbar.Brand><img src={logo} className="LogoDesign" alt="Logo" /> DiaryTree</Navbar.Brand>
                        //         <Navbar.Toggle aria-controls="dt-nav" ><FaAlignJustify /></Navbar.Toggle>
                        //         <Navbar.Collapse id="dt-nav">
                        //             <Nav className="ml-auto navbar-nav ">
                        //                 <Link to="/" className="nav-item nav-link">Home</Link>
                        //                 {!currentUser && <Link to="/login" className="nav-item nav-link" >Login</Link>} 
                        //                 {!currentUser && <Link to="/register" className="nav-item nav-link">Register</Link>}
                        //                 {currentUser && <Link to="/schedule" className="nav-item nav-link" >schedule</Link>}
                        //                 {currentUser && isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                        //                 {currentUser && <a onClick={this.logout} className="nav-item nav-link">Logout</a>} 
                        //             </Nav>
                        //         </Navbar.Collapse>
                        //     </Navbar>
                        //     <Routes>
                        //         <PrivateRoute exact path="/" component={HomePage} />
                        //         <PrivateRoute path="/schedule" component={Schedule} />
                        //         <PrivateRoute path="/admin" component={AdminPage} />
                        //         <PrivateRoute path="/login" component={LoginPage} />
                        //         <PrivateRoute path="/register" component={RegisterPage} />
                        //         <PrivateRoute component={NotFound} />
                        //     </Routes>
                        // </div>
                        // </ConnectedRouter> 





//  <ConnectedRouter history={history}>
//  <div>
//      <Navbar  className="navbar navbar-expand-lg dt_navbar ftco-navbar-light" expand="lg">
//          <Navbar.Brand><img src={logo} className="LogoDesign" alt="Logo" /> DiaryTree</Navbar.Brand>
//          <Navbar.Toggle aria-controls="dt-nav" ><FaAlignJustify /></Navbar.Toggle>
//          <Navbar.Collapse id="dt-nav">
//              <Nav className="ml-auto navbar-nav ">
//                  <Link to="/" className="nav-item nav-link">Home</Link>
//                  {!currentUser && <Link to="/login" className="nav-item nav-link" >Login</Link>} 
//                   {!currentUser && <Link to="/register" className="nav-item nav-link">Register</Link>}
//                  {currentUser && <Link to="/schedule" className="nav-item nav-link" >schedule</Link>}
//                  {currentUser && isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
//                  {currentUser && <a onClick={this.logout} className="nav-item nav-link">Logout</a>} 
//              </Nav>
//          </Navbar.Collapse>
//      </Navbar>
//      <Routes>
//           <PrivateRoute exact path="/" component={HomePage} />
//          <PrivateRoute path="/schedule" component={Schedule} />
//          <PrivateRoute path="/admin" component={AdminPage} />
//          <PrivateRoute path="/login" component={LoginPage} />
//          <PrivateRoute path="/register" component={RegisterPage} />
//          <PrivateRoute component={NotFound} />
//      </Routes>
//  </div>
// </ConnectedRouter>






// <Router history={history}>
// <div >
//     <Nav></Nav>


//     <div className={'gx-w-100'} style={well}>
//         {/* <PrivateRoute exact path="/calendarOld" component={CalendarPage} connection={this.connection} />  
//         <PrivateRoute exact path="/" component={HomePage}  />
//         <PrivateRoute exact path="/schedule" component={Schedule}  />
//         <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
//         <PrivateRoute path="/login" component={LoginPage} />
//         <PrivateRoute path="/register" component={RegisterPage} />
//     </div>
// </div>
// </Router>



//  bg-dark navbar-dark   bg="light"
//<Router history={history}>
//     <div >
//         <Nav></Nav>


//         <div className={'gx-w-100'} style={well}>
//             <PrivateRoute exact path="/calendarOld" component={CalendarPage} connection={this.connection} /> 
//              <PrivateRoute exact path="/" component={HomePage}  connection={connection} />
//             <PrivateRoute exact path="/schedule" component={Schedule} connection={connection} />
//             <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
//             <PrivateRoute path="/login" component={LoginPage} />
//             <PrivateRoute path="/register" component={RegisterPage} />
//         </div>
//     </div>
// </Router>

// const calendarHubConnection = ;

// this.setState( () => {
//     this.state.calendarHubConnection = calendarHubConnection.start()
//         .then(() => console.log('SignalR Started'))
//         .catch((err) => console.log('Error connecting SignalR - ' + err))
//     // debugger;
// });

// this.state.calendarHubConnection.on('booking',(events)=> {
//     const bookingMessage = events;
//     this.setState({events});

// });

// {/* <Link to="/calendarOld" className="nav-item nav-link">Calendar(before)</Link> 
// <Router history={history}>gx-position-absolute    {top:0, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 6px 20px !important'}
//     <div >
//         {currentUser &&
//             <nav className="navbar navbar-expand-lg navbar-dark dt_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
//                 <div className="container">
//                      <Link to="/" className="navbar-brand"><img src={logo} className="LogoDesign" alt="Logo" /> DiaryTree</Link> 
//                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="oi oi-menu"></span> Menu
//                     </button>
//                     <div className="collapse navbar-collapse" id="ftco-nav">
//                         <ul className="navbar-nav ml-auto">
//                             <Link to="/" className="nav-item nav-link">Home</Link>
//                             <Link to="/calendarOld" className="nav-item nav-link">Calendar(before)</Link>
//                             <Link to="/schedule" className="nav-item nav-link">schedule</Link>
//                             {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
//                             <a onClick={this.logout} className="nav-item nav-link">Logout</a>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         }
//         <div className={'gx-position-absolute  gx-w-100'}>
//             <PrivateRoute exact path="/" component={HomePage} />
//             <PrivateRoute exact path="/calendarOld" component={CalendarPage} connection={this.connection} />
//             <PrivateRoute exact path="/schedule" component={Schedule} connection={this.connection} />
//             <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
//             <Route path="/login" component={LoginPage} />
//         </div> 
//     </div> 
// </Router>



//

// // <nav className="navbar navbar-expand navbar-dark bg-dark">
//                         //     <div className="navbar-nav">
//                         //         <Link to="/" className="nav-item nav-link">Home</Link>
//                         //         <Link to="/calendar" className="nav-item nav-link">Calendar</Link>
//                         //         {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
//                         //         <a onClick={this.logout} className="nav-item nav-link">Logout</a>
//                         //     </div>
//                         // </nav> */
