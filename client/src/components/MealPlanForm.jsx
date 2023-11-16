import { useState } from "react";

function MealPlanForm({ onNewPlanCreated }) {
	const [formData, setFormData] = useState({
		cuisine: "",
		calories: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const mealPlanData = {
			cuisine: formData.cuisine,
			calories: formData.calories,
		};

		onNewPlanCreated(mealPlanData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-orange-50 rounded-lg shadow-lg w-full max-w-sm p-6"
		>
			<div className="mb-4">
				<label
					className="block text-teal-700 text-sm font-bold mb-2"
					htmlFor="cuisine"
				>
					Cuisine Type:
				</label>
				<select
					id="cuisine"
					name="cuisine"
					value={formData.cuisine}
					onChange={handleChange}
					required
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-select block w-full mt-1 bg-white"
				>
					<option value="" disabled>
						Select a Cuisine
					</option>
					<option value="vegan">Vegan</option>
					<option value="vegetarian">Vegetarian</option>
					<option value="mediterranean">Mediterranean</option>
					<option value="ketogenic">Keto</option>
					<option value="paleo">Paleo</option>
					<option value="italian">Italian</option>
					<option value="french">French</option>
					<option value="chinese">Chinese</option>
					<option value="japanese">Japanese</option>
					<option value="mexican">Mexican</option>
					<option value="american">American</option>
					<option value="british">British</option>
					<option value="caribbean">Caribbean</option>
					<option value="german">German</option>
					<option value="greek">Greek</option>
					<option value="indian">Indian</option>
					<option value="irish">Irish</option>
					<option value="korean">Korean</option>
					<option value="moroccan">Moroccan</option>
					<option value="polish">Polish</option>
					<option value="portuguese">Portuguese</option>
					<option value="russian">Russian</option>
					<option value="spanish">Spanish</option>
					<option value="thai">Thai</option>
					<option value="turkish">Turkish</option>
					<option value="vietnamese">Vietnamese</option>
					<option value="lebanese">Lebanese</option>
					<option value="ethiopian">Ethiopian</option>
					<option value="cuban">Cuban</option>
					<option value="peruvian">Peruvian</option>
				</select>
			</div>
			<div className="mb-4">
				<label
					className="block text-teal-700 text-sm font-bold mb-2"
					htmlFor="calories"
				>
					Calorie Limit:
				</label>
				<input
					type="text"
					id="calories"
					name="calories"
					value={formData.calories}
					onChange={handleChange}
					required
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<button
				type="submit"
				className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
			>
				Generate New Meal Plan
			</button>
		</form>
	);
}

export default MealPlanForm;
