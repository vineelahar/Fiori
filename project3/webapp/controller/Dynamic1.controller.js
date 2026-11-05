sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {

    "use strict";

    return Controller.extend("project3.controller.Dynamic1", {

        onInit: function () {

            console.log("Dynamic1 controller loaded");

            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteCustomerDetails")
                .attachPatternMatched(
                    this.onObjectMatched,
                    this
                );
        },

        onObjectMatched: function (oEvent) {

            var sCustomerId =
                oEvent.getParameter("arguments").customerId;

            console.log("Selected Customer ID:", sCustomerId);

            var sPath =
                "/Customers('" + sCustomerId + "')";

            console.log("Binding path:", sPath);

            this.getView().bindElement({
                path: sPath
            });
        }

    });

});