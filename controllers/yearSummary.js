
app.controller('YearSummaryController', ['$scope','$http', 'sharedService', 
    'globalData', 'state', function ($scope, $http, sharedService, globalData, state) {


    $scope.$on('onWidgetBeforeShow', function(obj, widgetID) {
        if (widgetID == sharedService.yearSummaryWidgetID) {
            loadYearData();
        }
    })


    var myScope = this;
    this.yearsummarydata = {
        data: [
        	/*{ReleaseDate: "2017-02-10T00:00:00"}*/
        ],
        fields: [
            /*{field: 'ReleaseDate', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'', width: '20%'}*/
        ]
    };


    function loadYearData() {
        load (globalData.getServerDomainURL()+'/Summary/Year', 
        	function (data) {
        		
                var fields = getFieldsFromData(data[0]);
                myScope.yearsummarydata.fields.length = 0;
                myScope.yearsummarydata.fields.push.apply (myScope.yearsummarydata.fields, fields);
                myScope.yearsummarydata.data.length = 0;
    			myScope.yearsummarydata.data.push.apply(myScope.yearsummarydata.data, data);
        	});
    }

    function getFieldsFromData(dataItem) {
        var fields = [];
        for(var propertyName in dataItem) {
            if (propertyName.toLowerCase().indexOf("date")>-1)
                fields.push({field: propertyName, type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'', width: '120'});
            else 
                fields.push({field: propertyName, width: '120'});
        }
        return fields;
    }

    function load(url, successCallback) {

        // Load data
        $http({
            method: 'GET',
            url: url
        }).then(function(response) {
        	successCallback.call(this, response.data);
        }, function errorCallback(response) {
            alert ('error');
        })
    }
}]);