




app.controller('ExpenseController', ['$scope','$http', 'uiGridConstants', 'sharedService', 
    'globalData', 'state', function ($scope, $http, uiGridConstants, sharedService, globalData, state) {
 
    var me = this;
    $scope.widgetId = "expenseDetails";

    $scope.date = "";

    $scope.chargeDates = {
        
        selected: null, 
        data: globalData.getChargeDates()
    };

    $scope.paymentTypes = {
        selected: null, 
        data: globalData.getPaymentTypes()
    };

    $scope.categories = {
        selected: null, 
        oldCategoryID: null,
        data: []
    }

	$scope.expense = {};

    $scope.isExpenseUpdated = false;

    // --------------------
    // Broadcast Events
    // --------------------
    
     $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        if (widgetID == sharedService.summaryExpensesWidgetID) {
            //sharedService.hideWidget(sharedService.expensesMenuWidgetID);
        }
    })  

    $scope.$on('onChargeDateChanged', function(obj, chargeDate) {
        $scope.chargeDates.selected = globalData.getChargeDateById(chargeDate);  
    })

    $scope.$on('onExpenseNew', function() {
        showWidgetNew();
    })
    
    $scope.$on('onExpenseEdit', function() {
        showWidgetEdit();
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
        var expense = $scope.expense;

        
        expense.PaymentTypeID       = $scope.paymentTypes.selected.id;
        expense.ChargeDate          = $scope.chargeDates.selected.id;
        expense.CategoryID          = $scope.categories.selected.CategoryID;
        expense.Date                = $scope.date;

        $http({
            method: 'POST',
            url: globalData.getServerDomainURL()+'/Transactions/UpdateExpense',
            data: expense
        }).then(function successCallback(response) {
            // OKAY
            $scope.expense.UniqueKey = response.data;
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
        
        $scope.date = new Date($scope.expense.Date).toLocaleDateString();

        sharedService.showWidget($scope.widgetId);
        
        $scope.paymentTypes.selected = null;
        $scope.categories.oldCategoryID = null;
        
        $scope.setCategories(); // TODO: Load categories list once on application load
    }

    function showWidgetEdit() {
        var expense = state.getExpense();
        resetForm();
        sharedService.showWidget($scope.widgetId);
        
        $scope.expense = expense;
        $scope.paymentTypes.selected = globalData.getPaymentTypeById (expense.PaymentTypeID);
        $scope.chargeDates.selected = globalData.getChargeDateById (expense.ChargeDate);
        $scope.categories.oldCategoryID = expense.CategoryID;
        $scope.date = new Date($scope.expense.Date).toLocaleDateString();
        $scope.setCategories();
    }

    function resetForm() {
        $scope.isExpenseUpdated = false;
    }
}]);