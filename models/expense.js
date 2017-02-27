app.factory('expenseModel', function($http) {

	return {

		getModelDefault: funcdtion () {
			this.getModel(null, new Date(), "", 0 ,new Date(), null, "", null, null, null);
		},

		getModel: function(uniqueKey, date, name, credit, chargeDate, chargeType, cardID, label, categoryID, notes) {
			return [
				UniqueKey: 		uniqueKey,
                TDate: 			date, 
                Name: 			name,
                Credit: 		credit,
                ChargeDate: 	chargeDate, 
                ChargeType: 	chargeType,
                CardID: 		cardID,
                Label: 			label,
                CategoryID: 	categoryID,
                Notes: 			notes
            ] 
		}
	}
})