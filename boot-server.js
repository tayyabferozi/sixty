import * as prerendering from 'aspnet-prerendering';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { Provider } from "react-redux";
// import "./src/index.css";
import App from "./src/App";
import { Store } from "./src/index";

export var SR = prerendering.createServerRenderer((params) => {
    return new Promise((resolve, reject) => {
      //  var Store = createStore(RootReducer, applyMiddleware(thunk));
        var app = <Provider store={Store}><App /></Provider>;


        renderToString(app); // This kick off any async tasks started by React components
        // any async task (has a Promise) should call addTask() to add to domainTasks.
        // only do the actual rendering when all async tasks are done.
        params.domainTasks.then(() => {
            resolve({
                html: renderToString(app),
                globals: {
                    ReduxInitialState: Store.getState()
                }
            });
        }, reject); // Also propagate any errors back into the host application
    });
});
