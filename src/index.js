import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import './index.css';
import reducer from './reducers';
import CalendarContainer from './containers/Calendar';
import * as serviceWorker from './serviceWorker';

const middleware = createLogger();
const store = createStore(reducer, applyMiddleware(middleware));

ReactDOM.render(
  <Provider store={store}>
    <CalendarContainer />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
