

app.controller('TopMenuController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'globalData', function ($scope, $http, uiGridConstants, sharedService, globalData) {


    // --------------------------
    // Events
    // --------------------------

    $scope.onMonthSummaryClicked = function () {
    	$scope.preload();
    	sharedService.hideAllWidgets();
        // order is important !!!
     	
        sharedService.showWidget(
     		sharedService.chargeDateWidgetID,
            //sharedService.summaryWidgetID,
            sharedService.summaryGridTypeSelectorWidgetID,
            sharedService.summaryTreeWidgetID, 
            sharedService.pieWidgetID/*,
            sharedService.creditCardWidgetID*/);
    }

    $scope.onYearSUmmaryClicked = function () {
        debugger;
        $scope.preload();
        sharedService.hideAllWidgets();
        sharedService.showWidget(
            sharedService.yearSummaryWidgetID);
    }

    $scope.onCustomCategoryClicked = function () {
     
    }

    $scope.onExpensesClicked = function () {
    	$scope.preload();
     	sharedService.hideAllWidgets();

        // order is important !!!
     	sharedService.showWidget(
     		sharedService.chargeDateWidgetID,
            /*sharedService.creditCardWidgetID,*/
     		sharedService.summaryExpensesWidgetID);
    }

    $scope.preload = function() {
    	globalData.preload();
    }

    $scope.onSummaryMngClicked = function () {
        $scope.preload();
        sharedService.hideAllWidgets();
        sharedService.showWidget(sharedService.generateSummaryWidgetID);
    }
}]);