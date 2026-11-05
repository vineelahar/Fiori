sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {

    "use strict";

    return Controller.extend("project2.controller.Exceltable", {

        onInit: function () {

            var oModel = new JSONModel({
                data: []
            });

            this.getView().setModel(
                oModel,
                "excelModel"
            );

            console.log(
                "XLSX library:",
                window.XLSX
            );

            this._readExcel();
        },


        _readExcel: function () {

            var sExcelPath = sap.ui.require.toUrl(
                "project2/model/pdf/Schools & Colleges 21-july-2026.xlsx"
            );

            console.log(
                "Excel Path:",
                sExcelPath
            );

            fetch(sExcelPath)

                .then(function (response) {

                    console.log(
                        "Response Status:",
                        response.status
                    );

                    if (!response.ok) {
                        throw new Error(
                            "Excel file not found: " +
                            response.status
                        );
                    }

                    return response.arrayBuffer();
                })

                .then(function (aBuffer) {

                    console.log(
                        "Excel file loaded successfully"
                    );

                    if (!window.XLSX) {
                        throw new Error(
                            "XLSX library is not loaded"
                        );
                    }

                    var oWorkbook =
                        window.XLSX.read(
                            aBuffer,
                            {
                                type: "array"
                            }
                        );

                    console.log(
                        "Sheet Names:",
                        oWorkbook.SheetNames
                    );

                    var sSheetName =
                        oWorkbook.SheetNames[0];

                    var oSheet =
                        oWorkbook.Sheets[sSheetName];

                    var aData =
                        window.XLSX.utils.sheet_to_json(
                            oSheet,
                            {
                                defval: ""
                            }
                        );

                    console.log(
                        "Excel Data:",
                        aData
                    );

                    console.log(
                        "Number of Rows:",
                        aData.length
                    );

                    this.getView()
                        .getModel("excelModel")
                        .setProperty(
                            "/data",
                            aData
                        );

                    MessageToast.show(
                        aData.length +
                        " rows loaded successfully"
                    );

                }.bind(this))

                .catch(function (error) {

                    console.error(
                        "Excel reading error:",
                        error
                    );

                    MessageToast.show(
                        "Error reading Excel file"
                    );
                });
        }

    });

});