const express = require("express");
const bodyParser = require("body-parser");

var app = express();

var pathFiles = [];

app.use(express.static("static"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 

app.get("/api/pathfiles", function(req, res) {
	res.send({
		files: pathFiles,
		status: true
	})
});

app.post("/api/pathfiles", function(req, res) {
	if (req.body.name) {
		if (pathFiles.includes(req.body.name)) {
			res.send({status: false, error: "file already in array"});
			return;
		}
		pathFiles.push(req.body.name);
		res.send({status: true});
	} else{
		res.send({status: false, error: "missing param name"});
	}
});

app.listen("8080", function() {
	console.log("ok and good");
});