

var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.expandable', 'ui.grid.treeView', 'ui.grid.selection', 'ui.grid.pinning']);

app.factory('sharedService', function($rootScope, widgetMgr, state) {
    
    var sharedService = {};
    sharedService.chargeDate = '';
    sharedService.categoryID = '';
    sharedService.expenseID = '';

    sharedService.chargeDateWidgetID        = 'chargeDate';
    sharedService.creditCardWidgetID        = 'creditCardSelector';
    sharedService.summaryGridTypeSelectorWidgetID = 'summaryGridTypeSelector';
    sharedService.summaryLineWidgetID       = 'summaryLine';
    sharedService.summaryWidgetID           = 'gridSummary';
    sharedService.summaryTreeWidgetID       = 'treeSummary';
    sharedService.summaryExpensesWidgetID   = 'gridSummaryExpenses';
    sharedService.expensesMenuWidgetID      = 'expensesMenu';
    sharedService.expenseDetailsWidgetID    = 'expenseDetails';
    sharedService.summaryMenuWidgetID       = 'summaryMenu';
    sharedService.mappingDetailsWidgetID    = 'mappingDetails';
    sharedService.generateSummaryWidgetID   = 'generateSummary';
    sharedService.addNewWidgetID            = 'addNewButton';
    sharedService.historyByCategoryWidgetID = 'historyByCategory';
    sharedService.categoryDetailsWidgetID   = 'categoryDetails';
    sharedService.pieWidgetID               = 'pie';
    sharedService.yearSummaryWidgetID       = 'yearSummary';
    sharedService.summaryByCreditCardsWidgetID = 'summaryByCreditCards';

    sharedService.broadcast = function (eventID) {
        
        var args = [];
        for (i=1;i<arguments.length;i++)
            args.push(arguments[i]);
        $rootScope.$broadcast(eventID, args);  
    }

    // -------------------------
    // Events
    // -------------------------

    sharedService.chargeDateChanged = function(date) {
        this.chargeDate = date;
        $rootScope.$broadcast('onChargeDateChanged', date);  
    }

    sharedService.categorySelected = function(categoryID) {
        this.categoryID = categoryID;
        $rootScope.$broadcast('onCategoryIDSelected', categoryID);
    }

    sharedService.expenseSelected = function(expense) {
        this.expense = expense;
        $rootScope.$broadcast('onExpenseSelected');  
    }

    sharedService.showExpensesList = function (categoryID) {
        this.categoryID = categoryID;
        $rootScope.$broadcast('onExpensesListSelected', categoryID);          
    }

    // --------------------------
    // WidgetMgr Wrappers
    // --------------------------
    sharedService.hideWidget = function (arguments) {
        widgetMgr.hideWidget(arguments);
    }

    sharedService.hideFollowingWidgets = function (arguments) {
        widgetMgr.hideFollowingWidgets(arguments);
    }

    // args - String - widgetID
    //      - Object - {id: widgetID, addBefore: widgetID}
    sharedService.showWidget = function () {
        widgetMgr.showWidget(arguments);
    },

    sharedService.hideAllWidgets = function () {
        widgetMgr.hideAllWidgets();
        state.clearAll();
    }

    sharedService.isWidgetShown = function (widgetID) {
        return widgetMgr.isWidgetShown(widgetID);
    }    

    return sharedService;
});




app.controller('MainCtrl', ['$scope','$http', 'uiGridConstants', 'sharedService', function ($scope, $http, uiGridConstants, sharedService) {

    $scope.categories = {
        selected: {
            id: -1,
            name: ''
        }, 
        data: {}
    }

}]);