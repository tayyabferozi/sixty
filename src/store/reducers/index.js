import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import  calendarReducer  from "./calendarReducer";
import scheduleReducer  from "./scheduleReducer";

const rootReducer = (history) => combineReducers({
  calendar : calendarReducer,
  schedule : scheduleReducer
  ,  router: connectRouter(history)
})

export default rootReducer
