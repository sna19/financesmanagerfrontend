

app.controller('CategoryController', ['$scope','$http', 'uiGridConstants', 'sharedService', 'globalData', 'state', function ($scope, $http, uiGridConstants, sharedService, globalData, state) {

    $scope.category = {
        name: null, 
        type: null, // new/edit
        parentCategoryID: null,
        categoryID: null,
        categoryLevel: null,
        selected: null, 
        data: []
    }

    // --------------------
    // Broadcast Events
    // --------------------
    
    $scope.$on('onCategoryFormNew', function() {
        showWidgetNew();
    })
    
    $scope.$on('onCategoryFormEdit', function() {
        showWidgetEdit();
    });


    // --------------------
    // Methods
    // --------------------

    function showWidgetNew() {
        var categoryID = state.getCategoryID();

        //state.setCategoryID(null); // Set Empty Expense
        $scope.fillCategories();      
       
        $scope.category.type = "new";
        $scope.category.selected = globalData.getCategoryById (categoryID);
        $scope.category.name = "";
        sharedService.showWidget(sharedService.categoryDetailsWidgetID);
    };

    function showWidgetEdit() {
        
        var categoryID = state.getCategoryID();
        var parentCategoryID = state.getParentCategoryID();
        //var parentCategoryLevel = state.getParentCategoryLevel();
        $scope.fillCategories();  

        if (categoryID) {
            $scope.category.type = "edit";
            $scope.category.categoryID = categoryID;                 
            //$scope.category.parentCategoryLevel = parentCategoryLevel;                 
            $scope.category.selected = globalData.getCategoryById (parentCategoryID);
            $scope.category.name = globalData.getCategoryById (categoryID).CategoryName;
        }
        sharedService.showWidget(sharedService.categoryDetailsWidgetID);
    };

    $scope.fillCategories = function () {
        var CategoryID = state.getCategoryID();
        $scope.category.data = globalData.getCategories();
    };

    $scope.saveCategory = function () {
        debugger;
        var category = $scope.category;
        var url;

        if ($scope.category.type == "new")
            url = globalData.getServerDomainURL()+'/Categories/Insert/' + 
                category.selected.CategoryID + '/' + category.name  + '/' + (category.selected.Level+1);
        else
            // <updatedCategoryID>/<parentCategoryID>/<categoryName>/<level>
            url = globalData.getServerDomainURL()+'/Categories/Update/' + 
                category.categoryID + '/'+ category.selected.CategoryID + '/' + category.name + '/' + (category.selected.Level+1);

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            // OKAY
            //$scope.expense.UniqueKey = response.data;
            alert ('Saved');
        }, function errorCallback(response) {
            alert ('error: ');
        });
    }

}]);