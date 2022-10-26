
import React, { Component } from "react";
//import { connect } from "react-redux";
import {
    receiveCalendar,
    requestCalendars
} from "../actions/calendarActions";

class CalendarGroupList extends Component {
    constructor() {
        super();
        this.handleChangeCalendar = this.handleChangeCalendar.bind(this);
        this.findCalendar = this.findCalendar.bind(this);
        this.refreshScheduleVisibility = this.refreshScheduleVisibility.bind(this);
    };

    componentDidMount() {
        console.log(this.props);
    }

    componentDidUpdate(prevProps) {
        //     if (this.props.id !== prevProps.id) {

        // this.refreshScheduleVisibility();
        //     //   let data = await axios
        //     //   .get("https://jsonplaceholder.typicode.com/todos/" + this.props.id)
        //     //   .then(function(response) {
        //     //     return response;
        //     //   })
        //     //   .catch(function(error) {
        //     //     console.log(error);
        //     //   });
        //     //   this.setState({ todo: data.data });
        //     }
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    //#region Update Calendar

    handleChangeCalendar(e) {
        e.stopPropagation();

        var calendarId = e.target.value;
        var checked = e.target.checked;
        var viewAll = document.querySelector('.lnb-calendars-item input');
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
        var allCheckedCalendars = true;
        if (calendarId === 'all') {
            allCheckedCalendars = checked;

            calendarElements.forEach(function (input) {
                var span = input.parentNode;
                input.checked = checked;
                span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
            });

            this.props.Calendars.forEach(function (calendar) {
                calendar.Checked = checked.toString();
            });
        } else {
             this.findCalendar(calendarId).Checked = checked.toString();


            allCheckedCalendars = calendarElements.every(function (input) {
                return input.checked;
            });

            if (allCheckedCalendars) {
                viewAll.checked = true;
            } else {
                viewAll.checked = false;
            }
        }

        this.refreshScheduleVisibility();
    }

    findCalendar(id) {
        var found;

        this.props.Calendars.forEach(function (calendar) {
            if (calendar.id === id) {
                found = calendar;
            }
        });

        return found || this.props.Calendars[0];
    }

    refreshScheduleVisibility() {
        if (this.props.Cal != null && this.props.Cal.current != null) {
            var mainCalendar = this.props.Cal.current.getInstance();
            var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
            this.props.Calendars.forEach(function (calendar) {
                console.log(calendar);
                mainCalendar.toggleSchedules(calendar.id, !(calendar.Checked === 'true'), false);
            });

            mainCalendar.render(true);

            calendarElements.forEach(function (input) {
                var span = input.nextElementSibling;
                span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
            });
        }
    }


    // initializeScheduleVisibility() {
    //     if (this.props.Cal != null && this.props.Cal.current != null) {
    //         var mainCalendar = this.props.Cal.current.getInstance();
    //         var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

    //         this.props.Calendars.forEach(function (calendar) {
    //             mainCalendar.toggleSchedules(calendar.id, !calendar.checked, false);
    //         });

    //         mainCalendar.render(true);

    //         calendarElements.forEach(function (input) {
    //             var span = input.nextElementSibling;
    //             span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
    //         });
    //     }
    // }

    //#endregion


    render() {
        this.refreshScheduleVisibility();
        return (
            <div className="calendar-list">         
                 <div className="lnb-new-calendar">
                    <button id="btn-new-calendar" onClick={this.props.createNewCalendar} type="button" className="btn btn-default btn-block lnb-new-calendar-btn" >
                        New Calendar
                        </button>
                </div>
                <div id="lnb-calendars" className="lnb-calendars">
                    <div>
                        <div className="lnb-calendars-item">
                            <label>
                                <input className="psync-full-calendar-checkbox-square" type="checkbox" value="all" onChange={this.handleChangeCalendar} defaultChecked={this.props.Calendars != null ? this.props.Calendars.filter(e => e.Checked === 'true') : false} />
                                <span></span>
                                <strong>View all</strong>
                            </label>
                        </div>
                    </div>
                    <div id="calendarList" className="lnb-calendars-d1">

                        {this.props.Calendars != null ? this.props.Calendars.map(cal => (
                            <div className="lnb-calendars-item" key={cal.id}>
                                <label>
                                     <input type="checkbox" className="psync-full-calendar-checkbox-round" onChange={this.handleChangeCalendar} value={cal.id} defaultChecked='true' />   {/*{cal.Checked === 'true'} */}
                                    <span style={{ borderColor: cal.borderColor, backgroundColor: cal.bgColor }}></span>
                                    <span > {cal.name} </span>
                                </label>
                            </div>
                            
                        )) :
                            <div className="lnb-calendars-item"><label>
                                <span> Aucun Calendrier n'a été crée.. </span>
                            </label></div>}
                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        calendars: state.requestCalendars.CalendarList,
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
//export default connect(mapStateToProps, mapDispatchToProps)(CalendarGroupList);


 export default  CalendarGroupList ;
