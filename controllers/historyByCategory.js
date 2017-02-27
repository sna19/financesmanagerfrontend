
app.controller('HistoryByCategoryController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'state', 'globalData', function ($scope, $http, uiGridConstants, sharedService, state, globalData) {

    $scope.$on('onChargeDateChanged', function() {
        
        if(sharedService.isWidgetShown(sharedService.historyByCategoryWidgetID)) {

        }
    })

    $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        if (widgetID == sharedService.historyByCategoryWidgetID) {
        }
    })

    $scope.$on('onShowCategoryHistory', function(obj, CatID) {
    	
    	sharedService.showWidget(
            sharedService.historyByCategoryWidgetID);
		$scope.loadHistoryByCategoryID(CatID);
    })    

    // --------------------------
    // Summary grid
    // --------------------------

    $scope.gridHistoryCategoryOptions = {
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
        	{ field: 'Date', cellFilter: 'date:\'dd-MM-yyyy\'' },
            { field: 'Total', type: 'number', cellFilter: 'number: 2', aggregationType:  uiGridConstants.aggregationTypes.sum, width: '30%' }
        ],
        i18n: {
            'en': {
                'grouping': 'My custom message'
            } 
        }
    }

    $scope.gridHistoryCategoryOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;

      var myScope = $scope;

      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        debugger;
        var dt = new Date(row.entity.Date);
        var dtStr = (dt.getMonth()+1) + '/'+dt.getDate() + '/'+(1900+dt.getYear());
        sharedService.hideFollowingWidgets (sharedService.historyByCategoryWidgetID);
        sharedService.broadcast('onShowExpenseList', state.getCategoryID(), dtStr);
      });
    }

    $scope.loadHistoryByCategoryID = function (categoryID) {
        state.setCategoryID(categoryID);

        if (categoryID != null && categoryID !="") {
            // Load data
            $http({
                method: 'GET',
                url: globalData.getServerDomainURL()+'/History/ByCategory/' + categoryID
            }).then(function successCallback(response) {
                $scope.gridHistoryCategoryOptions.data = response.data;
            }, function errorCallback(response) {
                alert ('error');
            });
        }
    }



}]);