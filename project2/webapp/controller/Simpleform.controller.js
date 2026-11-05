sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {

    "use strict";

    return Controller.extend("project2.controller.Simpleform", {

        onInit: function () {

            var oData = {
                editMode: false,

                name: "Red Point Stores",
                street: "Main St",
                number: "1618",

                zip: "31415",
                city: "Maintown",
                country: "Germany",

                web: "http://www.sap.com",
                twitter: "@sap",
                email: "john.smith@sap.com",
                telephone: "+49 6227 747474",
                sms: "+49 173 123456",

                rating: 4,
                disposable: 25
            };

            var oModel = new JSONModel(oData);

            this.getView().setModel(oModel);
        },


        onEdit: function () {

            this.getView().getModel().setProperty("/editMode", true);
        },


        onSave: function () {

            this.getView().getModel().setProperty("/editMode", false);

            MessageToast.show("Changes saved successfully");
        },


        onCancel: function () {

            this.getView().getModel().setProperty("/editMode", false);

            MessageToast.show("Changes cancelled");
        }

    });

});