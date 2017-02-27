

app.controller('SummaryController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'globalData', function ($scope, $http, uiGridConstants, sharedService, globalData) {

    this.menuList = [
                {label: "Expenses", eventFn: function() {alert("Expenses");}},
                {label: "History", eventFn: function() {alert("History");}},
                {label: "Edit Category", eventFn: function() {alert("Edit Category");}},
                {label: "Add Child Category", eventFn: function() {alert("Add Child Category");}}
            ];

    this.creditcardsdata = {
            fields: []
    };

    $scope.$on('onChargeDateChanged', function() {
        
        if(sharedService.isWidgetShown(sharedService.summaryWidgetID)) {

            //sharedService.hideFollowingWidgets (sharedService.summaryWidgetID);
            
            // {id: widgetID, addBefore: widgetID}
            sharedService.showWidget({id:sharedService.summaryLineWidgetID, addBefore:sharedService.summaryWidgetID});
            $scope.loadSummary(sharedService.chargeDate);
        }

        if (sharedService.isWidgetShown(sharedService.summaryTreeWidgetID)) {
            sharedService.showWidget(sharedService.summaryByCreditCardsWidgetID);
        }
    })

    $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        if (widgetID == sharedService.summaryWidgetID) {
            $scope.gridSummaryOptions.data.length = 0;
        }
    })

    // --------------------------
    // Summary grid
    // --------------------------

    $scope.gridSummaryOptions = {
        multiSelect: false,
        enableSelectAll: false,
        enableRowSelection: true, 
        enableFullRowSelection: true,
        //enableFiltering: true,
        //enableSorting: true,
        selectAll: false,
        showColumnFooter: true,
        //footerTemplate: '<div>Grid Footer: {{grid.appScope.SomeScopeVariable}}</div>',
        columnDefs: [
            { field: 'CategoryName'},
            { field: 'Total', type: 'number', cellFilter: 'number: 2', aggregationType:  uiGridConstants.aggregationTypes.sum, width: '30%' }
        ],
        i18n: {
            'en': {
                'grouping': 'My custom message'
            } 
        }
    }

    $scope.gridSummaryOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;

      var myScope = $scope;

      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        
        sharedService.hideFollowingWidgets (sharedService.summaryWidgetID);
        
        /*
        sharedService.hideWidget(
            sharedService.summaryExpensesWidgetID,
            sharedService.expenseDetailsWidgetID);
        */

        sharedService.categorySelected(row.entity.CategoryID);
      });
    }

    $scope.loadSummary = function (date) {

        if (date != null && date !="") {
            // Load data
            $http({
                method: 'GET',
                url: globalData.getServerDomainURL()+'/Summary/GetSummaryCategories/' + date
            }).then(function successCallback(response) {
                $scope.gridSummaryOptions.data = response.data;
            }, function errorCallback(response) {
                alert ('error');
            });
        }
    }



}]);