app.controller('menuController', ['$scope','$http', 'sharedService', 
	function ($scope, $http, sharedService) {
		/*
		this.summaryGridMenu = [
	        {label: "Expenses", eventFn: function() {alert("Expenses");}},
	        {label: "History", eventFn: function() {alert("History");}},
	        {label: "Edit Category", eventFn: function() {alert("Edit Category");}},
	        {label: "Add Child Category", eventFn: function() {alert("Add Child Category");}}
	    ];
	    */
}]);

angular.module('app').component('menu',{
	//template: '<div>{{message}}</div>',
	templateUrl: 'components/menu.html',
	controller: "menuController",
	bindings: {
	    itemlist: '='
	}
});