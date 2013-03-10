define(["jquery", "ko", "bootbox"], function ($, ko) {
	return function () {
		var todoLists = ko.observableArray ([]);
		
		$.getJSON("/todoLists", function (response) {
			for (var idx = 0; idx < response.length; idx += 1) {
				var act = response[idx];
				act.link = (function (item) {
					return ko.computed(function () {
						return "#todoLists/" + item._id;
					});
				}(act));
			}
			
			todoLists(response);
		});
		
		function createTodoListVM (id) {
			var title = ko.observable ("");
			var todos = ko.observableArray ([]);
			
			$.getJSON("/todoLists/" + id, function (response) {
				title(response.title);
				todos(response.todos);
			});
			
			var newTodo = (function () {
				var title = ko.observable ("");
				var priority = ko.observable (5);
				var deadline = ko.observable ("");
				
				var saveDisabled = ko.computed (function () {
					return title() === "";
				});
				
				var save = function () {
					if (saveDisabled ()) {
						return;
					}
					
					var newTodo = {
							title: title(),
							priority: priority(),
							deadline: deadline()
					};
					
					$.post("/todoLists/" + id + "/addTodo", newTodo, function (response) {						
						todos.push(newTodo);
					});
					
					title("");
				};
				
				return {
					title: title,
					priority: priority,
					deadline: deadline,
					save: save,
					saveDisabled: saveDisabled
				};
			} ());
			
			var deleteTodo = function (todo) {
				bootbox.confirm("Do you really want to delete this Todo?", function(result) {
					$.ajax({
					    url: "/todoLists/" + id + "/removeTodo/" + todo._id,
					    type: "DELETE",
					    success: function(result) {
					    	todos.remove(todo);
					    }
					});
				});
			};
			
			return {
				id: id,
				title: title,
				todos: todos,
				newTodo: newTodo,
				deleteTodo: deleteTodo
			};
		}
		
		var activeTodoList = ko.observable (null);
		
		var newTodoListVM = (function () {
			var title = ko.observable ("");
			
			var saveDisabled = ko.computed (function () {
				return title() === "";
			});
			
			var save = function () {
				if (saveDisabled ()) {
					return;
				}
				
				
				$.post("/todoLists", {title: title()}, function (response) {
					todoLists.push ({
						_id: response._id,
						title: response.title,
						link: ko.computed(function () {
							return "#todoLists/" + response._id;
						})
					});
				});
				
				title("");
			};
			
			return {
				title: title,
				save: save,
				saveDisabled: saveDisabled
			};
		} ());
		
		var activateTodoList = function (id) {
			activeTodoList (createTodoListVM(id));
		};
		
		return {
			todoLists:			todoLists,
			activeTodoList:		activeTodoList,
			newTodoList:		newTodoListVM,
			
			activateTodoList:	activateTodoList
		};
	};
});