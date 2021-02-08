import {useState, useContext, createContext, FC, ReactNode} from "react";
import {login, pingAuth} from "../services/auth";

interface IAuthContext {
    signIn: (...args: any[]) => Promise<any>;
    checkIsAuth: () => Promise<boolean>;
}

const authContext = createContext<IAuthContext>({
    signIn: () => Promise.resolve(),
    checkIsAuth: () => Promise.resolve(false),
});

export const ProvideAuth: FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = (email: string, password: string) => {
        console.log(email, password);
        return login(email, password).then(result => {
            setIsAuthenticated(true);
            return result;
        })
    };

    const checkIsAuth = async () => {
        const hasJwt = !!localStorage.getItem('jwt');
        if (isAuthenticated && hasJwt) {
            return isAuthenticated;
        } else if (hasJwt) {
            // hit the ping-auth endpoint.
            const isAuth = await pingAuth();
            setIsAuthenticated(isAuth);
            return isAuth;
        }
        return false;
    };

    return {
        signIn,
        checkIsAuth,
    };
}
