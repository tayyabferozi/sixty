import React from 'react';
import { Route, Navigate  } from 'react-router-dom';

import { authenticationService } from '@/_services';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
    
        if (!currentUser) {

            console.log(this.props.history);
            // if(this.props.history.location.pathname != '/' )//props.location.pathname
            // {
            //     <Navigate to={{ pathname:this.props.history.location.pathname, state: { from: props.location } }} /> //props.location.pathname
            // }
            // else
            // {
            //     // not logged in so redirect to login page with the return url
            //     return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            // }
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            
            console.log("redirect role");
            // role not authorised so redirect to home page
            return <Navigate  to={{ pathname: '/'}} />
        }
        // authorised so return component
        return <Component {...props}  />
    }} />
)