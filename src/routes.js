import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import UnauthenticatedApp from './components/UnauthenticatedApp';
import AuthApp from './components/AuthenticatedApp';
import HomePage from './components/home/HomePage';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import UserGetter from './components/authentication/UserGetter';

export default (
<Route path="/" component={App}>
    <Route component={UnauthenticatedApp}>
        <IndexRoute component={HomePage} />
        <Route path="login" component={Login}/>
        <Route path="getCurrentUser" component={UserGetter}/>
        <Route path="register" component={Register}/>
    </Route>
    <Route component={AuthApp}>
        <Route path="dashboard" />
    </Route>
</Route>
);