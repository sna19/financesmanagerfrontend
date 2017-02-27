app.factory('categoryModel', function($http) {

	return {

		getModel: function(categoryID, categoryLevel, parentCategoryID, categoryName, sum, expected) {
			return [
                CategoryID: categoryID,
                CategoryLevel: categoryLevel,
                ParentCategoryID: parentCategoryID,
                CategoryName: categoryName,
                Sum: sum,
                Expected: expected
            ] 
		}
	}
})