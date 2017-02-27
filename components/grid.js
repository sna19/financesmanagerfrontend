app.controller('gridController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'state', 
	function ($scope, $http, uiGridConstants, sharedService, state) {

		var ctrl = this;

    $scope.gridOptions = {
        multiSelect: false,
        enableRowSelection: true, 
        enableFullRowSelection: true,
        enableFiltering: true,
        enableSorting: true,
        showColumnFooter: true,
        /*
        columnDefs: [
			     { field: 'ReleaseDate', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'', width: '20%'}
        ],
        */
        
        columnDefs: ctrl.griddata.fields,
        data: ctrl.griddata.data
    }

    $scope.gridOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;

      var myScope = $scope;

      gridApi.selection.on.rowSelectionChanged($scope,function(row){
      });

    }
}]);

angular.module('app').component('grid',{
	templateUrl: 'components/grid.html',
	controller: "gridController",
	
	bindings: {
		griddata: '=',
		label: '@',
		gridwidth: '@',
		gridheight: '@'
	}
});