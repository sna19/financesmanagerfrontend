app.directive('uiGridRow', ['sharedService', 'state', 'globalData', function (sharedService, state, globalData) {
    return {
        //Base on class
        restrict: "C",
        //Require a parent directive uiGrid
        require: '^uiGrid',
        scope: false,
        link: function ($scope, $elm, $attr, uiGridCtrl) {
            /*jshint unused: true */
            $elm.on('click', function () {
                if (angular.isDefined($scope.row.entity.categorySummary)) {
                  
                  
                  if (
                    arguments[0] && arguments[0].target && 
                    arguments[0].target.getAttribute("ng-class") && (
                    arguments[0].target.getAttribute("ng-class").indexOf("ui-grid-icon-plus-squared")>-1 ||
                    arguments[0].target.getAttribute("ng-class").indexOf("ui-grid-icon-minus-squared")>-1)) {
                    // not expand/collapse buttons
                  }
                  else {
                      
                      arguments[0].stopPropagation();

                      state.setCategory($scope.row.entity);

                      var categoryID = $scope.row.entity.categorySummary.CategoryID;
                      var categoryLevel = $scope.row.entity.level;
                     
                      var parentCategoryID = $scope.row.entity.parentCategoryID;
                      state.setChildrenIDs($scope.row.entity.childrenIDs);
                      sharedService.hideFollowingWidgets (sharedService.summaryTreeWidgetID);
                      state.setCategoryID(categoryID);
                      state.setCategoryLevel(categoryLevel);
                      state.setParentCategoryID(parentCategoryID);
                      sharedService.categorySelected(categoryID);
                  }
                }
            });
        }
    };
}]);

app.controller('SummaryTreeController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'state', 'globalData', function ($scope, $http, uiGridConstants, sharedService, state, globalData) {

    $scope.$on('onChargeDateChanged', function() {
        
        if(sharedService.isWidgetShown(sharedService.summaryTreeWidgetID)) {
            $scope.loadSummary(sharedService.chargeDate);
        }

    })

    
    $scope.$on('onWidgetBeforeHide', function(obj, widgetID) {
        if (widgetID == sharedService.summaryTreeWidgetID) {
            $scope.treeSummaryOptions.data.length = 0;
        }
    })

    $scope.$on('onSummaryTree_UpdateExpected', function(obj, threshold) {
        selectedCategory = state.getCategory();
        var data = $scope.treeSummaryOptions.data;
        selectedCategory.categorySummary.Threshold = parseInt(threshold[0]);       
    })    

    // --------------------------
    // Summary grid
    // --------------------------

    $scope.columnDefs = [
        { name: 'Category Name', field: 'categorySummary.CategoryName'},
        { name: 'Total', field: 'Total', type: 'number', cellFilter: 'number: 2', width: '30%', aggregationType:  uiGridConstants.aggregationTypes.sum,
            cellTemplate: '<div class="ui-grid-cell-contents" style="color:'+
              '{{row.entity.Total > row.entity.categorySummary.Threshold && row.entity.categorySummary.Threshold != 0?\'Red\':\'Black\'}}">{{row.entity.Total.toFixed(2)}}</div>',
            footerCellTemplate: '<div class="ui-grid-cell-contents" style="color: Black">{{col.getAggregationValue().toFixed(2)}}</div>'
         }, 
        { name: 'Threshold', field: 'categorySummary.Threshold', type: 'number', cellFilter: 'number: 2', width: '30%', aggregationType:  uiGridConstants.aggregationTypes.sum, 
            cellTemplate: '<div class="ui-grid-cell-contents" style="color: Silver">{{row.entity.categorySummary.Threshold.toFixed(2)}}</div>',
            footerCellTemplate: '<div class="ui-grid-cell-contents" style="color: Silver">{{col.getAggregationValue().toFixed(2)}}</div>'
        }
    ],

    $scope.treeSummaryOptions = {
      enableExpandableRowHeader: true, 
      //This is the template that will be used to render subgrid.
      expandableRowTemplate: 'templates/summaryTreeExpanded.html',
      //This will be the height of the subgrid
      expandableRowHeight: 140,
      //Variables of object expandableScope will be available in the scope of the expanded subgrid
      expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
      },
      enableRowSelection: true,

      showColumnFooter: true,
      
      columnDefs: $scope.columnDefs,

      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
        //$scope.hideExpandButtonWhenNoData(gridApi);
        //$scope.registerSelectionEvent(gridApi);
      }
    }

    $scope.toggleRow1 = function() {
      $scope.gridApi.selection.toggleRowSelection($scope.gridOptions.data[0]);
    };

    $scope.hideExpandButtonWhenNoData = function (gridApi) {
        // http://stackoverflow.com/questions/33082810/angular-ui-grid-conditional-row-expand
        // http://plnkr.co/edit/bqvz9MxmmZitOcQ7ZZIt?p=preview

        // Hide expand icons when it is not
        /*
          var cellTemplate = '<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell" ng-disabled="row.entity.Total > 4000000"> \
            <div class="ui-grid-cell-contents"> \
              <i ng-class="{ \'ui-grid-icon-plus-squared\' : !row.isExpanded, \'ui-grid-icon-minus-squared\' : row.isExpanded }" \
                ng-click="grid.api.expandable.toggleRowExpansion(row.entity)"> \
              </i> \
            </div> \
          </div>';       
        $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeaderCol', displayName: '', width: 30, cellTemplate: cellTemplate} );
        */
    }

    $scope.registerSelectionEvent = function (gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
          sharedService.hideFollowingWidgets (sharedService.summaryWidgetID);
          var categoryID = row.entity.CategoryID;
          state.setCategoryID(categoryID);
          sharedService.categorySelected(categoryID);
        });
    }

    $scope.loadSummary = function (date) {

        if (date != null && date !="") {
            // Load data
            $http({
                method: 'GET',
                url: globalData.getServerDomainURL()+'/Summary/GetSummaryCategoriesTree/' + date
            }).then(function successCallback(response) {
                $scope.hideExpandButtonWhenNoData($scope.gridApi);
                $scope.treeSummaryOptions.data = response.data.nodes;
                $scope.applyDataToTree(response.data.nodes);
            }, function errorCallback(response) {
                alert ('error');
            });
        }
    }

    $scope.applyDataToTree = function (currentLevel, parentCategoryID) {
        var curLevel;
        var i=0;
        for(i;i<currentLevel.length;i++) {
            curLevel = currentLevel[i];
            curLevel.parentCategoryID = parentCategoryID;
            curLevel.isExpandedable = false;//(curLevel.children.length>0) ? true : false;
            
            curLevel.subGridOptions = {
              //This is the template that will be used to render subgrid.
              expandableRowTemplate: 'templates/summaryTreeExpanded'+ curLevel.level+'.html' ,
              //This will be the height of the subgrid
              expandableRowHeight: 140,
              //enableExpandable: (curLevel.children.length>0) ? true : false,
              //Variables of object expandableScope will be available in the scope of the expanded subgrid
                expandableRowScope: {
                    subGridVariable: 'subGridScopeVariable'
                },

                columnDefs: $scope.columnDefs,

                data: curLevel.children
            }

            //curLevel.data = curLevel.children;
            if (curLevel.children && curLevel.children.length>0) {
                $scope.applyDataToTree(curLevel.children, curLevel.categorySummary.CategoryID);
            }
        }
    }



}]);