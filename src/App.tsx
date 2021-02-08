import React from 'react';
// import logo from './logo.svg';
import {SignIn} from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { SwitchControl } from "./components/ui/SwitchControl";
import {PleaseConfirm} from "./pages/PleaseConfirm";
import {PATH_CONFIRM_EMAIL, PATH_HOME, PATH_LOGIN, PATH_REGISTER} from "./services/routePaths";
import {Dashboard} from "./pages/Dashboard";
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={PATH_HOME} component={Dashboard} />
                <Route exact path='/switch'><SwitchControl thingId="esp8266" /></Route>
                <Route exact path={PATH_REGISTER} component={SignUp} />
                <Route exact path={PATH_LOGIN} component={SignIn} />
                <Route exact path={PATH_CONFIRM_EMAIL} component={PleaseConfirm} />
            </Switch>
        </Router>
    );
}

export default App;
