import { BehaviorSubject } from 'rxjs';
import  ApiCore  from  './common/api-core';

import config from 'config';
import { handleResponse } from '@/_helpers';

// Get current Token value
const currentUserSubject = new BehaviorSubject(localStorage.getItem('token'));
const baseUrl = "https://localhost:5001";
const url = "AccountApi";

const apiTasks = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: false,
    patch: true,
    delete: false,
    url: url//,
    // plural: plural,
    // single: single
  });

export const authenticationService = {
    login,
    register,
    logout,
    getUserByToken,
    currentUser: currentUserSubject.asObservable(),//Get current user,
    get currentUserValue () { debugger; return currentUserSubject.value }
};

// Login a user
function login(usernameText, passwordText) {
 debugger;
    return apiTasks.post('Login',{username: usernameText,password: passwordText,grant_type: 'password'})//JSON.stringify({'username' :username , 'password': password})); //,'grant_type': 'password'
    .then(function (response) {
        localStorage.setItem('token', response.token);
        currentUserSubject.next(response.token);
          })

        // user => {
        // alert(user);
        // // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify(user));

        // return user;
    // });
}

// Register a user
function register(usernameText, passwordText,confirmpasswordText) {
    return apiTasks.post('Register',{Email: usernameText,password: passwordText,confirmpassword:confirmpasswordText,grant_type: 'password'})
    .then(
        function (response) {
            localStorage.setItem('token', response.token);
            currentUserSubject.next(response.token);
      })
}

// Register a user
function  getUserByToken(token) {
    return apiTasks.post('getUserByToken',token)
    .then(
        function (response) {
            localStorage.setItem('user', response.token);
      })
}

// Logout
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
     currentUserSubject.next(null);
}