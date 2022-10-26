import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
// import thunkMiddleware from "redux-thunk";
import createRootReducer from './store/reducers'
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk';

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // Create Logger
  const logger = createLogger();
  
  //Create Store
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history), logger
      ),
    ),
  )

//   // Hot reloading
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('./reducers', () => {
//       store.replaceReducer(createRootReducer(history));
//     });
//   }

  return store
}
