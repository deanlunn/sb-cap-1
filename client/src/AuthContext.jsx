import { useContext, createContext, useState, useEffect } from "react";
import API from "./services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
			setIsLoggedIn(true);
			setLoading(false);
		} else {
			API.get("/dashboard")
				.then((response) => {
					if (response.data.user) {
						setUser(response.data.user);
						setIsLoggedIn(true);
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				})
				.finally(() => {
					// Set loading to false even if the user is not logged in
					setLoading(false);
				});
		}
	}, []);

	// Store user data in localStorage whenever it changes
	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	return (
		<AuthContext.Provider
			value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
