sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {

    "use strict";

    return Controller.extend("project2.controller.Pdfembedded", {

        onInit: function () {

            this._sValidPath = sap.ui.require.toUrl(
                "project2/model/pdf/sample.pdf"
            );

            console.log("PDF URL:", this._sValidPath);

            this._oModel = new JSONModel({
                Source: this._sValidPath,
                Title: "My PDF"
            });

            this.getView().setModel(this._oModel);
        }

    });

});