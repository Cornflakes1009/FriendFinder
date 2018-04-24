var path = require('path');
var friendsList = require("../data/friends");

module.exports = function (app) {
    // route one
    // A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        res.sendFile(path.join(__dirname, "../../app/data/friends.js"));
    });

    // route two 
    // A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
    app.post("/api/friends", function (req, res) {
        console.log(req.body);
        friendsList.push('req: ' + req.body);
        
    });
    
};