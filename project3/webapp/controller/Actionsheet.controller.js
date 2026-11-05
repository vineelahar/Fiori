sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (BaseController, MessageToast) => {

    "use strict";

    return BaseController.extend("project3.controller.Actionsheet", {

        onOpenActionSheet: function (oEvent) {

            var oActionSheet = this.byId("actionSheet");

            oActionSheet.openBy(oEvent.getSource());
        },

        onAccept: function () {
            MessageToast.show("Selected action is Accept");
        },

        onReject: function () {
            MessageToast.show("Selected action is Reject");
        },

        onEmail: function () {
            MessageToast.show("Selected action is Email");
        },

        onForword: function () {
            MessageToast.show("Selected action is Forward");
        },

        onDelete: function () {
            MessageToast.show("Selected action is Delete");
        },

        onOther: function () {
            MessageToast.show("Selected action is Other");
        }

    });

});