import React, { FC } from "react";
import {Route} from "react-router-dom";
import {Redirect} from "react-router";
import {useAuth} from "../hooks/use-auth";
import {RouteComponentProps, RouteProps} from "react-router/ts4.0";

// export const PrivateRoute: FC<{ component: Component, exact: boolean, path: string }> = ({ component, exact, path }) => {
const PrivateRoute: FC<RouteProps> = ({ component: Component, ...rest }) => {
    let auth = useAuth();
    if (!Component) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps<{}>) => !!auth.user ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}

            // render={props =>
            //     !!auth.user ? (
            //         <Component {...props} />
            //     ) : (
            //         <Redirect to={{ pathname: '/login' }} />
            //     )
            // }
        />
    );
}
export default PrivateRoute;
