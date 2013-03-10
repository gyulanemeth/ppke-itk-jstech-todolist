define(["ko", "sammy"], function (ko, Sammy) {
	return function () {
		var mainMenu = (function (items) {
			var selectedItemHash = ko.observable ("");
			var items = items || [];
			
			return {
				selectedItemHash: selectedItemHash,
				items: items
			};
		}(
			[
				{
					hash: "#profilePage/",
					icon: "icon-user",
					label: "Profil oldal"
				},
				{
					hash: "#todoLists/",
					icon: "icon-tasks",
					label: "Teendők"
				}
			]
		));
		
		var pages = {
			profilePageVM: ko.observable(null),
			todoListsVM: ko.observable(null)
		};
		
		var clearPages = function () {
			for (var prop in pages) {
				pages[prop](null);
			}
		};
		
		var goToPage = function (titleVal, pagePropName, vmCreator) {
			clearPages();
			mainMenu.selectedItemHash(location.hash);
			title(titleVal);
			pages[pagePropName](vmCreator());
		};
		
		var title = ko.observable("xxx");
		
		Sammy(function () {
			this.get ("#profilePage/", function () {
				require(["viewModels/ProfilePageVM"], function (profilePageVM) {
					goToPage ("Profiloldal", "profilePageVM", profilePageVM);
				});
			});
			
			this.get ("#todoLists/", function () {
				require(["viewModels/TodoListsVM"], function (todoListsVM) {
					goToPage ("Todo listák", "todoListsVM", todoListsVM);
				});
			});
			
			this.get ("#todoLists/:id", function (context) {
				require(["viewModels/TodoListsVM"], function (todoListsVM) {
					var vm = pages.todoListsVM();
					
					if (!vm) {
						goToPage ("Todo listák", "todoListsVM", todoListsVM);
						pages.todoListsVM().activateTodoList(context.params.id);
					} else {
						vm.activateTodoList(context.params.id);
					}
				});
			});
			
			this.get ("", function () {
				location.hash = "profilePage/";
			});
		}).run();
		
		return {
			title: title,
			mainMenu: mainMenu,
			
			pages: pages
		};
	};
});
