import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // Ensure this path is correct for your Axios instance

function Register() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		age: "",
		sex: "male",
		height: "",
		weight: "",
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await API.post("/register", formData);
			navigate("/login"); // Redirect to login page after successful registration
		} catch (error) {
			console.error("Registration error:", error);
			// Handle registration errors here
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-orange-50 rounded-lg shadow-lg w-full max-w-sm p-6">
				<h2 className="mb-6 text-3xl font-bold text-teal-700 text-center">
					Register
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-teal-700 text-sm font-bold mb-2"
						>
							Username:
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
							className="form-input w-full"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-teal-700 text-sm font-bold mb-2"
						>
							Password:
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="age"
							className="block text-teal-700 text-sm font-bold mb-2"
						>
							Age:
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="number"
							id="age"
							name="age"
							value={formData.age}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="sex"
							className="block text-teal-700 text-sm font-bold mb-2"
						>
							Sex:
						</label>
						<select
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="sex"
							name="sex"
							value={formData.sex}
							onChange={handleChange}
							required
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div className="mb-4">
						<label
							htmlFor="height"
							className="block text-teal-700 text-sm font-bold mb-2"
						>
							Height (inches):
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="number"
							id="height"
							name="height"
							value={formData.height}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="weight"
							className="block text-teal-700 text-sm font-bold mb-2"
						>
							Weight (lbs):
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="number"
							id="weight"
							name="weight"
							value={formData.weight}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mb-4">
						<input
							type="submit"
							value="Register"
							className="w-full bg-teal-700 text-white font-bold py-2 px-4 rounded hover:bg-teal-500 focus:outline-none focus:shadow-outline"
						/>
					</div>
				</form>

				<p className="mt-6">
					Already have an account?{" "}
					<a href="/login" className="text-blue-500 hover:text-blue-700">
						Login
					</a>
				</p>
			</div>
		</div>
	);
}

export default Register;
