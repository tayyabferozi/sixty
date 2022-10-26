import React, { useEffect, useState } from 'react';
import { Scheduler } from './Component/scheduler';
// import Scheduler from 'devextreme-react/scheduler';
import { connectProps } from '@devexpress/dx-react-core';
import moment from 'moment';
import AppointmentForm from './Component/AppointmentForm';
import AppointmentTooltipContainer from './Component/AppointmentTooltipContainer';
import Appointment from './Component/Appointment';
import { Button, Row, Col } from 'antd';
import Plus from '@2fd/ant-design-icons/lib/Plus';
import { SettingFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
const Schedule = (props) => {
  const [TestData, setTestData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formdata, setFormData] = useState(null);
  const [newForm, setNewForm] = useState(false);
  const [startDay, setStartDay] = useState(0);
  const [scheduleView, setScheduleView] = useState('week');
  const [SelectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [filterText, setFilterText] = useState('');
  var MONDAY_INDEX = 1;
  useEffect(() => {
    if (props.data) {
      AppointmentTooltip.update();
      setTestData(props.data);
    }
  }, [props.data]);
  const onAppointmentFormOpening = (e) => {
    e.cancel = true;
  };

  const onAppointmentUpdating = async (e) => {
    props.updateAppointment(e.newData);
  };

  const onAppointmentClick = (e) => {
    setNewForm(false);
    setFormData({
      ...e.appointmentData,
      startTime: moment(e.appointmentData.startTime),
      endTime: moment(e.appointmentData.endTime),
      startDate: moment(e.appointmentData.startDate),
      endDate: moment(e.appointmentData.endDate),
    });
  };

  const onAppointmentEditBtnClick = () => {
    setNewForm(false);
    setVisible(true);
  };

  const onAppointmentDeleteBtnClick = async (bookingId) => {
    props.handleDelete(bookingId);
  };

  const AppointmentTooltip = connectProps(AppointmentTooltipContainer, () => {
    return {
      onAppointmentEditBtnClick: onAppointmentEditBtnClick,
      onAppointmentDeleteBtnClick: onAppointmentDeleteBtnClick
    };
  });

  const handleSubmit = async (values) => {
    var submitData = { ...values };
    submitData['startDate'] = moment(submitData['startDate']).format('YYYY-MM-DD') + ' ' + moment(submitData['startTime']).format('H:mm:ss');
    submitData['endDate'] = moment(submitData['endDate']).format('YYYY-MM-DD') + ' ' + moment(submitData['endTime']).format('H:mm:ss');
    submitData['startTime'] = moment(submitData['startTime']).format('YYYY-MM-DD H:mm:ss');
    submitData['endTime'] = moment(submitData['endTime']).format('YYYY-MM-DD H:mm:ss');
    console.log(submitData);
    if (newForm) {
      props.handleSubmit(submitData);
    } else {
      props.updateAppointment(values);
    }
    setVisible(false);
  };

  const onCellClick = (e) => {
    setNewForm(true);
    setVisible(false);
    setFormData({
      startDate: moment(e.cellData.startDate),
      endDate: moment(e.cellData.endDate),
      startTime: moment(e.cellData.startDate),
      endTime: moment(e.cellData.endDate),
    });
    setVisible(true);
  };

  const openModal = () => {
    setNewForm(true);
    setVisible(false);
    setFormData({
      startDate: moment(),
      endDate: moment(),
      startTime: moment(),
      endTime: moment().add(30, 'minutes'),
    });
    setVisible(true);
  }

  const onCurrentDateChange = async (e) => {
    setSelectedDate(e);
  };

  const changeView = async (e) => {
    setScheduleView(e);
  };

  const getFilterData = (data, text) => {
    if (!RegExp.escape) {
      RegExp.escape = function (value) {
        // eslint-disable-next-line no-useless-escape
        return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, `\\$&`);
      };
    }
    var result = [];
    text = RegExp.escape(text);
    if (data) {
      data.map((e) => {
        var title = e.title ? e.title.toString() : '';
        if (title.search(text) != -1) {
          result.push(e);
        }
        return true;
      });
    }
    return result;
  };

  const renderDataCell = (itemData) => {
    if (scheduleView == 'month') {
      if (moment(itemData.startDate).isSame(moment().format(), 'day')) {
        return <div style={{ borderTop: `4px solid ${props.basicColor}`, backgroundColor: `${props.basicColor}c9`, color: '#fff' }}>{itemData.text}</div>;
      } else if (moment(itemData.startDate).isSame(moment().format(), 'week')) {
        return <div style={{ borderTop: `1px solid ${props.basicColor}` }}>{itemData.text}</div>;
      } else {
        return <div >{itemData.text}</div>;
      }
    } else {
      // if(moment(itemData.startDate).isSame(moment().format(), 'hour')){
      //   return <div style={{ borderTop: `4px solid ${props.basicColor}` }}>{itemData.text}</div>;
      // } else if (moment(itemData.startDate).format('H') == moment().format('H')) {
      //   return <div style={{ borderTop: `1px solid ${props.basicColor}` }}>{itemData.text}</div>;
      // } else {
      return <div >{itemData.text}</div>;
      // } style={{ width: '100px',  height: '50px',  top: '8px', zIndex: '999',    display: 'inline-flex' }} className={'gx-w-100 gx-text-right gx-d-flex'} 
    }
  };

  //#region utils
  function getFirstWeekDate(date, firstDayOfWeek) {
    var delta = (date.getDay() - firstDayOfWeek + 7) % 7;
    var result = new Date(date);
    result.setDate(date.getDate() - delta);
    return result
  }

  var formatCaptionByMonths = function (lastDate, firstDate) {
    var isDifferentMonthDates = firstDate.getMonth() !== lastDate.getMonth();
    var isDifferentYears = firstDate.getFullYear() !== lastDate.getFullYear();
    //var useShortFormat = isDifferentMonthDates || this.option("_useShortDateFormat");
    var lastDateText;
    var firstDateText;
    var returnDateText;

    if (isDifferentYears) {

      firstDateText = firstDate.getUTCDate();//_date2.default.format(firstDate, getCaptionFormat(true));
      lastDateText = lastDate.getUTCDate();//_date2.default.format(lastDate, getCaptionFormat(true))

      var monthNameFirst = firstDate.toLocaleString('default', { month: 'long' });
      var monthNameLast = lastDate.toLocaleString('default', { month: 'long' });

      var yearNameFirst = firstDate.getFullYear();
      var yearNameLast = lastDate.getFullYear();



      returnDateText = firstDateText + ' ' + monthNameFirst + ' ' + yearNameFirst + '-'
      lastDateText + ' ' + monthNameLast + ' ' + yearNameLast;

    }
    else if (isDifferentMonthDates) {
      firstDateText = firstDate.getUTCDate();//_date2.default.format(firstDate, getCaptionFormat(true));
      lastDateText = lastDate.getUTCDate();//_date2.default.format(lastDate, getCaptionFormat(true))

      var monthNameFirst = firstDate.toLocaleString('default', { month: 'long' });
      var monthNameLast = lastDate.toLocaleString('default', { month: 'long' });

      var yearNameFirst = firstDate.getFullYear();

      returnDateText = firstDateText + ' ' + monthNameFirst + '-' +
        lastDateText + ' ' + monthNameLast + ' ' + yearNameFirst;

    }

    else {

      firstDateText = firstDate.getUTCDate();//_date2.default.format(firstDate, getCaptionFormat(true));
      lastDateText = lastDate.getUTCDate();//_date2.default.format(lastDate, getCaptionFormat(true))

      var monthNameFirst = firstDate.toLocaleString('default', { month: 'long' });

      var yearNameFirst = firstDate.getFullYear();

      returnDateText = monthNameFirst + ' ' + firstDateText + '-' +
        lastDateText + ',' + yearNameFirst;

    }

    return returnDateText.toUpperCase();
  };

  const changeCalendarDate = async (direction) => {
    debugger;
    var   current = new Date(SelectedDate)

    switch (scheduleView) {
      case "day":
        current = new Date(SelectedDate.setDate(calendarDate.getDate() + direction));
        break;
      case "week":
        current = new Date(SelectedDate.setDate(calendarDate.getDate() + 7 * direction));
        break;
      case "month":
        current = new Date(SelectedDate.setMonth(calendarDate.getMonth() + direction));
        break;
    }

    setCalendarDate(current);
  };

  
  // var normalizeDateByWeek = function (date, currentDate) {
  //   var differenceInDays = dateUtils.getDatesInterval(date, currentDate, "day");
  //   var resultDate = new Date(date);
  //   if (differenceInDays >= 6) {
  //     resultDate = new Date(resultDate.setDate(resultDate.getDate() + 7))
  //   }
  //   return resultDate
  // };
  // const getNextDate = function (direction) {
  //   var initialDate = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
  //   var stepConfig = this._getConfig();
  //   var offset = stepConfig.duration * direction;
  //   var date = stepConfig.getDate(new Date(initialDate || this.option("date")), offset);
  //   return date
  // }
  // const updateCurrentDate = function (direction) {
  //   const date = new Date(SelectedDate.setDate(SelectedDate.getDate() + 7));
  //   setSelectedDate(date);
  // }

  //#endregion

  const showCurrentDateCaption = (date) => {
    switch (scheduleView) {
      case "day":
        var dayDateText = date.getUTCDate();//_date2.default.format(firstDate, getCaptionFormat(true));

        var monthNameText = date.toLocaleString('default', { month: 'long' });

        var yearNameText = date.getFullYear();

        return dayDateText + ' ' + monthNameText.toUpperCase(); + ',' + yearNameText;

      case "week":
        var firstDayOfWeek = startDay;//this.option("firstDayOfWeek");
        var firstDayOfWeekIndex = 0;// (firstDayOfWeek) ? firstDayOfWeek : getDefaultFirstDayOfWeekIndex(shift);

        var firstWeekDate = getFirstWeekDate(date, firstDayOfWeekIndex);

        var lastWeekDate = new Date(firstWeekDate);
        var intervalCount = 7;// this.option("intervalCount"); , margin: '10px auto auto 2em' ,color: 'rgb(150, 153, 158)'
        lastWeekDate = new Date(lastWeekDate.setDate(lastWeekDate.getDate() + (intervalCount - 1)));

        return formatCaptionByMonths(lastWeekDate, firstWeekDate);

      case "month":

        var monthNameText = SelectedDate.toLocaleString('default', { month: 'long' }).toUpperCase();

        var yearNameText = SelectedDate.getFullYear();

        return monthNameText + ',' + yearNameText;
    };
  }

  return (
    <div className={'gx-w-100'} >

      <Row className={'gx-flex-sm-row gx-w-100'}>
        <Col span={24}>
       
          <Row className={'gx-flex-sm-row gx-w-100'} style={{ height: '50px' }}>
            <Col span={2} />
            <Col span={1} style={{ zIndex: '999' }}>
              <Button type={'default'} style={{background: 'none'}} onClick={() => { changeCalendarDate(-1)}} icon={<LeftOutlined />}/>
            </Col>
            <Col span={1} />
            <Col span={5} style={{ zIndex: '999' }}>
              <Button type={'default'} className={'currentDate'} style={{background: 'none',fontSize: '23px'}}>{showCurrentDateCaption(calendarDate)}</Button>
            </Col>
            <Col span={1} />
            <Col span={1} style={{ zIndex: '999' }}>
            <Button  type={'default'} style={{background: 'none'}} onClick={() => {{ changeCalendarDate(1) } }} icon={<RightOutlined />}/>
            </Col>
            <Col span={4} />
            <Col span={8} style={{ zIndex: '999', margin: '10px auto auto 10px' }} >
              <Button type={'default'} className={'view_button'} onClick={() => { changeView('day') }} style={{ backgroundColor: scheduleView == 'day' ? props.basicColor : '', color: scheduleView != 'day' ? '#96999e' : '#fff' }}>
                Day
              </Button>
              <Button type={'default'} className={'view_button'} onClick={() => { changeView('week') }} style={{ backgroundColor: scheduleView == 'week' ? props.basicColor : '', color: scheduleView != 'week' ? '#96999e' : '#fff' }}>
                Week
              </Button>
              <Button type={'default'} className={'view_button'}  onClick={() => { changeView('month') }} style={{ backgroundColor: scheduleView == 'month' ? props.basicColor : '', color: scheduleView != 'month' ? '#96999e' : '#fff' }}>
                Month
              </Button>
              <Button className={'gx-mr-3'} type={'default'} icon={<SettingFilled style={{ fontSize: 24, color: '#bbbbbb' }} />} onClick={() => { if (props.editCalendarAvailablity) {
                                                                                                                                                           props.handleEditCalendar();
                                                                                                                                                     }}}/>
              <Button className={'gx-mr-3'} icon={<Plus />} onClick={() => { openModal() }}>
                Ajouter
              </Button>
            </Col>
          </Row>
          
          <Row className={'gx-flex-sm-row gx-w-100'}>
            {TestData &&
              <Scheduler
               // showCurrentTimeIndicator={true}
                dataCellRender={renderDataCell}
                dataSource={getFilterData(TestData, filterText)}
                defaultCurrentView={scheduleView}
                defaultCurrentDate={SelectedDate}
                height={'80vh'}
                showAllDayPanel={true}
                onAppointmentClick={onAppointmentClick}
                onAppointmentFormOpening={onAppointmentFormOpening}
                onCellClick={onCellClick}
                appointmentComponent={Appointment}
                appointmentTooltipComponent={AppointmentTooltip}
                onCurrentDateChange={onCurrentDateChange}
                onAppointmentUpdating={onAppointmentUpdating}
                firstDayOfWeek={startDay}
                currentView={scheduleView}
                currentDate={calendarDate}
                //scrolling={scrollToTime}
                cellDuration={30}
              >
              </Scheduler>
            }
            {formdata !== null && (
              <AppointmentForm
                visible={visible}
                newForm={newForm}
                formdata={formdata}
                handleSubmit={handleSubmit}
                closeModal={() => {
                  setVisible(false);
                }}
              />
            )}

          </Row>
       
        </Col>
      </Row>
    </div>
  );
};

export default Schedule;




{/* <div className={'gx-w-25 gx-h-0'} >
                <Button
                  className={'gx-mr-3'}
                  type={'default'}
                  icon={<LeftOutlined />}
                />
                <Button
                  type={'default'}
                  className={'view_button'}
                >Current Date</Button>
                <Button
                  className={'gx-mr-3'}
                  type={'default'}
                  icon={<RightOutlined />}
                ></Button>
              </div>
              <div className={'calendar_header gx-d-flex gx-w-75'}> */}
{/* <div className={'gx-w-25 gx-h-0'} />
                <div className={'gx-w-100 gx-text-right gx-d-flex'}>
                  <Button
                    type={'default'}
                    className={'view_button'}
                    onClick={() => { changeView('day') }}
                    style={{ backgroundColor: scheduleView == 'day' ? props.basicColor : '', color: scheduleView != 'day' ? '#96999e' : '#fff' }}
                  >Day</Button>
                  <Button
                    type={'default'}
                    className={'view_button'}
                    onClick={() => { changeView('week') }}
                    style={{ backgroundColor: scheduleView == 'week' ? props.basicColor : '', color: scheduleView != 'week' ? '#96999e' : '#fff' }}
                  >Week</Button>
                  <Button
                    type={'default'}
                    className={'view_button'}
                    onClick={() => { changeView('month') }}
                    style={{ backgroundColor: scheduleView == 'month' ? props.basicColor : '', color: scheduleView != 'month' ? '#96999e' : '#fff' }}
                  >Month</Button>
                  {/* <Button
                    type={'default'}
                    className={'view_button'}
                    onClick={() => { changeView('day') }}
                    style={{ backgroundColor: scheduleView == 'day' ? props.basicColor : '', color: scheduleView != 'day' ? '#96999e' : '#fff' }}
                  >Daily</Button> 
                  <div className={'flex-grow-1'} />
                  <input className={'calendar_header_search gx-mr-3'} placeholder="Search by entering keywords" />
                  <Button
                    className={'gx-mr-3'}
                    type={'default'}
                    icon={<Plus style={{ fontSize: 24, color: '#bbbbbb' }} />}
                    onClick={() => { openModal() }}
                  ></Button>
                  <Button
                    className={'gx-mr-3'}
                    type={'default'}
                    icon={<SettingFilled style={{ fontSize: 24, color: '#bbbbbb' }} />}
                    onClick={() => {
                      if (props.editCalendarAvailablity) {
                        props.handleEditCalendar();
                      }
                    }}
                  ></Button>
                </div>
              </div>*/}