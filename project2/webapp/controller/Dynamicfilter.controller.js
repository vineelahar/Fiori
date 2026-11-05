sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
     "sap/ui/model/FilterOperator"

], function (Controller, JSONModel, Filter, FilterOperator) {

    "use strict";

    return Controller.extend("project2.controller.Dynamicfilter", {
        onInit:function(){
            var ProductModel = new sap.ui.model.json.JSONModel(
            sap.ui.require.toUrl("project2/model/Product.json")
            );
            this.getView().setModel(ProductModel)
        },
        
        onSearch: function () {

        var aSelectedKeys = this.byId("nameCombo").getSelectedKeys();

        console.log("Selected Name:", aSelectedKeys);

        var oBinding = this.byId("ProductTable").getBinding("items");

        if (aSelectedKeys.length === 0) {
            oBinding.filter([]);
            return;
        }

        var oFilter = new Filter(
            "Name",
            FilterOperator.EQ,
            aSelectedKeys[0]
        );

        oBinding.filter([oFilter]);
    }

       
    });
});