import { getData } from '../../_services/api';
import {
  REQUEST_CALENDARS_PENDING,
  REQUEST_CALENDARS_SUCCESS,
  REQUEST_CALENDARS_FAILED,
  SET_CALENDAR,
  RECEIVE_CALENDAR
} from './actionTypes';

export const setCalendar = (calendar) => ({ type: SET_CALENDAR, payload: calendar })

export const requestCalendars = (dispatch) => {
  dispatch({ type: REQUEST_CALENDARS_PENDING })
  getData('https://localhost:5001/CalendarApi/Calendars')
  .then(data => dispatch({ type: REQUEST_CALENDARS_SUCCESS, payload: data }))
  .catch(error => dispatch({ type: REQUEST_CALENDARS_FAILED, payload: error }))
}

// export const requestCalendars = (dispatch)  => {
//   debugger;
//   dispatch({ type: REQUEST_CALENDARS_PENDING })
//   getData('https://localhost:5001/CalendarApi/Calendars')
//   .then(data => dispatch({ type: REQUEST_CALENDARS_SUCCESS, payload: data }))
//   .catch(error => dispatch({ type: REQUEST_CALENDARS_FAILED, payload: error }))
// }

export function receiveCalendar(        
  color = "",
  bgcolor = "",
  name = "",
  id = null,
  selected = false
) {
  return {
    type: RECEIVE_CALENDAR,
    payload: {
      Calendar: {
        id,
        name,
        color,
        bgcolor,
        selected
      }
    }
  }
}