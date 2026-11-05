sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
	'sap/ui/model/json/JSONModel'
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("project3.controller.Breadcrumbs", {
        onPress: function(oEvent) {
            MessageToast.show(
                oEvent.getSource().getText() + 'has been activated'
            )
        },
        onSeparatorChange: function (oEvent) {

            var sSeparator = oEvent.getParameter("selectedItem").getText();

            MessageToast.show("Separator changed to " + sSeparator);

        },
    });
});