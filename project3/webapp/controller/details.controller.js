sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project3.controller.details", {
        onShowname:function (){
             var onameinput = this.byId("nameinput");
             var oCityinput = this.byId("Cityinput");
             var sName = onameinput.getValue()
             var sCity = oCityinput.getvalue()
             var oText = this.byId("resultText");
            //  oText.setText("Vineela")
            console.log(sName+" lives in " +SCity)
            
           
        }
    });
});