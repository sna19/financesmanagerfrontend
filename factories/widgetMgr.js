app.factory('widgetMgr', function($rootScope) {

	var visibledWidgets = [];   

	function log (msg) {
		console.log (msg);
	}

    function addWidget(widgetID) {
        log ('addWidget: '+widgetID);
        if (visibledWidgets[widgetID] == null) {
            visibledWidgets.push(widgetID);
            visibledWidgets[widgetID] = visibledWidgets.length-1;
            
        }
         log(visibledWidgets);
    }

    function insertWidget(widgetID, before) {
        log ('insertWidget: '+widgetID);

        for (i=0;i<visibledWidgets.length;i++)
        	if (visibledWidgets[i] == before) {
        		visibledWidgets.splice(i, 0, widgetID);
        		visibledWidgets[widgetID] = i;

        		// set new indexes for all following widgets
        		for(j=i+1;j<visibledWidgets.length;j++) {
        			widgetID=visibledWidgets[j];
        			visibledWidgets[widgetID]=j;
        		}
        		break;
        	}

        // Widget was not found - add in the end
        if (visibledWidgets[widgetID] == null) {
            visibledWidgets.push(widgetID);
            visibledWidgets[widgetID] = visibledWidgets.length-1;
            
        }
         log(visibledWidgets);
    }    

    function removeWidget(widgetID) {
        if (visibledWidgets[widgetID] != null) {
            var index = visibledWidgets[widgetID];
            visibledWidgets.splice(index, 1);
            visibledWidgets[widgetID] = null;

            // update position-- for all following widgets
	            for(i=index;i<visibledWidgets.length;i++)
            	if (visibledWidgets[i] != null) 
            		visibledWidgets[i]--;
        }
    }


    return {

    	// args - String - widgetID
    	//      - Object - {id: widgetID, addBefore: widgetID}
	    showWidget: function (args) {
	        
	        var addBefore = null;
	        
	        for (i=0;i<args.length;i++) {
	        	widgetObj = args[i];


	        	if(typeof widgetObj == 'object') {
	        		widgetID = widgetObj.id;
	        		addBefore = widgetObj.addBefore;
	        	}
	        	else {
	            	widgetID = args[i];
	            }

	            $rootScope.$broadcast('onWidgetBeforeShow', widgetID);

	            var obj = angular.element( document.querySelector( '#'+widgetID ) );
	            
	            obj.css("visibility", "visible");
	            obj.css("display", "inline-block");

	            if (addBefore != null && addBefore != "") {
	            	insertWidget (widgetID, addBefore);
	            }
	            else {
	            	addWidget(widgetID);
	            }
	            
	            $rootScope.$broadcast('onShowWidget', widgetID);  
	        }
	    },

	    hideWidget: function (args) {
	    	
	    	if (typeof args == 'string') args = [args];

	        for (k=0;k<args.length;k++) {
	            widgetID = args[k];

	            $rootScope.$broadcast('onWidgetBeforeHide', widgetID);

	            var obj = angular.element( document.querySelector( '#'+widgetID ) );
	            
	            obj.css("visibility", "hidden");
	            obj.css("display", "none");

	            removeWidget(widgetID);
	            
	            $rootScope.$broadcast('onHideWidget', widgetID);
	        }	        
	    },

	    hideFollowingWidgets: function (widgetID) {
	    	
	    	var startingIndex;
	    	for (i=0, startingIndex = visibledWidgets.length;
	    			i<visibledWidgets.length;i++)
	    		if (visibledWidgets[i] == widgetID) {
	    			startingIndex = i+1;
	    			break;
	    		}

	    	for (j=visibledWidgets.length-1;j>=startingIndex;j--) {
				widgetID = visibledWidgets[j];

				$rootScope.$broadcast('onWidgetBeforeHide', widgetID);

				var obj = angular.element( document.querySelector( '#'+widgetID ) );
	            obj.css("visibility", "hidden");
	            obj.css("display", "none");		

	            removeWidget(widgetID);		

	            $rootScope.$broadcast('onHideWidget', widgetID);
	    	}
	    },	    
	
	    hideAllWidgets: function () {
	        log('hideAllWidgets: start');
	        log(visibledWidgets);
	        var max = 100;
	        
	        while (visibledWidgets.length>0 && --max>0) {
	            var len = visibledWidgets.length-1;
	            console.log ('  hide ' + visibledWidgets[len]);
	            this.hideWidget(visibledWidgets[len]);
	        }  
	    },

	    isWidgetShown: function (widgetID) {
	        return visibledWidgets[widgetID] != null;
	    }

    };
});