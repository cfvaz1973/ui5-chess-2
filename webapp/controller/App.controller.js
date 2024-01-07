sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("ui5.futureview.ui5chess2.controller.App", {
        onInit: function() {
          console.log('App.controller.js init');
        }
      });
    }
  );
  