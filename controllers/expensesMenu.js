

app.controller('ExpensesMenuController', ['$scope','$http', 'uiGridConstants', 'sharedService', function ($scope, $http, uiGridConstants, sharedService) {

    var selectedExpense;
    // --------------------------
    // Events
    // --------------------------

     $scope.$on('onWidgetBeforeShow', function(obj, widgetID) {
        if (widgetID == sharedService.expensesMenuWidgetID) {
            //sharedService.hideWidget(sharedService.expenseDetailsWidgetID,sharedService.mappingDetailsWidgetID);
            //sharedService.hideWidget(sharedService.mappingDetailsWidgetID);

            //sharedService.hideWidget(sharedService.expenseDetailsWidgetID);
        }
    })  

    $scope.$on('onChargeDateChanged', function(obj) {
        sharedService.hideWidget(sharedService.expensesMenuWidgetID);
    })

    $scope.$on('onExpenseSelected', function(obj, expense) {
        sharedService.showWidget(sharedService.expensesMenuWidgetID);
        selectedExpense = expense;
    })

    // --------------------------
    // Events
    // --------------------------

    $scope.onEditExpense = function () {
        sharedService.hideWidget(sharedService.expensesMenuWidgetID);
        sharedService.broadcast('onExpenseEdit', selectedExpense);
    }

    $scope.onEditMapping = function () {
        
        sharedService.hideWidget(
            sharedService.expensesMenuWidgetID, 
            sharedService.expenseDetailsWidgetID);
        sharedService.showWidget(sharedService.mappingDetailsWidgetID);
        sharedService.broadcast('onMappingEdit');  

    }
}]);