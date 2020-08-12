import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Test from '../components/Test';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Test/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default AppRouter;