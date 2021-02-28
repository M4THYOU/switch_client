import React from 'react';
// import logo from './logo.svg';
import {SignIn} from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {PleaseConfirm} from "./pages/PleaseConfirm";
import {PATH_CONFIRM_EMAIL, PATH_HOME, PATH_INVITATION_ACCEPT, PATH_LOGIN, PATH_REGISTER} from "./services/routePaths";
import {Dashboard} from "./pages/Dashboard";
import {AcceptInvite} from "./pages/AcceptInvite";

function App() {
    return (
        <Router>
            <Switch>
                {/* Auth required */}
                <Route exact path={PATH_HOME} component={Dashboard} />

                {/* Auth not required */}
                <Route exact path={PATH_REGISTER} component={SignUp} />
                <Route exact path={PATH_LOGIN} component={SignIn} />
                <Route exact path={PATH_CONFIRM_EMAIL} component={PleaseConfirm} />
                <Route exact path={PATH_INVITATION_ACCEPT} component={AcceptInvite}/>
            </Switch>
        </Router>
    );
}

export default App;
