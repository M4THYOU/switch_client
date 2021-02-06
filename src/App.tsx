import React from 'react';
// import logo from './logo.svg';
import {SignIn} from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { SwitchControl } from "./components/SwitchControl";
import {PleaseConfirm} from "./pages/PleaseConfirm";
import {PATH_CONFIRM_EMAIL, PATH_LOGIN, PATH_REGISTER} from "./services/routePaths";
function App() {
    return (
        <Router>
            <Switch>
                <Route path='/switch'><SwitchControl thingId="esp8266" /></Route>
                <Route path={PATH_REGISTER}><SignUp /></Route>
                <Route path={PATH_LOGIN}><SignIn /></Route>
                <Route path={PATH_CONFIRM_EMAIL}><PleaseConfirm /></Route>
            </Switch>
        </Router>
    );
}

export default App;
