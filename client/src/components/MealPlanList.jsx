function MealPlanList({ mealPlans, onDeletePlan }) {
	// Check if meal plans are still being fetched
	if (!mealPlans) {
		return <p>Loading meal plans...</p>;
	}

	return (
		<div className="p-6">
			<h3 className="flex items-center justify-center text-2xl text-orange-50 font-bold mb-4">
				Your Personalized Meal Plans:
			</h3>
			{mealPlans.length > 0 ? (
				mealPlans.map((plan) => (
					<div key={plan.id} className="mb-4">
						<MealPlanDetail plan={plan} />
						<div className="flex items-center justify-center">
							<button
								onClick={() => onDeletePlan(plan.id)}
								className="bg-red-500 text-white px-4 py-2 mt-6 mb-6 rounded hover:bg-red-700 transition-colors duration-200"
							>
								Remove
							</button>
						</div>
					</div>
				))
			) : (
				<p className="flex items-center justify-center text-lg text-orange-50">
					No meal plans yet. Create one!
				</p>
			)}
		</div>
	);
}

function MealPlanDetail({ plan }) {
	let mealPlanContent;

	if (typeof plan.content === "string") {
		mealPlanContent = JSON.parse(plan.content);
	} else if (typeof plan.content === "object") {
		mealPlanContent = plan.content;
	} else {
		console.error(
			"Unexpected data type for plan.content:",
			typeof plan.content
		);
		mealPlanContent = {};
	}

	const daysOfWeek = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	const mealsOrder = ["Breakfast", "Lunch", "Snacks", "Dinner"];

	return (
		<div className="bg-orange-50 p-6 rounded-lg shadow-lg">
			<h4 className="text-xl text-teal-700 font-bold mb-4">
				Meal Plan Created On: {new Date(plan.created_at).toLocaleDateString()}
			</h4>
			{daysOfWeek.map((day) => {
				const meals = mealPlanContent[day];
				return meals ? (
					<div key={day} className="mb-4">
						<strong className="text-lg text-teal-700 font-semibold">
							{day}
						</strong>
						:
						<ul className="list-disc list-inside">
							{mealsOrder.map((mealType) => {
								const details = meals[mealType];
								return details ? (
									<li key={mealType} className="ml-5">
										{mealType}: {details.food} ({details.calories})
									</li>
								) : null;
							})}
						</ul>
					</div>
				) : null;
			})}
		</div>
	);
}
export default MealPlanList;
