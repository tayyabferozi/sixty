
import React, { Component } from "react";
//import  { connect }  from "react-redux";
import {
  receiveSchedule,
  requestSchedules
} from "../actions/scheduleActions";
 import Dropdown from "./Dropdown";
  import * as Icon from 'react-bootstrap-icons';
  import { Row, Col } from 'react-bootstrap';


class CalendarFilter extends Component {
  constructor() {
    super();
    this.handleClickNextButton = this.handleClickNextButton.bind(this);
    this.handleClickTodayButton = this.handleClickTodayButton.bind(this);
    this.handleClickPrevButton = this.handleClickPrevButton.bind(this);
    //this.changeView = this.changeView.bind(this);
  }
  componentDidMount() {
    console.log(this.props);

  }

  componentDidUpdate(prevProps) {
    console.log("CalendarFilter : componentDidUpdate");
    // console.log(this.props.Cal);
    // if(this.props.Cal != null && this.props.Cal.current != null) {
    //   //  this.calendarInstance = prevProps.Cal.current.getInstance();
    //   //  this.setRenderRangeText();

    //     this.calendarInstance = this.props.Cal.current.getInstance();
    //   }

  }


  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  //#region  Calendar Events


  handleClickNextButton = () => {
    console.log("CalendarFilter : handleClickNextButton");
    console.log(this);
    
    this.props.Cal.current.getInstance().next();

    this.props.setRenderRangeText();
  };

  handleClickTodayButton = () => {
    console.log("CalendarFilter : handleClickTodayButton");
    console.log(this);
    
    this.props.Cal.current.getInstance().today();
  };

  handleClickPrevButton = () => {
    console.log("CalendarFilter : handleClickPrevButton");
    console.log(this);
    this.props.Cal.current.getInstance().prev();
  };

  changeView(viewType) {
    if (this.props.Cal != null && this.props.Cal.current != null) {
      this.props.Cal.current.calendarInst.changeView(viewType, true);
    }
  };

  //#endregion

  render() {
    // this.calendarInstance = this.props.Cal.current.getInstance();

    return (
      <div className="calendar-filter">
        <Row>
          <Col md={6}>
            <Row >
              <Col md={4}>
                <Dropdown Cal={this.props.Cal}
                  changeView={this.changeView}
                />
              </Col>
              <Col md={1}>
                <button className="input-group-prepend" onClick={this.handleClickTodayButton} >
                  <i className="Right"><Icon.BoxArrowDown /></i>
                </button>
              </Col>
              <Col md={1}>
                <button className="input-group-prepend" onClick={this.handleClickPrevButton}>
                  <i className="Right"><Icon.ArrowLeft /></i>
                </button>
              </Col>
              <Col md={1}>
                <button className="input-group-prepend" onClick={this.handleClickNextButton}>
                  <i className="Right"><Icon.ArrowRight /></i>
                </button>
              </Col>
              <Col md={5}>
                <div id="renderRange" className="range">{this.props.CurrentDate}</div>
              </Col>
            </Row>
          </Col>
          <Col md={{ span: 2, offset: 4 }}>
            <button id="btn-new-schedule" onClick={this.props.createNewSchedule} type="button" className="btn btn-default btn-block lnb-new-schedule-btn" >
              <i className="Right"><Icon.PlusCircle /> Add an event</i>
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schedules: state.requestSchedules.schedules,
    currentCalendar: state.requestCalendars.currentCalendar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onRequestCalendars: () => dispatch(requestCalendars()),
      onReceiveCalendar: (Color, BgColor, Name, Id) => dispatch(
          receiveCalendar(
              Color, BgColor, Name, Id
          )
      ),
      onSetCalendar: (calendar) => dispatch(setCalendar(calendar)),
      onRequestSchedules: currentCalendarId =>
          dispatch(requestSchedules(currentCalendarId)),
      onReceiveSchedule: (Name, Recurence, Category, Location, calendarId, id, Start, End, RoleGroupId) => dispatch(
          receiveSchedule(Name, Recurence, Category, Location, calendarId, id, Start, End, RoleGroupId)
      )
  }
}

export default CalendarFilter;
//export default connect(  mapStateToProps,  mapDispatchToProps)(CalendarFilter);

