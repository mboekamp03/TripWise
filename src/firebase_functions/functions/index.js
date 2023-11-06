/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//const {onRequest} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.matchDestinations = functions.https.onRequest(async (req, res) => {
    const userId = req.query.user_id;
    const db = admin.firestore();

    // Fetch user data
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    // Fetch destinations data
    const destinationsSnapshot = await db.collection('destinations').get();
    const destinationsData = destinationsSnapshot.docs.map(doc => doc.data());

    // Compare user data with each destination's data
    const scores = destinationsData.map(destination => {
        return {
            destination: destination,
            score: compareData(userData.quiz_answers, destination)
        };
    });

    // Sort destinations based on score and select top 3
    scores.sort((a, b) => b.score - a.score);
    const topDestinations = scores.slice(0, 3).map(scoreObj => scoreObj.destination);

    // Return top 3 destinations
    res.json(topDestinations);
});

function compareData(answers, destination) {
    let difference = 0;

    // Compare climate (scale of 1-5)
    difference += Math.abs(answers.climate - destination.climate);

    // Compare budget (scale of 1-5)
    difference += Math.abs(answers.budget - destination.budget);

    // Compare environment (keys: beach, city, rural; values: boolean)
    const environmentKeys = Object.keys(answers.environment);
    environmentKeys.forEach(key => {
        if (answers.environment[key] !== destination.environment[key]) {
            difference++;
        }
    });

    // Compare activities (keys: food, hiking, kayaking, museum, sailboat,
    // sight_seeing, surfing; values: boolean)
    const activitiesKeys = Object.keys(answers.activities);
    activitiesKeys.forEach(key => {
        if (answers.activities[key] !== destination.activities[key]) {
            difference++;
        }
    });

    return difference;
}
