import React, { useCallback, useRef, useEffect } from "react";
// import { ReactDOM ,render,hydrate } from "react-dom";
import { createRoot } from "react-dom/client";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { Provider } from "react-redux";
import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import registerServiceWorker from "./registerServiceWorker";

import configureStore, { history } from "./configureStore";

import "./sass/styles.css";

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log("rendered");
  });

  return (
    <Provider store={store}>
      {" "}
      <App history={history} />
    </Provider>
  );
}

// create store
const store = configureStore();
// Append root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<AppWithCallbackAfterRender />);
// root.render(
//   <Provider store={store}>
//     <App history={history}/>
//   </Provider>,
//   rootElement
// );
//// TO use server side -> hydrateroot

registerServiceWorker();

// // Combine reducer
// const RootReducer = combineReducers({
//   calendar : requestCalendars,
//   schedule : requestSchedules
// });

// // Create enhancers
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // Create store
//  const Store = createStore(
//   RootReducer
//   ,window.ReduxInitialState
//  ,composeEnhancers(applyMiddleware(thunkMiddleware, logger))
//   );

// Display Store in the console
//store.subscribe(() => console.log(store.getState()));

// Create Store
// const Store = createStore(
//   RootReducer,
//   //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   //,
//   //window.ReduxInitialState,
//   composeEnhancers(applyMiddleware(thunkMiddleware, logger))
// );

//Dispatch
//store.dispatch(increment);

// setup fake backend
// import { configureFakeBackend } from './_helpers';
//configureFakeBackend();

// const logger = createLogger();
// export const RootReducer = combineReducers({
//   requestCalendars,
//   requestSchedules,
//   userInfo
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const Store = createStore(
//   RootReducer, window.ReduxInitialState,
//   composeEnhancers(applyMiddleware(thunkMiddleware, logger))
// );

// App.defaultProps = {
//   defaultColor: "#999999",
//   title: "Color Picker",
//   labelStyle: {
//     paddingBottom: "7px",
//     fontSize: "11px"
//   },
//   colorTextBoxStyle: {
//     height:"35px",
//     border:"none",
//     borderBottom:'1px solid lightgray',
//     paddingLeft: "35px"
//   }
// }

// const rootElement = document.getElementById("root");
// hydrate(
//   <Provider store={Store}>
//     <App />
//   </Provider>,
//   rootElement
// );
