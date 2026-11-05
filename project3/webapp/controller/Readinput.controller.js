sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project3.controller.Readinput", {
        onShowname:function (){
             var oInput = this.byId("nameinput");
             var sName = oInput.getValue();
             var oText = this.byId("resultText");
             oText.setText("Vineela")
            console.log(sName)
            
           
        }
    });
});