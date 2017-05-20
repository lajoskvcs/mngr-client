import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
//import ProjectsPage from './components/projects/ProjectsPage';
//import ProjectPage from './components/projects/ProjectPage';

export default (
<Route path="/" component={App}>
    <IndexRoute component={HomePage} />

</Route>
);