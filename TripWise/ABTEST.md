### A/B Test: Day/Night Question Addition
#### User Story Number: 2
#### Metric (from the HEART grid): Increase in booking (task success)
**Hypothesis:**
People may feel as though the destinations and activities that they are seeing after completing the quiz do not suit them. Adding a question along the lines of, “Are you a day person or a night person?” will get more specific data about a user that can be used to select destinations and activities that will more closely appeal to them, thus increasing the number of users that end up booking a vacation through the app.

**Experiment:** We will add the question to the portion of the database that holds the questions that get included in the quiz. We will use Firebase to create a variant of the quiz that includes the question and one that has the quiz as it is currently, without the question. We will select a percentage of users (such as 25%) that will get the quiz with the added question, while the rest will get the current, unchanged quiz. By looking at which group of users has the highest percentage of users that end up booking through the app, which will be observed by Firebase Analytics through a booking event, we will determine whether or not the change is appropriate in helping us complete our task.

**Variations:** We will have two variations: A quiz with the normal question and a quiz with the question added. The question will be inserted roughly in the middle of the quiz. 
Here is a rough mockup of how it would appear in the quiz:

<img src=./src/abtesting1.png width="300" height=auto>

<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

### A/B Test: Background Color Adjustment
#### User Story Number: 3
#### Metric (from the HEART grid): Net Promoter Score
**Hypothesis:**
Some people are more attracted to certain looks within an app over others because of UI elements such as the background and features of the app. We believe that if we have 2 control groups, one with a different background than the other, depending on the group of people that test the app, we may see more or less activity from users interacting with our app because of a different background color. Therefore, we believe that based on the feedback collected in terms of how long these users stay in the app with the UI change vs the one without the UI change, we can decide which color background fosters the most user satisfaction. 

**Experiment:** In order to test this hypothesis, we will roll out two different versions of the app - one with the regular white background, and one with a slate colored background. We will use Firebase to create variants of the quiz with each of these background colors. We will select a percentage of users to get the slate background, while the rest get the regular white background. Then, we can look at how that change affects metrics such as user happiness by comparing how long users that had the slate background versus users that had the white background stayed on the app. Using these reviews we then can determine whether or not the change is appropriate. 

**Variations:** We will have two variations including an app with the original white background, and an app with the new slate background color. Everything else regarding the UI/UX will remain the same. Here is a mockup of how the two backgrounds would differ:

<img src=./src/abtesting2.png width="300" height=auto> <img src=./src/abtesting3.png width="300" height=auto>
