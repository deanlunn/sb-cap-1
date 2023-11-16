# Project Name: MealMe

**Deployed At:** TBD

A user can register an account and login to a dashboard. The Dashboard allows you to generate a meal plan based on a maximum number of calories that the user chooses and a style of cuisine of their liking.

First you come to the home page where you are greeted by the welcome message. You will register at the top of the page using the navigation bar. Once you register you will login to the page and will then be taken to the dashboard where you will input your selections. Then you will click generate meal plan and wait for the robots to respond. Once the meal is generated you will have it available to you until you decide to delete it, you can generate multiple meal plans for different cuisines. You can logout out if you choose once you are done.

OpenAI's API was used to produce the meal plan and I created a simple database to store the users and their plans.

The backend is a simple Python program, using Flask and some Flask tools. The frontend is made with React using Axios.

## Future Updates

I plan to add a user account page on future updates. The users info will be used to make specialized calls to the API for more custom meal plan options. I also intend to add a grocery list option that will be available to call after the meal plan is generated. Further down the road I will incorporate links to places to buy groceries or have them delivered from external services.
