sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel"
], function (Controller ,JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.File", {


        onDownloadBOMTemplate: function () {
            if (typeof XLSX === "undefined") {
                sap.m.MessageBox.error(
                    "Excel library is not loaded"
                );
                return;
            }

            var aHeaders = [
                "Material",
                "Plant",
                "Alternative",
                "Base qty",
                "Base unit",
                "Alt Text",
                "BOM Text",
                "Item",
                "Component",
                "Comp qty",
                "Comp unit"
            ];

            var oWorksheet = XLSX.utils.aoa_to_sheet([
                aHeaders
            ]);

            var oWorkbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                oWorkbook,
                oWorksheet,
                "BOM"
            );

            XLSX.writeFile(
                oWorkbook,
                "BOM_Template.xlsx"
            );

            sap.m.MessageToast.show(
                "BOM template downloaded"
            );
        },

        onDownloadRoutingTemplate: function () {
            if (typeof XLSX === "undefined") {
                sap.m.MessageBox.error(
                    "Excel library is not loaded"
                );
                return;
            }

            var aHeaders = [
                "Material",
                "Plant",
                "Task Description",
                "Usage",
                "Status",
                "Lot From",
                "Lot To",
                "Operation No",
                "Work Center",
                "Control Key",
                "Description",
                "Base qty",
                "Variable Labour",
                "Variable Labour Unit",
                "Variable Machinery",
                "Variable Machinery Unit",
                "Fixed Labour",
                "Fixed Labour Unit",
                "Fixed Machinery",
                "Fixed Machinery Unit"
            ];

            var oWorksheet = XLSX.utils.aoa_to_sheet([
                aHeaders
            ]);

            var oWorkbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                oWorkbook,
                oWorksheet,
                "Routing"
            );

            XLSX.writeFile(
                oWorkbook,
                "Routing_Template.xlsx"
            );

            sap.m.MessageToast.show(
                "Routing template downloaded"
            );
        },

    })
});