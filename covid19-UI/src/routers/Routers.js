import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Tracking from '@/pages/tracking/';
import Reporting from '@/pages/reporting/';
import Admin from '@/pages/admin/';


const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Tracking}/>
            <Route exact path="/reporting" component={Reporting}/>
            <Route exact path="/admin" component={Admin}/>
        </Switch>
    </BrowserRouter>
);


export default BasicRoute;