import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Test from '../components/Test';
import HeaderNavbar from '../components/navbar/HeaderNavbar';
import { MDBContainer } from 'mdbreact';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <HeaderNavbar/>
            <MDBContainer>
                <Switch>
                    <Route exact path="/">
                        <Test/>
                    </Route>
                </Switch>
            </MDBContainer>          
        </BrowserRouter>
    );
}

export default AppRouter;