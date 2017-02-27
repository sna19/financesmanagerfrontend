



app.controller('OperationsController', ['$scope','$http', 'sharedService', function ($scope, $http, sharedService) {


    // --------------------------
    // Events
    // --------------------------

    $scope.onNewButtonClicked = function () {
    	sharedService.broadcast('onAddNewButtonClicked'); 
    }

    $scope.onYearSUmmaryClicked = function () {
     
    }

    $scope.onCustomCategoryClicked = function () {
     
    }

    $scope.onExpensesClicked = function () {
     	sharedService.hideAllWidgets();
     	sharedService.showWidget(
     		sharedService.chargeDateWidgetID,
     		sharedService.summaryExpensesWidgetID);
    }
}]);