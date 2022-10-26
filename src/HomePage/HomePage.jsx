import React from 'react';

import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
      
        if(currentUser && currentUser.id) 
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));

    }

    render() {
        debugger;
        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                    <div className="hero-wrap dt-degree-bg" data-stellar-background-ratio="0.5">
                        <div className="container">
                            <div className="row no-gutters slider-text justify-content-center align-items-center">
                                <div className="col-lg-8 col-md-6 ftco-animate d-flex align-items-end">
                                    <div className="text text-center">
                                        <h1 className="mb-4">The Simplest <br />Way to Find Property</h1>
                                        <p style={{ fontSize: '18px' }}>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts</p>

                                        <div className="row justify-content-center">
                                            <div className="col-lg-10 align-items-end">
                                                <div className="form-group">
                                                    <div className="form-field">
                                                        <input type="text" className="form-control" placeholder="Search location"></input>
                                                        <button><span className="ion-ios-search"></span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mouse">
                            <a href="#" className="mouse-icon">
                                <div className="mouse-wheel"><span className="ion-ios-arrow-round-down"></span></div>
                            </a>
                        </div>
                    </div> 
            </div>
        );
    }
}

export {HomePage}  ;