import React from 'react';
import { connect } from "react-redux";

import Calendar from "@toast-ui/react-calendar";
import { userService, authenticationService } from '@/_services';
import CalendarFilter from "./Components/CalendarFilter";
import CalendarGroupList from "./Components/CalendarGroupList";

//import Calendar from 'tui-calendar'; /* ES6 */
// import moment from 'moment';
// import 'moment-timezone';

// import "tui-calendar/dist/tui-calendar.css";
//import "tui-date-picker/dist/tui-date-picker.css";
//import "tui-time-picker/dist/tui-time-picker.css";
// import { getDateString } from '../../utils';

// import { requestCalendars, receiveCalendar, setCalendar } from '../../store/actions/calendarActions';
// import { receiveSchedule, requestSchedules } from "../../store/actions/scheduleActions";


class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

 
    componentDidMount() {
                 const { currentUser } = this.state;
                   if(currentUser && currentUser.id) 
                 userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
            }
        
            
    componentDidUpdate(prevProps) {
        if (this.props.calendarId !== prevProps.calendarId) {
            this.props.onRequestSchedules(this.props.calendarId);
        }
    }


    render() {
        const { currentUser, userFromApi } = this.state;

        return (
            <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <CalendarGroupList Cal={this.cal} 
                                   createNewCalendar={this.createNewCalendar} 
                                   Calendars={this.props.calendars} />
            </nav>
            <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
                 <CalendarFilter view='week'
                    createNewSchedule={this.createNewSchedule} 
                    options={calendarOptions}
                    Cal={this.cal}
                    setRenderRangeText={this.setRenderRangeText}
                    CurrentDate={this.dates} 
                    />
                <Calendar
                    view='week'
                    ref={this.cal}
                     {...calendarOptions}
                    height="1000px"
                    useCreationPopup={true}
                    useDetailPopup={true}
                    template={templates}
                    calendars={this.props.calendars}
                    schedules={this.props.schedules}
                    onClickSchedule={this.onClickSchedule}
                    onBeforeCreateSchedule={this.onBeforeCreateSchedule}
                    onBeforeDeleteSchedule={this.onBeforeDeleteSchedule}
                    onBeforeUpdateSchedule={this.onBeforeUpdateSchedule}
                />
            </main>
            {/* {this.state.showPopup ?
                <Popup
                    text='Close Me'
                    onSaveClickCalendar ={this.onSaveClickCalendar}
                    closePopup={this.createNewCalendar.bind(this)}
                />
                : null
            } */}
        </div>
        );
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


const calendarOptions = {
    // sort of option properties.
};

//#region Templates 

const templates = {
    time: function (schedule) {
        console.log(schedule);
        return _getTimeTemplate(schedule, false);
    }
};

function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();
    return `${h}:${m}`;
}

//Format Time in Calendar
function _getTimeTemplate(schedule, isAllDay) {
    var html = [];
    if (!isAllDay) {
        html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
        html.push('<span class="calendar-font-icon ic-lock-b"></span>');
        html.push(" Private");
    }
    else {
        if (schedule.isReadOnly) {
            html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
        }
        else if (schedule.recurrenceRule) {
            html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
        }
        else if (schedule.attendees.length) {
            html.push('<span class="calendar-font-icon ic-user-b"></span>');
        }
        else if (schedule.location) {
            html.push('<span class="calendar-font-icon ic-location-b"></span>');
        }
        html.push(" " + schedule.title);
    }
    return html.join("");
}

function getDateTimeFormat(dateTime) {

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${day}/${month}/${year}  ${hours}:${min}:${sec}`;
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);


// const mapStateToProps = (state) => {
//     return {
//         calendars: state.requestCalendars.calendars,
//         currentCalendar: state.requestCalendars.currentCalendar,
//         schedules: state.requestSchedules.schedules,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onRequestCalendars: () => dispatch(requestCalendars()),
//         onReceiveCalendar: (Color, BgColor, Name, Id) => dispatch(
//             receiveCalendar(
//                 Color, BgColor, Name, Id
//             )
//         ),
//         onSetCalendar: (calendar) => dispatch(setCalendar(calendar)),
//         onRequestSchedules: currentCalendarId =>
//             dispatch(requestSchedules(currentCalendarId)),
//         onReceiveSchedule: (Name, Recurence, Category, Location, calendarId, id, Start, End, RoleGroupId) => dispatch(
//             receiveSchedule(Name, Recurence, Category, Location, calendarId, id, Start, End, RoleGroupId)
//         )
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);