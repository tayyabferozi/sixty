import {
  SET_USERNAME
} from './actionTypes';

export function setUserName(name) {
  return {
    type: SET_USERNAME,
    payload: name
  }
}