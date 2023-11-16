import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

const AppRoutes = () => {
	const { isLoggedIn, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/dashboard"
				element={isLoggedIn ? <Dashboard /> : <Navigate replace to="/login" />}
			/>
			{/* Additional routes will be added here as needed */}
		</Routes>
	);
};

export default AppRoutes;
