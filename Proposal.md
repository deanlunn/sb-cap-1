AI Meal Plan Generator
By Dean Lunn
What goal will your website be designed to achieve?
The basic goal of this website is to provide a quick meal plan for a week, accompanied by a grocery list, using OpenAI's API for the data. The returned data will be saved to the users account for further viewing

What kind of users will visit your site? In other words, what is the demographic of your users?
Anyone who has trouble creating a healthy meal plan for themselves. Given that the internet is full of random information, the use of OpenAI will cut out all the unnecessary data and sales pitches that are associated with going to other websites. More than likely individuals that are aged 25-45, beyond 45 I think people are scared of AI... AI will likely not be in the name though

What data do you plan on using? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain.
OpenAI's API

In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:
a. What does your database schema look like?
User, Meal Plan, Meal, Ingredients

b. What kinds of issues might you run into with your API?
Possibly character limits, as I know ChatGPT itself seems to cut off after a certain number, but that might be ChatGPT, and not the API itself Figuring out how to make the calls concise so that it returns the proper results

c. Is there any sensitive information you need to secure?
User Passwords Possibly payment options in the future

d. What functionality will your app include?
The ability to have a OpenAI generate a meal plan, and a list of groceries for the meals, and save them to the users account for further viewing. In reality I would like to have just the meal plan executed first, then each meal be a link to a list of ingredients

e. What will the user flow look like?
User is brought to a login page immediately Once logged in they will be presented with a form asking for their Age, Height, and Weight, with a submit button After they hit submit they will be given the produced meal plan from OpenAI, with a save button Once saved they will be able to go to their profile dashboard and view the meal plan again When viewing the meal plan they will be able to click on each meal to view its ingredients There will also be a general grocery list button next to the meal plan header to view all groceries as a whole

f. What could go beyond the basic functions of the app?
Eventually I could have a link produced in each meal that leads to an external recipe site, and or create a recipe with OpenAI I could have links to food services to purchase the groceries as well I could have a user input their favorite foods to make the meal plan more personal I could also create a regenerate function that takes the previous recommendation and tells OpenAI to change it up with different foods, so that the user gets a unique experience with every visit
