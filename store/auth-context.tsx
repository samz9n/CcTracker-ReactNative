import { createContext, ReactNode, useState } from 'react';

interface AuthContextProps {
	token: string | null;
	isAuthenticated: boolean;
	authenticate: (token: string | null) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
	token: '',
	isAuthenticated: false,
	authenticate: () => {},
	logout: () => {}
});

interface AuthContextProviderProps {
	children: ReactNode;
}

function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [ authToken, setAuthToken ] = useState<string | null>(null);

	function authenticate(token: string | null) {
		setAuthToken(token);
	}
	function logout() {
		setAuthToken(null);
	}
	const value = {
		token: authToken,
		/* Turns the token into a boolean (if there is a authToken, then isAuthenticated = true) */
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
