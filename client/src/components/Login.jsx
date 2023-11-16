import { useState, useContext } from "react";
import MealPlanContext from "../MealPlanContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import API from "../services/api";

function Login() {
	const { setIsLoggedIn, setUser } = useAuth();
	const { setMealPlans } = useContext(MealPlanContext); // Access setMealPlans from context
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});
	const navigate = useNavigate();
	const [remember, setRemember] = useState(false);

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleRememberChange = (e) => {
		setRemember(e.target.checked); // Add this line
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await API.post("/login", { ...credentials, remember });
			setIsLoggedIn(true); // Set logged-in state to true
			setUser(response.data.user); // Store user data in state

			// Fetch meal plans after successful login
			const mealPlanResponse = await API.get("/dashboard");
			setMealPlans(mealPlanResponse.data.meal_plans); // Store meal plans in state

			navigate("/dashboard"); // Redirect to dashboard after successful login
		} catch (error) {
			console.error("Login error:", error);
			// Handle login errors here (e.g., display an error message)
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-orange-50 rounded-lg shadow-lg w-full max-w-sm p-6">
				<h2 className="mb-6 text-3xl font-bold text-teal-700 text-center">
					Login
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-teal-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username:
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="username"
							name="username"
							value={credentials.username}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							className="block text-teal-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password:
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							id="password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mb-4 flex items-center">
						<input
							className="mr-2"
							type="checkbox"
							id="remember"
							checked={remember}
							onChange={handleRememberChange}
						/>
						<label htmlFor="remember" className="text-sm text-gray-700">
							Remember me
						</label>
					</div>

					<div className="mb-4">
						<input
							className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
							type="submit"
							value="Login"
						/>
					</div>
				</form>

				<p className="text-sm text-gray-700 text-center">
					Don't have an account?{" "}
					<a href="/register" className="text-blue-500 hover:text-blue-700">
						Register
					</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
