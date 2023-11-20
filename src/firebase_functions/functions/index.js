/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.matchDestinations = functions.https.onRequest(async (req, res) => {
  const userId = req.query.user_id;
  const db = admin.database().ref();

  // Fetch user data (user_id is at the top level of the database)
  const userRef = await db.child(userId).get();
  const userData = userRef.exportVal();

  // Fetch destinations data
  const destinationsSnapshot = await db.child("destinations").get();
  const destinationsData = destinationsSnapshot.exportVal();

  // Compare user data with each destination's data
  const scores = [];
  Object.keys(destinationsData).forEach((destination) => {
    const score = compareData(userData.quiz_answers,
        destinationsData[destination]);
    scores.push({destination, score});
  });

  // Sort destinations based on score and select the lowest 3
  // (lowest score = best match)
  scores.sort((a, b) => a.score - b.score);
  const topDestinations = scores.slice(0, 3).map(
      (scoreObj) => scoreObj.destination);

  // Return top 3 destinations
  res.json(topDestinations);
});

/**
 * Compare user data to destination data
 * @param {Object} answers - User's quiz answers
 * @param {Object} destination - Destination data
 * @return {number} - Difference between user data and destination data
 */
function compareData(answers, destination) {
  let difference = 0;

  // Compare climate (scale of 1-5)
  difference += Math.abs(answers.climate - destination.climate);

  // Compare environment (keys: beach, city, rural; values: boolean)
  const environmentKeys = Object.keys(answers.environment);
  environmentKeys.forEach((key) => {
    if (answers.environment[key] !== destination.environment[key]) {
      difference++;
    }
  });

  // Compare activities (keys: food, hiking, kayaking, museum, sailboat,
  // sight_seeing, surfing; values: boolean)
  const activitiesKeys = Object.keys(answers.activity);
  activitiesKeys.forEach((key) => {
    if (answers.activity[key] !== destination.activity[key]) {
      difference++;
    }
  });

  return difference;
}
