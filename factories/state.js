app.factory('state', function($rootScope) {
    
    // TODO: Accomplish selected top menu type memory
    var selectedTopMenu;
    var chargeDate;
    var paymentType;
    var expense;
    var category;
    var categoryID;
    var parentCategoryID;
    var childrenIDs;
    var categoryLevel;

    return {
        getChargeDate: function () {
            return selectedTopMenu;
        },        
        setChargeDate: function (sel) {
            selectedTopMenu = sel;
        }, 
        getCategoryID: function () {
            return categoryID;
        },        
        setCategoryID: function (sel) {
            categoryID = sel;
        },
        getCategoryLevel: function () {
            return categoryLevel;
        },        
        setCategoryLevel: function (sel) {
            categoryLevel = sel;
        },           
        getParentCategoryID: function () {
            return parentCategoryID;
        },        
        setParentCategoryID: function (sel) {
            parentCategoryID = sel;
        },
        setCategory: function (cat) {
            category = cat;
        },
        getCategory: function (){
            return category;
        },
        getChildrenIDs: function () {
            return childrenIDs;
        },        
        setChildrenIDs: function (sel) {
            childrenIDs = sel;
        },                
        getChargeDate: function () {
            return chargeDate;
        },
        setChargeDate: function (cd) {
            chargeDate = cd;
        },
        getPaymentType: function () {
            return paymentType;
        },
        setPaymentType: function(pt) {
            paymentType = pt;
        }, 
        getExpense: function () {
            return expense;
        },
        setExpense: function (e) {
            if (e==null || e=={}) {
                // Set defaults
                expense = { UniqueKey:      "",
                            Date:          new Date(), 
                            Name:           "",
                            Credit:         0,
                            ChargeDate:     this.getChargeDate(), 
                            PaymentTypeID:     0,
                            Label:          "",
                            CategoryID:     0,
                            Notes:          null
                          };               
            }
            else {
                expense = { UniqueKey:      e.UniqueKey,
                            Date:          e.Date, 
                            Name:           e.Name,
                            Credit:         e.Credit,
                            ChargeDate:     this.getChargeDate(), 
                            PaymentTypeID:     e.PaymentTypeID,
                            Label:          e.Label,
                            CategoryID:     e.CategoryID,
                            Notes:          e.Notes };                
            }
        },
        clearAll: function () {
            this.setChargeDate();
            this.setPaymentType();
            this.setExpense();
        }
    };
});