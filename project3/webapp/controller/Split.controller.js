sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project3.controller.Split", {

        onInit: function () {
            this.getView().setModel(
                new JSONModel({}),
                "selectedCustomer"
            );
        },

        onOpenCustomers: function () {
            this.byId("splitApp").toDetail(
                this.byId("customerTablePage").getId()
            );
        },

        onCustomerSelect: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");

            if (!oItem) {
                return;
            }

            var oCustomer = oItem.getBindingContext().getObject();

            this.getView()
                .getModel("selectedCustomer")
                .setData(oCustomer);
        },

        onOpenCustomerDetails: function () {
            var oCustomer = this.getView()
                .getModel("selectedCustomer")
                .getData();

            if (!oCustomer.CustomerID) {
                MessageToast.show("Please select a customer from the table first.");
                return;
            }

            this.byId("splitApp").toDetail(
                this.byId("customerDetailsPage").getId()
            );
        }

    });
});
