import {useState, useContext, createContext, FC, ReactNode} from "react";

const fakeAuth = {
    isAuthenticated: false,
    signin(cb: (...args: any[]) => void) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: (...args: any[]) => void) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

interface test {
    user: string;
    signin: (...args: any[]) => void;
    signout: (...args: any[]) => void;
}

const authContext = createContext<test>({user: '', signin: () => {}, signout: () => {}});

// ReactNode
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
    const [user, setUser] = useState('');

    const signin = (cb: (...args: any[]) => void) => {
        return fakeAuth.signin(() => {
            setUser('user');
            cb();
        });
    };

    const signout = (cb: (...args: any[]) => void) => {
        return fakeAuth.signout(() => {
            setUser('');
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}
