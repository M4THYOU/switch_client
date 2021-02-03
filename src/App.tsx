import React from 'react';
// import logo from './logo.svg';
import {SignIn} from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

// import { SwitchControl } from "./components/SwitchControl";
// {/*<SwitchControl thingId="esp8266" />*/}
function App() {
    return (
        <Router>
            <Switch>
                <Route path='/register'>
                    <SignUp />
                </Route>
                <Route path='/login'>
                    <SignIn />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
