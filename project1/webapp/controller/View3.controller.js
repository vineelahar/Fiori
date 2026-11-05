sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.View3", {

        onInit: function () {

            this.getOwnerComponent()
                .getRouter()
                .getRoute("SalesDetail")
                .attachPatternMatched(this.onObjectMatched, this);

        },

        onObjectMatched: function (oEvent) {

            var sPath = decodeURIComponent(
                oEvent.getParameter("arguments").path
            );

            this.getView().bindElement({
                path: sPath,
                model: "ZAK_SO_SRV"
            });

        }

    });
});