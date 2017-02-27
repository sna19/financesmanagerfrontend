

app.controller('SummaryMenuController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'globalData', function ($scope, $http, uiGridConstants, sharedService, globalData) {

    var categoryID;
    // --------------------------
    // Events
    // --------------------------

    $scope.newSummary = {
        val: null
    }

    $scope.$on('onCategoryIDSelected', function(obj, catID) {
        sharedService.showWidget(sharedService.summaryMenuWidgetID);
        categoryID = catID;
        //$scope.loadSummaryExpenses(sharedService.chargeDate, sharedService.categoryID);
    })

    $scope.$on('onChargeDateChanged', function() {
        
        if(sharedService.isWidgetShown(sharedService.summaryTreeWidgetID)) {
            // {id: widgetID, addBefore: widgetID}
            sharedService.showWidget({id:sharedService.summaryLineWidgetID, addBefore:sharedService.summaryTreeWidgetID});
        }
    })


    // --------------------------
    // Events
    // --------------------------

    $scope.onShowExpenses = function () {
        sharedService.hideWidget(sharedService.summaryMenuWidgetID);
        sharedService.broadcast('onShowExpenseList', categoryID);
    }

    // TODO: rename to onCompareByCategoryHistory
    $scope.onCompareToPreviousMonths = function () {
        sharedService.hideWidget(sharedService.summaryMenuWidgetID);
        sharedService.broadcast('onShowCategoryHistory', categoryID);     
    }

    $scope.onAddChildCategory = function () {
        sharedService.hideWidget(sharedService.summaryMenuWidgetID);
        sharedService.broadcast('onCategoryFormNew', categoryID);
    }

    $scope.onEditCategory = function () {
        sharedService.hideWidget(sharedService.summaryMenuWidgetID);
        sharedService.broadcast('onCategoryFormEdit', categoryID);     
    }

    $scope.onUpdateExpected = function () {
        sharedService.broadcast('onSummaryTree_UpdateExpected', $scope.newSummary.val);
        $scope.saveCategoryThreshold(sharedService.chargeDate, categoryID, $scope.newSummary.val);
    }
    
    $scope.saveCategoryThreshold = function (date, categoryID, threshold) {

        if (date != null && date !="") {
            // Load data
            $http({
                method: 'GET',
                url: globalData.getServerDomainURL()+'/Planning/UpdateCategoryThreshold/' + date + '/' + categoryID + '/' + threshold
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
                alert ('error');
            });
        }
    }

}]);