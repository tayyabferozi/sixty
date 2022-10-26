import {
  REQUEST_CALENDARS_PENDING,
  REQUEST_CALENDARS_SUCCESS,
  REQUEST_CALENDARS_FAILED,
  RECEIVE_CALENDAR,
  SET_CALENDAR
} from '../actions/actionTypes';

const initialState = {
  calendars: [],
  currentCalendar: null
}

const calendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_CALENDARS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_CALENDARS_SUCCESS:
      return Object.assign({}, state, { calendars: action.payload, isPending: false });
    case REQUEST_CALENDARS_FAILED:
      return Object.assign({}, state, { error: action.payload });
    case RECEIVE_CALENDAR:
      return {
        ...state,
        calendars: [...state.calendars, action.payload.calendar]
      };
    case SET_CALENDAR:
      return {
        ...state,
        currentCalendar: action.payload
      }
    default:
      return state;
  }
}


export default calendarReducer