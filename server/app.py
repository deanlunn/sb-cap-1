from flask import Flask, jsonify, request,
from flask_login import (
    LoginManager,
    login_user,
    logout_user,
    login_required,
    current_user,
)
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
import openai
from models import db, User, MealPlan
import json
from flask_cors import CORS
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///mealme3"
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "fallback_key_for_development")
db.init_app(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

login_manager = LoginManager()
login_manager.init_app(app)

CORS(app, supports_credentials=True)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username, password_input = data.get("username"), data.get("password")
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409
    if not password_input:
        return jsonify({"error": "Password is required"}), 400
    new_user = User(
        username=username,
        password=generate_password_hash(password_input, method="pbkdf2:sha256"),
        age=data.get("age"),
        sex=data.get("sex"),
        height=data.get("height"),
        weight=data.get("weight"),
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(username=data.get("username")).first()
    if user and check_password_hash(user.password, data.get("password")):
        remember = data.get("remember", False)
        login_user(user, remember=remember)
        return jsonify({"message": "Login successful", "user": user.to_dict()}), 200
    return jsonify({"error": "Invalid username or password"}), 401


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200


@app.route("/dashboard")
@login_required
def dashboard():
    user_meal_plans = MealPlan.query.filter_by(user_id=current_user.id).all()
    deserialized_meal_plans = [
        {
            "id": meal_plan.id,
            "created_at": meal_plan.created_at,
            "user_id": meal_plan.user_id,
            "content": json.loads(meal_plan.content),
        }
        for meal_plan in user_meal_plans
    ]
    return jsonify({"meal_plans": deserialized_meal_plans}), 200


@app.route("/generate_meal_plan", methods=["POST"])
@login_required
def generate_meal_route():
    if request.method == "POST":
        data = request.get_json()
        print(f"Request data: {data}")
        cuisine = data.get("cuisine")
        cal = data.get("calories")

        user_details = {
            "username": current_user.username,
            "age": current_user.age,
            "sex": current_user.sex,
            "height": current_user.height,
            "weight": current_user.weight,
        }

        result = call_openai_generate_meal_plan(cuisine, cal, user_details)

        if result:
            try:
                serialized_result = json.dumps(result)
                new_meal_plan = MealPlan(
                    content=serialized_result, user_id=current_user.id
                )
                db.session.add(new_meal_plan)
                db.session.commit()

                return (
                    jsonify(
                        {
                            "id": new_meal_plan.id,
                            "created_at": new_meal_plan.created_at.isoformat(),
                            "content": serialized_result,
                        }
                    ),
                    201,
                )

            except Exception as e:
                print(f"Error during serialization or database operation: {e}")
                return jsonify({"error": "Internal server error"}), 500

        else:
            return jsonify({"error": "Error generating meal plan"}), 400


def call_openai_generate_meal_plan(cuisine, cal, user_details):
    print(f"Parameters: {cuisine}, {cal}, {user_details}")
    username = user_details["username"]
    age = user_details["age"]
    sex = user_details["sex"]
    height = user_details["height"]
    weight = user_details["weight"]

    completion = generate_meal_plan_with_openai(cuisine, cal, age, sex, height, weight)
    text = [s for s in completion.splitlines() if s]
    final_diet_chart = process_meals(text)
    print(f"Return value: {final_diet_chart}")
    return final_diet_chart


def generate_meal_plan_with_openai(cuisine, cal, age, sex, height, weight):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a dietician."},
            {
                "role": "user",
                "content": f"Generate a weekly {cuisine} meal plan for a {age} year old {sex}, with height {height} and weight {weight}. They need a plan with only 1 choice for breakfast, 1 choice for lunch, 1 choice for dinner and 1 choice for snacks. The total calories of the day is {cal}. Also print the approximate calorie count for each meal. Format the output as the following : Day \n mealtype \n meal \n calories. No other text is required. The mealtype should be in the following format and spelling : Breakfast, Lunch, Dinner ,Snacks.",
            },
        ],
        temperature=0,
        n=1,
    )
    response = completion["choices"][0].get("message").get("content")
    return response


def process_meals(text):
    weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]
    meal_types = ["Breakfast", "Lunch", "Dinner", "Snacks"]
    current_day = ""
    diet_chart = {}
    current_meal_type = ""
    meals_for_day = {}
    food_item = {}

    for item in text:
        if item in weekdays:
            current_day = item
        elif item in meal_types:
            current_meal_type = item
        elif "calories" in item:
            food_item["calories"] = item
            meals_for_day[current_meal_type] = food_item
            food_item = {}
        else:
            food_item["food"] = item

        if len(meals_for_day) == 4:
            diet_chart[current_day] = meals_for_day
            meals_for_day = {}
            food_item = {}

    print(diet_chart)
    return diet_chart


@app.route("/delete_meal_plan/<int:plan_id>", methods=["POST"])
@login_required
def delete_meal_plan(plan_id):
    meal_plan = MealPlan.query.get_or_404(plan_id)
    if meal_plan.user_id != current_user.id:
        abort(403)
    db.session.delete(meal_plan)
    db.session.commit()
    return jsonify({"message": "Meal plan deleted successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)
