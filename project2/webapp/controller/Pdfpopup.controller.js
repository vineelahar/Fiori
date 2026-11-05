sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/PDFViewer"
], function (Controller, PDFViewer) {

    "use strict";

    return Controller.extend("project2.controller.Pdfpopup", {

        onInit: function () {

            this._sMaseratiPdfPath = sap.ui.require.toUrl(
                "project2/model/pdf/mc20_genuine_accessories_brochure_2023_en.pdf"
            );

            this._sBmwPdfPath = sap.ui.require.toUrl(
                "project2/model/pdf/The BMW Z4 – Brochure.pdf.asset.1650541282025.pdf"
                
            );

            console.log("Maserati PDF:", this._sMaseratiPdfPath);
            console.log("BMW PDF:", this._sBmwPdfPath);
        },

        onMaseratiPress: function () {

            console.log("Maserati image clicked");

            var oPDFViewer = new PDFViewer({
                title: "Maserati MC20 PDF",
                source: this._sMaseratiPdfPath,
                isTrustedSource: true
            });

            oPDFViewer.open();
        },

        onBmwPress: function () {

            console.log("BMW image clicked");

            var oPDFViewer = new PDFViewer({
                title: "BMW Z4 PDF",
                source: this._sBmwPdfPath,
                isTrustedSource: true
            });

            oPDFViewer.open();
        },

    });

});