import { useContext, useEffect, useState } from "react";
import MealPlanForm from "./MealPlanForm";
import MealPlanList from "./MealPlanList";
import API from "../services/api";
import MealPlanContext from "../MealPlanContext";
import { useAuth } from "../AuthContext";

function Dashboard() {
	const { mealPlans, setMealPlans } = useContext(MealPlanContext);
	const { user, loading } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	if (loading) {
		return <div>Loading...</div>;
	}

	useEffect(() => {
		const fetchMealPlans = async () => {
			try {
				const response = await API.get("/dashboard");
				console.log("Meal plans data:", response.data.meal_plans);
				setMealPlans(response.data.meal_plans);
			} catch (error) {
				console.error("Error fetching meal plans:", error);
			}
		};

		fetchMealPlans();
	}, []);

	const addMealPlan = async (formData) => {
		setIsLoading(true);
		// Extract the necessary fields from formData
		const { cuisine, calories } = formData;

		// Create a new object with only the fields the server expects
		const dataToSend = { cuisine, calories };

		console.log("Data to send:", dataToSend); // Log the data to send

		try {
			const response = await API.post("/generate_meal_plan", dataToSend);
			console.log("Response data:", response.data); // Log the response data
			setMealPlans((prevMealPlans) => [...prevMealPlans, response.data]);
		} catch (error) {
			console.error("Error generating meal plan:", error);
			// Handle errors appropriately
		} finally {
			setIsLoading(false);
		}
	};

	const deleteMealPlan = async (id) => {
		try {
			await API.post(`/delete_meal_plan/${id}`);
			setMealPlans(mealPlans.filter((plan) => plan.id !== id));
		} catch (error) {
			console.error("Error deleting meal plan:", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen m-20">
			{isLoading ? (
				<div className="text-3xl text-orange-50">
					Robots take their time... 🤖
				</div>
			) : (
				<>
					<h2 className="text-6xl font-glass-antiqua text-orange-50 font-bold mb-4">
						Welcome, {user ? user.username : "User"}!
					</h2>
					<div className="flex flex-col items-center">
						<MealPlanForm onNewPlanCreated={addMealPlan} className="mb-4" />
						<MealPlanList mealPlans={mealPlans} onDeletePlan={deleteMealPlan} />
					</div>
				</>
			)}
		</div>
	);
}

export default Dashboard;
