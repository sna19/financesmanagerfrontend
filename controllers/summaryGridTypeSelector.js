
app.controller('SummaryGridTypeSelectorController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'state', 'globalData', 
	function ($scope, $http, uiGridConstants, sharedService, state, globalData) {

    // --------------------------
    // Events
    // --------------------------

	$scope.onSummaryGridTypeChanged = function (type) {

        // We cannot hide following widgets here
        // because for every menu item, there is 
        // different start widget

        if (type=="flat") {
        	sharedService.hideFollowingWidgets(sharedService.summaryTreeWidgetID);
        	sharedService.hideWidget(sharedService.summaryTreeWidgetID);
        	sharedService.showWidget(sharedService.summaryWidgetID);
		}
		else {
			sharedService.hideFollowingWidgets(sharedService.summaryWidgetID);
        	sharedService.hideWidget(sharedService.summaryWidgetID);
        	sharedService.showWidget(sharedService.summaryTreeWidgetID);
		}

		
		sharedService.chargeDateChanged(state.getChargeDate());

    }

    $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        
        if (widgetID == sharedService.summaryGridTypeSelectorWidgetID) {
        }
    })

    // Load options
    $scope.summaryGridType = {
        selected: 'tree'
    }

}]);