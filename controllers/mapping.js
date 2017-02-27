




app.controller('MappingController', ['$scope','$http', 'uiGridConstants', 'sharedService', 
    'globalData', 'state', function ($scope, $http, uiGridConstants, sharedService, globalData, state) {
 
    var me = this;
    $scope.widgetId = "mappingDetails";

    $scope.name = "";
    $scope.Label = "";

    $scope.categories = {
        selected: null, 
        oldCategoryID: null,
        data: []
    }

    // --------------------
    // Broadcast Events
    // --------------------
    
     $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        if (widgetID == sharedService.summaryExpensesWidgetID) {
            //sharedService.hideWidget(sharedService.expensesMenuWidgetID);
        }
    })  

    $scope.$on('onChargeDateChanged', function(obj, chargeDate) {
        //$scope.chargeDates.selected = globalData.getChargeDateById(chargeDate);  
    })

    $scope.$on('onMappingEdit', function() {
        showWidgetEdit();
    })

    $scope.$on('onMappingNew', function() {
        showWidgetNew();
    })

    $scope.setCategories = function () {
        $scope.categories.data = globalData.getCategories();
        if (sharedService.expense && sharedService.expense.CategoryID)
            $scope.categories.selected = globalData.getCategoryById (sharedService.expense.CategoryID);       
    };

    // --------------------------
    // View Events
    // --------------------------

    $scope.onFieldChanged = function () {
        
        $scope.isExpenseUpdated = true;
    };


    // --------------------------
    // Mapping Change
    // --------------------------

    $scope.applyMappingChange = function () {
        var expense = state.getExpense();
        var mapping = {
            Name: expense.Name,
            CategoryID: $scope.categories.selected.CategoryID,
            Label: $scope.Label
        }

        $http({
            method: 'POST',
                url: globalData.getServerDomainURL()+'/Mapping/Set',
            data: mapping
        }).then(function successCallback(response) {
            // OKAY
            alert ('Saved');
        }, function errorCallback(response) {
            alert ('error: ');
        });
    }

    // --------------------
    // Methods
    // --------------------

    function showWidgetNew() {
        resetForm();
        
        state.setExpense(); // Set Empty Expense
        var expense = state.getExpense();
        $scope.expense = expense;
        
        sharedService.showWidget($scope.widgetId);
        
        $scope.setCategories(); // TODO: Load categories list once on application load
    }

    function showWidgetEdit() {
        var expense = state.getExpense();
        resetForm();
        sharedService.showWidget($scope.widgetId);
        
        $scope.expense = expense;
        $scope.setCategories();
    }

    function resetForm() {
    
    }
}]);