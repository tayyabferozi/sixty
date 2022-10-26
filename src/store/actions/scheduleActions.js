import React, { Component, useCallback, useRef } from "react";
import { getData } from "../../_services/api";
import { authenticationService } from '@/_services';
import {
  REQUEST_SCHEDULES_PENDING,
  REQUEST_SCHEDULES_SUCCESS,
  REQUEST_SCHEDULES_FAILED,
  RECEIVE_SCHEDULE
} from "./actionTypes";
const baseUrl =  "https://localhost:5001/CalendarApi/Schedules";

// export const requestSchedules = (calendarId = "") => dispatch => {
//   const url = calendarId ? `${baseUrl}/${calendarId}` : baseUrl;
//   dispatch({ type: REQUEST_SCHEDULES_PENDING });
//   getData(url)
//     .then(data => dispatch({ type: REQUEST_SCHEDULES_SUCCESS, payload: data }))
//     .catch(error =>
//       dispatch({ type: REQUEST_SCHEDULES_FAILED, payload: error })
//     );
// };



export const requestSchedules = (dispatch) => {
 var token = authenticationService.currentUserValue;
 
   const url = token ? `${baseUrl}?token=${token}` : baseUrl;
  dispatch({ type: REQUEST_SCHEDULES_PENDING });
  getData(url)
    .then(
      data => dispatch({ type: REQUEST_SCHEDULES_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: REQUEST_SCHEDULES_FAILED, payload: error })
    );
};

export function receiveSchedule( name = "", recurence= "", category= "", location= "", calendarId = null, id = null, start = null, end = null, roleGroupId = null) {
  return {
    type: RECEIVE_SCHEDULE,
    payload: {
      schedule: { name, recurence, category, location, calendarId, id, start,end,roleGroupId}
    }
  };
}