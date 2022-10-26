import {
  REQUEST_SCHEDULES_PENDING,
  REQUEST_SCHEDULES_SUCCESS,
  REQUEST_SCHEDULES_FAILED,
  RECEIVE_SCHEDULE
} from "../actions/actionTypes";

const initialState = {
  schedules: [],
  currentcalendarId: null
};

const scheduleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_SCHEDULES_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_SCHEDULES_SUCCESS:
      return Object.assign({}, state, {
        schedules: action.payload,
        isPending: false
      });
    case REQUEST_SCHEDULES_FAILED:
      return Object.assign({}, state, { error: action.payload });
    case RECEIVE_SCHEDULE:
      if (action.payload.currentCalendarId === action.payload.schedule.calendarId) {
        return {
          ...state,
          schedules: [...state.schedules, action.payload.schedule]
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default scheduleReducer