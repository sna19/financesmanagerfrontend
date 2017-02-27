

app.controller('GenerateSummaryController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'state', 'globalData', 
	function ($scope, $http, uiGridConstants, sharedService, state, globalData) {

    // --------------------------
    // Events
    // --------------------------

	$scope.onChargeDateChanged = function (chargeDate) {
    	state.setChargeDate(chargeDate.selected);
    }

    $scope.onGenerateSummaryClicked = function (chargeDate) {
        $scope.sendData (state.getChargeDate());
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

    $scope.sendData = function (chargeDate) {
                
        if (chargeDate != null && chargeDate != "") {
             
            $http({
                method: 'GET',
                url: globalData.getServerDomainURL()+'/Summary/GenerateSummary/' + chargeDate
            }).then(function successCallback(response) {
                alert ('OK');
            }, function errorCallback(response) {
                    alert ('error');
            });                
        }
        else {
            alert ("Please select Charge date");
        }
    }

}]);