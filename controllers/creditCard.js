




app.controller('CreditCardController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'state', 'globalData', 
	function ($scope, $http, uiGridConstants, sharedService, state, globalData) {

	$scope.widgetId = "creditCardSelector";

    // --------------------------
    // Events
    // --------------------------

	$scope.onCreditCardChanged = function (creditCard) {
    	//state.setCreditCard(creditCard.selected);
        //sharedService.creditCardChanged(creditCard.selected);
    }

    $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        if (widgetID == $scope.widgetId) {
        	
             //$scope.creditCard.selected = null;
             //state.setChargeDate(null);
        }
    })

    // Load options
    $scope.creditCardsData = {
        selected: null, 
        availableOptions: globalData.getChargeDates()
    }


}]);