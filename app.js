var express = require("express");
var mongoose = require("mongoose");


var app = express();


mongoose.connect("mongodb://localhost/ppke-itk-todoList");
var db = mongoose.connection;

var todoListSchema = mongoose.Schema({
	title: String,
	todos: [{
		title: String,
		deadline: String,
		priority: Number
	}]
});

var TodoListModel = mongoose.model("TodoList", todoListSchema);


app.use(express.static("./public"));
app.use(express.bodyParser());

app.post("/todoLists", function (req, res) {
	var newEntry = new TodoListModel({
		title: req.body.title,
		todos: []
	});
	
	newEntry.save(function (err, result) {
		if (!err) {
			res.json(result);
		}
	});
});

app.get("/todoLists", function (req, res) {
	TodoListModel.find().select("_id title").exec(function (err, result) {
		if (!err) {
			res.json(result);			
		}
	});
});

app.get("/todoLists/:id", function (req, res) {
	TodoListModel.findById(req.route.params.id, function (err, result) {
		if (!err) {
			res.json(result);
		}
	});
});



app.post("/todoLists/:id/addTodo", function (req, res) {
	var todo = {
		title: req.body.title,
		deadline: req.body.deadline,
		priority: req.body.priority
	};
	
	TodoListModel.update({_id: req.route.params.id}, {$push: {todos: todo}}, function (err, result) {
		if (!err) {
			res.json(result);
		}
	});
});

app["delete"]("/todoLists/:id/removeTodo/:todoId", function (req, res) {
	console.log(req.route.params);
	TodoListModel.findOne({_id: req.route.params.id}, function (err, item) {
		console.log(item);
		if (!err) {
			item.todos.remove ({_id: req.route.params.todoId});
			item.save(function (err, result) {
				if (!err) {
					res.json(result);
				}
			});
		}
	});
});


app.listen (8000);
