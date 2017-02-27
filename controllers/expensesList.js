


app.controller('ExpensesController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'state', 'globalData', function ($scope, $http, uiGridConstants, sharedService, state, globalData) {

    this.menuList = [
                {label: "Edit", eventFn: function() {
                    debugger;
                    sharedService.hideWidget(sharedService.expensesMenuWidgetID);
                    sharedService.broadcast('onExpenseEdit', state.getExpense());
                }},
                {label: "Mapping", eventFn: function() {
                    debugger;   
                    sharedService.hideWidget(
                        sharedService.expensesMenuWidgetID, 
                        sharedService.expenseDetailsWidgetID);
                    sharedService.showWidget(sharedService.mappingDetailsWidgetID);
                    sharedService.broadcast('onMappingEdit');  
                }}
            ];

    $scope.expenses = {
        selected: null,
        data: {}
    }

    // --------------------------
    // Events
    // --------------------------

    $scope.$on('onShowExpenseList', function(obj, args) {
        debugger;
        categoryID = args[0];
        var date = (args.length>1 && args[1]!=null)?args[1]:sharedService.chargeDate;
        
        sharedService.showWidget(
            sharedService.summaryExpensesWidgetID);
        $scope.loadSummaryExpenses(date, categoryID);
    })

    $scope.$on('onAddNewButtonClicked', function() {

        if (forThisWidget()) {
            openExpenseEditForm();
        }
    })

    $scope.$on('onChargeDateChanged', function() {
        
        if(sharedService.isWidgetShown(sharedService.summaryExpensesWidgetID)) {
            
            sharedService.hideFollowingWidgets (sharedService.summaryExpensesWidgetID);
            
            // show Add New button
            sharedService.showWidget({
                id: sharedService.addNewWidgetID,
                addBefore: sharedService.gridSummaryExpenses
            });
            
            $scope.loadSummaryExpenses(sharedService.chargeDate, null);
        }
    })

    $scope.$on('onExpensesListSelected', function(obj, catID) {
        
        $scope.loadSummaryExpenses(sharedService.chargeDate, sharedService.categoryID);
    })

    $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        if (widgetID == sharedService.summaryExpensesWidgetID) {
            $scope.gridSummaryExpensesOptions.data.length = 0;
            $scope.expenses.data.length = 0;
        }
    })


    $scope.$on('onHideWidget', function(obj, widgetID) {
        
        if (widgetID == sharedService.summaryExpensesWidgetID) {
        }
    })

    // --------------------------
    // Expenses Grid
    // --------------------------

    $scope.gridSummaryExpensesOptions = {
        multiSelect: false,
        enableRowSelection: true, 
        enableFullRowSelection: true,
        enableFiltering: true,
        enableSorting: true,
        showColumnFooter: true,
        columnDefs: [
            { field: 'Date', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'', width: '20%'},
            { field: 'Name', width: '40%'},
            { field: 'Credit', type: 'number', cellFilter: 'number: 2', 
                aggregationType:  uiGridConstants.aggregationTypes.sum, 
                footerCellTemplate: '<div class="ui-grid-cell-contents">{{col.getAggregationValue() | number:2 }}</div>',
                width: '20%' },
            { field: 'PaymentTypeID', width: '25%',
                cellTemplate: "<span>{{COL_FIELD==1?'אשראי':COL_FIELD==2?'הו\"ק':COL_FIELD==3?'צ\"ק':COL_FIELD==4?'מזומן':COL_FIELD==5?'בנק':''}}</span>" },
            { field: 'Notes', width: '250' }
        ]
    }

    $scope.gridSummaryExpensesOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;

      var myScope = $scope;

      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        sharedService.hideFollowingWidgets (sharedService.summaryExpensesWidgetID);
        var e = row.entity;
        state.setExpense(e);
        sharedService.expenseSelected(state.getExpense());
      });

    }

    $scope.loadSummaryExpenses = function (date, categoryID) {

        debugger;
        
        var url;
        if (categoryID != null) {
            if (state.getChildrenIDs()!=null)
                url=globalData.getServerDomainURL()+'/Transactions/ByCategory/' + date + '/' + categoryID + '/' + state.getChildrenIDs();
            else
                url=globalData.getServerDomainURL()+'/Transactions/ByCategory/' + date + '/' + categoryID;
        } else 
            url=globalData.getServerDomainURL()+'/Transactions/ByDate/' + date;

        // Load data
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            $scope.expenses.data = response.data;
            $scope.gridSummaryExpensesOptions.data = $scope.expenses.data;
        }, function errorCallback(response) {
            alert ('error');
        });
    }

    // --------------------------
    // Methods
    // --------------------------

    function openExpenseEditForm() {
        sharedService.broadcast('onExpenseNew');  
    }


    function forThisWidget() {
        return sharedService.isWidgetShown(sharedService.summaryExpensesWidgetID);
    }

}]);