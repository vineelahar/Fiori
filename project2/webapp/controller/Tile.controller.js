sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("project2.controller.Tile", {
        onPress:function (oEvent){
               var oTile = oEvent.getSource(); 
               var sHeader = oTile.getHeader();
               MessageToast.show("You clicked: "+ sHeader);
               var sRoute = oTile.data("route");
               this.getOwnerComponent().getRouter().navTo(sRoute)
            
           
        }
    });
});