import { useState, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import MealPlanContext from "./MealPlanContext";
import backgroundImage from "./assets/CuttingBoard.png";

import Navigation from "./components/Navigation";
import AppRoutes from "./components/AppRoutes"; // Import AppRoutes as a separate component

function App() {
	const [mealPlans, setMealPlans] = useState([]);

	return (
		<div className="flex flex-col justify-around">
			<div
				className="bg-fixed bg-cover bg-center"
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				<AuthProvider>
					<MealPlanContext.Provider value={{ mealPlans, setMealPlans }}>
						<Router>
							<Navigation />
							<AppRoutes />
						</Router>
					</MealPlanContext.Provider>
				</AuthProvider>
			</div>
		</div>
	);
}

export default App;
