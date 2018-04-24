var path = require('path');
var friendsList = require("../data/friends");

module.exports = function (app) {
    // route one
    // A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        res.sendFile(path.join(__dirname, "../../app/data/friends.js"));
        return res.json(friendsList);
    });

    // route two 
    // A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
    app.post("/api/friends", function (req, res) {
        var surveyData = req.body;
        var responses = surveyData.scores;
        var nameOfMatch = '';
        var matchPhoto = '';
        var totalDifference = 51;

        for (var i = 0; i < friendsList.length; i++) {
            var diff = 0;
            for (var j = 0; j < responses.length; j++) {
                diff += Math.abs(friendsList[i].scores[j] - responses[j]);
            }
            // If lowest difference, set Match
            if (diff < totalDifference) {
                totalDifference = diff;
                nameOfMatch = friendsList[i].name;
                matchPhoto = friendsList[i].photo;
            }
        }
        // Add new user
        friendsList.push(surveyData);

        // Send response to modal
        res.json({ status: 'OK', nameOfMatch: nameOfMatch, matchPhoto: matchPhoto });
    });

};