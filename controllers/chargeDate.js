

app.controller('ChargeDateController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'state', 'globalData', 
	function ($scope, $http, uiGridConstants, sharedService, state, globalData) {

    // --------------------------
    // Events
    // --------------------------

	$scope.onChargeDateChanged = function (chargeDate) {

        // We cannot hide following widgets here
        // because for every menu item, there is 
        // different start widget

    	state.setChargeDate(chargeDate.selected);
        sharedService.chargeDateChanged(chargeDate.selected);
    }

    $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        
        if (widgetID == sharedService.chargeDateWidgetID) {
        	
             $scope.chargeDatesData.selected = null;
             state.setChargeDate(null);
        }
    })

    // Load options
    $scope.chargeDatesData = {
        selected: null, 
        availableOptions: globalData.getChargeDates()
    }


}]);