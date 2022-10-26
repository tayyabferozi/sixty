import React, { Component } from "react";
//import { connect } from "react-redux";
import {
  receiveSchedule,
  requestSchedules
} from "../actions/scheduleActions";
import Schedule from "./Schedule";

class ScheduleList extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.connection.on(
      "ReceiveSchedule",( Name,   Recurence,  Category, Location, id, Start, End, RoleGroupId, calendarId) => {
        this.props.onReceiveSchedule(Name,Recurence,Category,Location,id, Start, End,RoleGroupId,this.props.currentCalendar.id);
      }
    );

    this.props.onRequestSchedules(this.props.CalendarId);
    // this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    if (this.props.calendarId !== prevProps.calendarId) {
      this.props.onRequestSchedules(this.props.calendarId);
    }
    // this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div className="schedule-list">
        {this.props.schedules.map((schedule, i) => {
          return (
            <Schedule
              key={i}
              Name={schedule.Name}
              Location={schedule.Location}
              Start={schedule.Start}
              End={schedule.End}
            />
          );
        })}
        {/* <div ref={el => { this.el = el; }} /> */}
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

//export default connect(  mapStateToProps,  mapDispatchToProps)(ScheduleList);

export default  ScheduleList ;
