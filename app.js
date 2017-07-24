var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    fs = require('fs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));


app.get("/", function (req, res){ 
    res.sendfile("views/index.html");
});

app.get("/reg", function (req, res){ 
    res.sendfile("views/reg.html");
});

app.get("/users.json", function (req, res){ 
    res.sendfile("users.json");
});


app.get("/search", function (req, res) {
    res.sendfile("views/search.html");
});




app.post("/reg", function (req, res) {
    var users = [];
    fs.readFile('users.json', "utf8", (err, data) => {
        if (err) throw err;
        users = JSON.parse(data); 
        users.push(req.body);
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) throw err;
            console.log('Added to users.json!');
        });
    });
    res.sendfile("views/reg.html");
});


module.exports = app;

