import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import createRootReducer from './reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import 'semantic-ui-css/semantic.min.css';

const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history), // root reducer with router state
    applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/">
                <App history={history}/>
            </Route>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
