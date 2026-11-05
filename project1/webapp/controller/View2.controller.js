sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.View2", {

        // onRowSelect: function (oEvent) {

        //     // Get the selected row
        //     var oItem = oEvent.getParameter("listItem");

        //     // Get the binding context of that row
        //     var oContext = oItem.getBindingContext("ZAK_SO_SRV");

        //     // Get the path of the selected row
        //     var sPath = oContext.getPath();

        //     // Navigate to View3
        //     this.getOwnerComponent()
        //         .getRouter()
        //         .navTo("SalesDetail", {
        //             path: encodeURIComponent(sPath)
        //         });
        // }
        onRowSelect: function (oEvent) {

            var oItem = oEvent.getParameter("listItem");

            var oContext = oItem.getBindingContext("ZAK_SO_SRV");

            var sPath = oContext.getPath();

            this.getOwnerComponent().getRouter().navTo("SalesDetail", {
                path: encodeURIComponent(sPath)
            });
        },
        onCheckRecords: function () {

        var oTable = this.byId("salesTable");

        var oBinding = oTable.getBinding("items");

        var iCount = oBinding.getLength();

        console.log("Number of records:", iCount);
    }

    });
});