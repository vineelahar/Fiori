sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project3.controller.Getproperty", {
        onInit: function () {
            var oModel = new JSONModel({
            name: "Vineela",
            age: 23
        })
        this.getView().setModel(oModel);

        },
        
        onGetData: function() {
            var sName= this.getView().getModel().getProperty("/name")
            var iAge=this.getView().getModel().getProperty("/age")
            console.log(sName)
            console.log(iAge)
        }
    });
});