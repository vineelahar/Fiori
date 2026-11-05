sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project3.controller.CSM", {

        onInit: function () {
            // The named OData model is already configured in manifest.json.
        },

       onSearchSales: function () {
            var sSalesNo = this.byId("salesNoInput").getValue().trim();
            var sSalesType = this.byId("salesTypeInput").getValue().trim();

            var aFilters = [];

            if (sSalesNo) {
                aFilters.push(new Filter(
                    "Sales_no",
                    FilterOperator.EQ,
                    sSalesNo
                ));
            }

            if (sSalesType) {
                aFilters.push(new Filter(
                    "Sales_Type",
                    FilterOperator.EQ,
                    sSalesType
                ));
            }

            var oTable = this.byId("salesTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                oBinding.filter(aFilters);
                console.log("Filters applied:", aFilters);
            } else {
                console.error("Sales Order table binding not found");
            }
        },

        onClearSales: function () {
            this.byId("salesNoInput").setValue("");
            this.byId("salesTypeInput").setValue("");

            this.byId("salesTable")
                .getBinding("items")
                .filter([]);
        }

    });
});