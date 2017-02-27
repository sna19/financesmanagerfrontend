

app.controller('SummaryLineController', ['$scope','$http', 'sharedService', 'state', 'globalData', function ($scope, $http, sharedService, state, globalData) {

        $scope.summaryLine = null;

    // --------------------------
    // Events
    // --------------------------



	$scope.onChargeDateChanged = function (chargeDate) {

        // We cannot hide following widgets here
        // because for every menu item, there is 
        // different start widget

        
    }

    $scope.onItemClick = function (key) {
        var x = prompt ("Enter new value for " + key + " month");
        $scope.update (key, state.getChargeDate(), x);
    }
    

    $scope.$on('onWidgetBeforeShow', function(obj, widgetID) {


        if (widgetID == sharedService.summaryLineWidgetID) {
            $scope.loadSummaryLine(state.getChargeDate());
        }
    })

    $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        
        if (widgetID == sharedService.summaryLineWidgetID) {
        	
        }
    })

    $scope.loadSummaryLine = function (date) {

        var url;

        url=globalData.getServerDomainURL()+'/Summary/GetSummary/' + date;

        // Load data
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            
            $scope.summaryLine = response.data;
        }, function errorCallback(response) {
            alert ('error');
        });
    }    

    $scope.update = function (type, date, newValue) {

        var url;

        if (type == 'Start')
            url='/Summary/Update/'+date+'/StartMonth/' + newValue;
        if (type == 'End')
            url='/Summary/Update/'+date+'/EndMonth/' + newValue;


        // Load data
        $http({
            method: 'GET',
            url: globalData.getServerDomainURL()+url
        }).then(function successCallback(response) {
            $scope.loadSummaryLine(state.getChargeDate());
            //alert ('OK');
        }, function errorCallback(response) {
            alert ('error');
        });
    }    

}]);