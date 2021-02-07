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
import {PATH_CONFIRM_EMAIL, PATH_LOGIN, PATH_REGISTER} from "./services/routePaths";
import PrivateRoute from "./components/PrivateRoute";
import {ProvideAuth} from "./hooks/use-auth";
function App() {
    return (
        <ProvideAuth>
        <Router>
            <Switch>
                <PrivateRoute component={PleaseConfirm} exact path='/' />
                <Route exact path='/switch'><SwitchControl thingId="esp8266" /></Route>
                <Route exact path={PATH_REGISTER} component={SignUp} />
                <Route exact path={PATH_LOGIN} component={SignIn} />
                <Route exact path={PATH_CONFIRM_EMAIL} component={PleaseConfirm} />

            </Switch>
        </Router>
        </ProvideAuth>
    );
}

export default App;
