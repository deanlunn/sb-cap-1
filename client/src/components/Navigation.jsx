import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import API from "../services/api";
import logo from "../assets/MealMeLogoPng.png";

function Navigation() {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await API.get("/logout", { withCredentials: true }); // Ensure credentials are included
			setIsLoggedIn(false);
			navigate("/"); // Redirect to home or login page after logout
		} catch (error) {
			console.error("Logout error:", error);
			// Optionally, handle error (e.g., show error message)
		}
	};

	return (
		<nav className="fixed top-0 w-full flex items-center justify-between p-4 bg-orange-50 text-teal-700 navbar">
			<img
				src={logo}
				alt="Logo"
				className="logo ml-6"
				style={{ height: "35px", width: "35px" }}
			/>
			<ul className="flex items-center space-x-4">
				{isLoggedIn ? (
					<>
						<li>
							<button
								onClick={handleLogout}
								className="font-glass-antiqua text-2xl mx-6"
							>
								Logout
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login" className="font-glass-antiqua text-2xl mr-2">
								Login
							</Link>
						</li>
						<li>
							<Link to="/register" className="font-glass-antiqua text-2xl mr-6">
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Navigation;
