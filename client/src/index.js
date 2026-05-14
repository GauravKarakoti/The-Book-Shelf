import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './store/reducers';
import Routes from './routes';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

const createStoreWithMiddleware = createStore(reducers, composeWithDevTools(applyMiddleware(promiseMiddleware)));
// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware}>
      <Routes/>
    </Provider>
  </React.StrictMode>
);