import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import '../styles/dx.common.css';
import '../styles/dx.light.css';
import '../styles/pages/schedule/style.less';
import Calendar from './Schedule';
import CalendarModal from './Component/CalendarModal';
import AddCalendarButton from './Component/AddCalendarButton';
import { Button, Layout, Typography, Tooltip } from 'antd';
import CalendarBlock from './Component/CalendarBlock';
import CalendarSmallBlock from './Component/CalendarSmallBlock';
import CalendarSelectToggle from './Component/CalendarSelectToggle';
import { PushpinOutlined } from '@ant-design/icons';
import zIndex from '@material-ui/core/styles/zIndex';
import { HubService } from '../_services/HubConnection';
import { authenticationService } from '@/_services';


import { requestCalendars, receiveCalendar, setCalendar } from '@/store/actions/calendarActions';
import { receiveSchedule, requestSchedules } from "@/store/actions/scheduleActions";
import { CalendarEvent } from 'react-bootstrap-icons';

// const tempCalendars = [
//     {
//         id: '2021-10-11',
//         name: 'first',
//         description: 'first calendar',
//         color: '#b38bdc',
//         selected: false,
//     },
//     {
//         id: '2021-10-12',
//         name: 'second',
//         description: 'second calendar',
//         color: '#2ecc87',
//         selected: false,
//     },
//     {
//         id: '2021-10-13',
//         name: 'third',
//         description: 'third calendar',
//         color: '#47b2f7',
//         selected: false,
//     },
// ]
// var tempSchedules = [
//     {
//         "id": 297, "calendar_id": '2021-10-13', "title": "tet", "note": null, "startDate": "2021-05-02T09:00:00.000Z",
//         "endDate": "2021-05-02T10:00:00.000Z" #2c6cd8
//     },#3252c3  #4759e1  
// ]

const { Content, Sider } = Layout;
const { Title } = Typography;

const Schedule = (props) => {

    const [basicColor, setBasicColor] = useState('#4865F5')
    const [sideBarVisible, setSideBarVisible] = useState(null);
    const [calendarModalData, setCalendarModalData] = useState(null);
    const [addCalendarFormVisible, setAddCalendarFormVisible] = useState(null);
    const [calendars, setCalendars] = useState(props.calendars);
    const [schedules, setSchedules] = useState(props.schedules);
    const [activeKey, setActiveKey] = useState(null);
    const [connection, setConnection] = useState(HubService.Build());


    
    useEffect(() => {

        console.log('userEffect');
        
        // Manage Calendars
        props.onRequestCalendars();
        props.onRequestSchedules();

        setActiveKey(0);
        let isCancelled = false;
        const runAsync = async () => {
            try {
                if (!isCancelled) {

                    setConnection(HubService.Get());
                    // SignalR Sync Calendar
                    connection.on(
                        "CreateCalendar",
                        (name, recurence, category, location, id, start, end, roleGroupId, calendarId) => {
                            
                        }
                    );

                    // receive Schedule
                    connection.on(
                        "UpdateCalendar",
                        (name, recurence, category, location, id, start, end, roleGroupId, calendarId) => {
                        }
                    );

                    // Delete Schedule
                    connection.on(
                        "DeleteCalendar",
                        (id) => {
                        }
                    );


                    // SignalR Sync Schedule
                    connection.on(
                        "CreateSchedule",
                        (name, recurence, category, location, id, start, end, roleGroupId, calendarId) => {
                            
                        }
                    );

                    // receive Schedule
                    connection.on(
                        "UpdateSchedule",
                        (name, recurence, category, location, id, start, end, roleGroupId, calendarId) => {
                        }
                    );

                    // Delete Schedule
                    connection.on(
                        "DeleteSchedule",
                        (id) => {
                        }
                    );


                }
                // Set calendars
                setCalendars(props.calendars);

                // set Schedules
                 setSchedules(props.schedules);

            } catch (e) {
                if (!isCancelled) {
                    throw e;
                }
            }
        };

        runAsync();

        return () => {
            isCancelled = true;
        };



    }, [])


    //#region Common

    const onCollapse = (collapsed) => {
        setSideBarVisible(!sideBarVisible);
    };

    const checkAllToggle = () => {
        var tmpCalendars = [...props.calendars]
        if (tmpCalendars.find(e => e.selected == true) && tmpCalendars.find(e => e.selected == false)) {
            tmpCalendars.forEach(calendar => {
                calendar.selected = true;
            });
        } else if (tmpCalendars.find(e => e.selected == true)) {
            tmpCalendars.forEach(calendar => {
                calendar.selected = false;
            });
        } else {
            tmpCalendars.forEach(calendar => {
                calendar.selected = true;
            });
        }
        setBasicColor('#4865F5');
        setCalendars(tmpCalendars)
    }

    const isAvailableEdit = () => {
        var showingDatas = props.calendars.filter(e => e.selected == true);
        if (showingDatas.length != 1) {
            return false
        } else {
            return true;
        }
    }

    //#endregion

    //#region Manage Calendars


    const addCalendar = (value) => {

        setConnection(HubService.Get());
        let newId = moment().format('YYYY-MM-DD h:mm:ss');

        let calendar = { ...value, id: newId, isselected: true }

        setCalendars([props.calendars, calendar]);

        // Save new calendar
        connection.invoke(
            "CreateCalendar",
            calendar.id,
            calendar.title,
            calendar.description,
            calendar.isselected,
            calendar.bgcolor,
            calendar.borderColor,
            calendar.color,
            calendar.dragBgColor
        ).catch(err => console.error(err.toString()));

        setAddCalendarFormVisible(false);
    };

    const editCalendar = (value) => {
        
        setConnection(HubService.Get());
        var tmp = [];
        calendars.forEach(e => {
            if (e.id == value.id) {
                tmp.push({ ...value, selected: true });
            } else {
                tmp.push(e);
            }
        });
        setCalendars(tmp);
        setBasicColor(value.color);
        setAddCalendarFormVisible(false);

        // Update new calendar
        connection.invoke(
            "UpdateCalendar",
            calendar.id,
            calendar.title,
            calendar.description,
            calendar.isselected,
            calendar.bgcolor,
            calendar.borderColor,
            calendar.color,
            calendar.dragBgColor
        ).catch(err => console.error(err.toString()));
    };

    
    const deleteCalendar = (value) => {

        setConnection(HubService.Get());
        tmpCalendars = calendars.filter(e => e.id != value);
        setCalendars(tmpCalendars);

                // Update new Calendar
                connection.invoke(
                    "DeleteCalendar",
                    value
                ).catch(err => console.error(err.toString()));
    };

    const clickCalendar = (CalendarId) => {
        var index = 0;
        let tempCalendars = [...props.calendars];


        tempCalendars.forEach(calendar => {

            // Select the calendar using the calendar Id
            if (calendar.id == CalendarId) {
                calendar.selected = !calendar.selected;
            }

            // Define the color of the selected calendar
            if (calendar.selected) {
                if (index == 0) {
                    setBasicColor(calendar.color);
                }
                index++;
                setActiveKey(calendar.id);
            }

        })

        // Set the basic Color
        if (index > 1 || index == 0) {
            setBasicColor('#2ecc87');
        }

        // Update calendar View
        setCalendars(tempCalendars);
    };

    const getCalendarData = () => {
        var result = [];
        props.calendars.forEach(calendar => {
            if (calendar.selected) {
                var tmpDatas = props.schedules.filter(e => e.calendar_id == calendar.id);
                result = [...result, ...tmpDatas];
            }
        })
        return result;
    }

    const OpenCalendarModal = (type) => {
        console.log(type);
        if (type == 'new') {
            setCalendarModalData(null);
        } else {
            setCalendarModalData(calendars.find(e => e.selected == true));
        }
        setAddCalendarFormVisible(true);
    }

    //#endregion

    //#region Manage Schedules

    const addAppointment = (schedule) => {

        setConnection(HubService.Get());
        let newId = moment().format('YYYY-MM-DD h:mm:ss');
        let tmpSchedules = [...schedules];
        tmpSchedules.push({ ...schedule, id: newId, calendar_id: activeKey });

        setSchedules(tmpSchedules);

        // Save new Schedule
        connection.invoke(
                    "CreateSchedule",
                    schedule.id,
                    schedule.title,
                    schedule.isAllDay,
                    schedule.category,
                    schedule.location,
                    schedule.calendarId,
                    new Date(schedule.start),
                    new Date(schedule.end),
                    schedule.roleGroupId
                ).catch(err => console.error(err.toString()));

    };

    const updateAppointment = (schedule) => {

        setConnection(HubService.Get());
        var tmpSchedules = [...schedules];
        tmpSchedules = tmpSchedules.map(e => {
            if (e.id == values.id && e.calendar_id == values.calendar_id) {
                return values;
            } else {
                return e;
            }
        })
        setSchedules(tmpSchedules);
        
        // Update new Schedule
        connection.invoke(
            "UpdateSchedule",
            schedule.id,
            schedule.title,
            schedule.isAllDay,
            schedule.category,
            schedule.location,
            schedule.calendarId,
            new Date(schedule.start),
            new Date(schedule.end),
            schedule.roleGroupId
        ).catch(err => console.error(err.toString()));
    };

    const deleteAppointment = (appointmentId) => {

        setConnection(HubService.Get());
        let tmpSchedules = [...schedules];
        tmpSchedules = tmpSchedules.filter(e => e.id != appointmentId);
        setSchedules(tmpSchedules);

                // Update new Schedule
                connection.invoke(
                    "DeleteSchedule",
                    appointmentId
                ).catch(err => console.error(err.toString()));
    }

    //#endregion
   
    const scrollToTime = (schedule) => {

    };
    

    return (

        <div className={'content-form'} style={{ position: 'relative' }}>
            <Layout style={{ minHeight: '100vh' }}>

                <Sider collapsed={sideBarVisible} width={300} collapsedWidth={60}>
                    <div className={`gx-w-100 side_bar_header ${sideBarVisible ? 'gx-pl-0' : ''}`}>
                        {!sideBarVisible && <Title level={2} className={'side_bar_header'}>My Calendars</Title>}
                        {!sideBarVisible && <div className={'flex-grow-1'} />}
                        <Tooltip title={sideBarVisible ? 'Expend' : 'Compact'} placement="right">
                            <Button onClick={onCollapse} className={'ng-bg-color'}><PushpinOutlined style={{ fontSize: 24, color: basicColor }} /></Button>
                        </Tooltip>
                    </div>
                    {props.calendars &&
                        <>
                            {!sideBarVisible ?
                                <div className={'gx-w-100'}>
                                    {props.calendars.map(calendar => (
                                        <CalendarBlock key={calendar.id} data={calendar} handleClick={clickCalendar} large={sideBarVisible} />
                                    ))}
                                    <AddCalendarButton openAddCalendarForm={() => { OpenCalendarModal('new') }} />
                                </div>
                                :
                                <div className={'gx-w-100 gx-h-100 gx-d-flex'}>
                                    <div className={'gx-w-100'}>
                                        <CalendarSelectToggle clickCheckAll={checkAllToggle} />
                                        {props.calendars.map(calendar => (
                                            <CalendarSmallBlock data={calendar} key={calendar.id} handleClick={clickCalendar} large={sideBarVisible} />
                                        ))}
                                    </div>
                                </div>
                            }
                        </>
                    }
                </Sider>

                <Content style={{ margin: '0 16px' }}>
                    {/* {props.calendars && activeKey && */}
                        <Calendar
                            key={activeKey}
                            data={getCalendarData()}
                            handleEditCalendar={() => { OpenCalendarModal('edit') }}
                            editCalendarAvailablity={isAvailableEdit()}
                            handleSubmit={addAppointment}
                            handleDelete={deleteAppointment}
                            updateAppointment={updateAppointment}
                            basicColor={basicColor}
                        />
                        <div id="calendar-footer">Footer AREA</div>
                    {/* } */}
                </Content>

                <CalendarModal
                    visible={addCalendarFormVisible}
                    formdata={calendarModalData}
                    handleSubmit={addCalendar}
                    handleEditSubmit={editCalendar}
                    handleClose={() => {
                        setAddCalendarFormVisible(false);
                    }}
                />
            </Layout>
        </div>
    );
};

// export default Schedule;


const mapStateToProps = (state) => {
    return {
        calendars: state.calendar.calendars,
        currentCalendar: state.calendar.currentCalendar,
        schedules: state.schedule.schedules,
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        onRequestCalendars: () => requestCalendars(dispatch),
        onReceiveCalendar: (Color, BgColor, Name, Id,selected) => dispatch(
            receiveCalendar(
                Color, BgColor, Name, Id,selected
            )
        ),
        onSetCalendar: (calendar) => dispatch(setCalendar(calendar)),
        onRequestSchedules: () => requestSchedules(dispatch),
        onReceiveSchedule: (Name, Recurence, Category, Location, calendarId, id, Start, End, RoleGroupId) => dispatch(
            receiveSchedule(Name, Recurence, Category, Location, calendarId, id, Start, End, RoleGroupId)
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Schedule);







//     let mounted = true
// debugger;
//     fetchItems().then((newItems) => {
//       if (mounted) {        
//     connection
//         .start({ withCredentials: false })
//         .catch(err => console.error(err.toString()));


//     //this.connection = HubService.Build();

//     setCalendars([]);
//     setSchedules([]);
//       }
//     })

//     return () => {
//       mounted = false
//     }

        // connection
        //     .start({ withCredentials: false })
        //     .catch(err => console.error(err.toString()));


        // //this.connection = HubService.Build();

        // setCalendars([]);
        // setSchedules([]);

        //connection.start({ withCredentials: false })
        // .catch(err => console.error(err.toString()));
//#region Manage Calendars
                // this.props.onRequestCalendars();

                // this.props.connection.on(
                //     "NewCalendar",
                //     (Color, BgColor, Name, Id) => {
                //         this.props.onReceiveCalendar(Color, BgColor, Name, Id)
                //     }
                // )
                //#endregion
//#region Manage Schedules

                // this.props.connection.on(
                //     "ReceiveSchedule",
                //     (name, recurence, category, location, id, start, end, roleGroupId, calendarId) => {
                //         this.props.onReceiveSchedule(name, recurence, category, location, id, start, end, roleGroupId, calendarId
                //         );
                //     }
                // );

                // this.props.onRequestSchedules(this.props.calendarId);

                //#endregion
// if (tempCalendars) {
        //     setCalendars(tempCalendars);
        //     setActiveKey(tempCalendars[0].id);
        //     setSchedules(tempSchedules);
// }
