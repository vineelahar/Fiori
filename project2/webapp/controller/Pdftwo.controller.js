sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {

    "use strict";

    return Controller.extend("project2.controller.Pdftwo", {

        onInit: function () {

            this._sValidPath = sap.ui.require.toUrl(
                "project2/model/pdf/sample.pdf"
            );

            this._sInValidPath = sap.ui.require.toUrl(
                "project2/model/pdf/wrong.pdf"
            );

            this._oModel = new JSONModel({
                Source: this._sValidPath,
                Title1: "My Title 1",
                Title2: "My Title 2",
                Height: "600px"
            });

            this.getView().setModel(this._oModel);
        },

        ondisplay: function () {

            this._oModel.setProperty("/Source",this._sValidPath);
            this._oModel.setProperty("/Title","Valid PDF");

        },

        onearror: function () {

            this._oModel.setProperty("/Source",this._sInValidPath);
            this._oModel.setProperty("/Title","Error");

        }

    });
});