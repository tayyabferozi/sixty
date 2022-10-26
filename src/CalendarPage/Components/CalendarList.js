import React, { useState, useEffect, Component } from "react";
// import { connect } from "react-redux";
// import Calendar from 'tui-calendar'; /* ES6 */
import moment from 'moment';
import 'moment-timezone';

// import Calendar from "@toast-ui/react-calendar";
// import "tui-calendar/dist/tui-calendar.css";
// import "tui-date-picker/dist/tui-date-picker.css";
// import "tui-time-picker/dist/tui-time-picker.css";

import { requestCalendars, receiveCalendar, setCalendar } from '../actions/calendarActions';
import { receiveSchedule, requestSchedules } from "../actions/scheduleActions";
import CalendarFilter from "./CalendarFilter";
import CalendarGroupList from "./CalendarGroupList";

// import { Popup } from "./Popup/CalendarAdd";

class CalendarList extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false
        };
    }

    componentDidMount() {
        this.dates = "";
        //#region Manage Calendars
        this.props.onRequestCalendars();

        this.props.connection.on(
            "NewCalendar",
            (Color, BgColor, Name, Id) => {
                this.props.onReceiveCalendar(Color, BgColor, Name, Id)
            }
        )
        //#endregion

        //#region Manage Schedules
        this.onClickSchedule = this.onClickSchedule.bind(this);
        this.setRenderRangeText = this.setRenderRangeText.bind(this);
        this.onBeforeCreateSchedule = this.onBeforeCreateSchedule.bind(this);
        this.onBeforeDeleteSchedule = this.onBeforeDeleteSchedule.bind(this);
        this.onBeforeUpdateSchedule = this.onBeforeUpdateSchedule.bind(this);
        this.createNewSchedule = this.createNewSchedule.bind(this);
        this.SendSchedule = this.SendSchedule.bind(this);

        this.createNewCalendar = this.createNewCalendar.bind(this);
        this.onSaveClickCalendar = this.onSaveClickCalendar.bind(this);
        this.addCalendar = this.addCalendar.bind(this);
        this.SendCalendar = this.SendCalendar.bind(this);

        this.cal = React.createRef(null);
    }

    componentDidUpdate(prevProps) {
        if (this.props.calendarId !== prevProps.calendarId) {
            this.props.onRequestSchedules(this.props.calendarId);
        }
        this.setRenderRangeText();
        // this.scrollToBottom();
    }

    render() {
        return (
            <div className="Test">
                    
                <div>Alert boo</div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        calendars: state.requestCalendars.calendars,
        currentCalendar: state.requestCalendars.currentCalendar,
        schedules: state.requestSchedules.schedules,
    }
}

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


//#endregion

export { CalendarList };
// export default connect(mapStateToProps, mapDispatchToProps)(CalendarList);