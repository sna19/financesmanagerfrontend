app.factory('globalData', function($http) {
    
    var chargeDates = {
        data: [
            {id: '06/10/2016', name: 'June'},
            {id: '07/10/2016', name: 'July'},
            {id: '08/10/2016', name: 'August'},
            {id: '09/10/2016', name: 'September'},
            {id: '10/10/2016', name: 'October'},
            {id: '11/10/2016', name: 'November'},
            {id: '12/10/2016', name: 'December'},
            {id: '01/10/2017', name: 'January'},
            {id: '02/10/2017', name: 'February'},
            {id: '03/10/2017', name: 'March'}
    ], 
        getById(id) {
            return getItemById(this.data, "id", id);
        }
    };

    var paymentTypes = {
        data: [
            {id: 1, name: "אשראי"},
            {id: 2, name: "הוראת קבע"},
            {id: 3, name: "צ\'ק"},
            {id: 4, name: "מזומן"},
            {id: 5, name: "בנק"}
        ],
        getById(id) {
            return getItemById(this.data, "id", id);
        }
    }

    var categories = {
        data: [],
        getById(id) {
            return getItemById(this.data, "CategoryID", id);
        }
    }

    function getServerDomainURL() {
        return "http://localhost/FinancesManagerDeployed/api"
    }

    function getItemById(data, idField, id) {
        var i;
        
        for(i=0;i<data.length;i++)
            if (data[i][idField]==id)
                return data[i];
        return null;
    }

    function loadCategories() {
        if (categories.data.length==0) {
     
            $http({
                method: 'GET',
                url: 'http://localhost/FinancesManagerDeployed/api/Categories/GetAll'
            }).then(function successCallback(response) {
                categories.data = response.data;    
            }, function errorCallback(response) {
                    alert ('error');
            });                
        }
    };

    return {
        preload: function() {
            loadCategories();
        },
        getChargeDates: function () {
            return chargeDates.data;
        },
        getChargeDateById: function (id) {
            return chargeDates.getById(id);
        },
        getPaymentTypes: function () {
            return paymentTypes.data;
        },
        getPaymentTypeById: function (id) {
            return paymentTypes.getById(id);
        },
        getCategories: function () {       
            return categories.data;
        },
        getCategoryById: function (id) {
            return categories.getById(id);
        },
        getServerDomainURL: function () {
            return getServerDomainURL();
        }
    };
});