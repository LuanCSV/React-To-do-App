import React from 'react';
import {Switch, Route, Redirect } from 'react-router';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';

const Routes = props => {
    return (
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/to-do' component={Home}/>
            <Route path='/not-found' component={NotFound}/>
            <Redirect from="*" to="/not-found"/>
        </Switch>
    )
}

export default Routes;