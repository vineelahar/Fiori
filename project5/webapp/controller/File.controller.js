sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "project5/Utlities/ExcelUtils"
], function (Controller, ExcelUtils) {
    "use strict";

    return Controller.extend("project5.controller.File", {

        onDownloadBOMTemplate: function () {
            ExcelUtils.downloadBOM();
        },

        onDownloadRoutingTemplate: function () {
            ExcelUtils.downloadRouting();
        }

        // onDownloadBOMTemplate: function () {
        //         this.downloadTemplate("BOM");
        //     },

        //     onDownloadRoutingTemplate: function () {
        //         this.downloadTemplate("ROUTING");
        //     },

        //     downloadTemplate: function (sType) {
        //         if (typeof XLSX === "undefined") {
        //             sap.m.MessageBox.error(
        //                 "Excel library is not loaded"
        //             );
        //             return;
        //         }

        //         var aHeaders;
        //         var sFileName;
        //         var sSheetName;

        //         if (sType === "BOM") {
        //             aHeaders = [
        //                 "Material",
        //                 "Plant",
        //                 "Alternative",
        //                 "Base qty",
        //                 "Base unit",
        //                 "Alt Text",
        //                 "BOM Text",
        //                 "Item",
        //                 "Component",
        //                 "Comp qty",
        //                 "Comp unit"
        //             ];

        //             sFileName = "BOM_Template.xlsx";
        //             sSheetName = "BOM";
        //         } else if (sType === "ROUTING") {
        //             aHeaders = [
        //                 "Material",
        //                 "Plant",
        //                 "Task Description",
        //                 "Usage",
        //                 "Status",
        //                 "Lot From",
        //                 "Lot To",
        //                 "Operation No",
        //                 "Work Center",
        //                 "Control Key",
        //                 "Description",
        //                 "Base qty",
        //                 "Variable Labour",
        //                 "Variable Labour Unit",
        //                 "Variable Machinery",
        //                 "Variable Machinery Unit",
        //                 "Fixed Labour",
        //                 "Fixed Labour Unit",
        //                 "Fixed Machinery",
        //                 "Fixed Machinery Unit"
        //             ];

        //             sFileName = "Routing_Template.xlsx";
        //             sSheetName = "Routing";
        //         } else {
        //             sap.m.MessageBox.error(
        //                 "Unknown template type"
        //             );
        //             return;
        //         }

        //         var oWorksheet = XLSX.utils.aoa_to_sheet([
        //             aHeaders
        //         ]);

        //         var oWorkbook = XLSX.utils.book_new();

        //         XLSX.utils.book_append_sheet(
        //             oWorkbook,
        //             oWorksheet,
        //             sSheetName
        //         );

        //      XLSX.writeFile(oWorkbook, sFileName);
        // }


        



    });
});











// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//      "project5/Utlities/ExcelUtils"
// ], function (Controller) {
//     "use strict";

//     return Controller.extend("project5.controller.File", {

//         onDownloadBOMTemplate: function () {
//             this.downloadTemplate("BOM");
//         },

//         onDownloadRoutingTemplate: function () {
//             this.downloadTemplate("ROUTING");
//         },

//         // downloadTemplate: function (sType) {
//         //     if (typeof XLSX === "undefined") {
//         //         sap.m.MessageBox.error(
//         //             "Excel library is not loaded"
//         //         );
//         //         return;
//         //     }

//         //     var aHeaders;
//         //     var sFileName;
//         //     var sSheetName;

//         //     if (sType === "BOM") {
//         //         aHeaders = [
//         //             "Material",
//         //             "Plant",
//         //             "Alternative",
//         //             "Base qty",
//         //             "Base unit",
//         //             "Alt Text",
//         //             "BOM Text",
//         //             "Item",
//         //             "Component",
//         //             "Comp qty",
//         //             "Comp unit"
//         //         ];

//         //         sFileName = "BOM_Template.xlsx";
//         //         sSheetName = "BOM";
//         //     } else if (sType === "ROUTING") {
//         //         aHeaders = [
//         //             "Material",
//         //             "Plant",
//         //             "Task Description",
//         //             "Usage",
//         //             "Status",
//         //             "Lot From",
//         //             "Lot To",
//         //             "Operation No",
//         //             "Work Center",
//         //             "Control Key",
//         //             "Description",
//         //             "Base qty",
//         //             "Variable Labour",
//         //             "Variable Labour Unit",
//         //             "Variable Machinery",
//         //             "Variable Machinery Unit",
//         //             "Fixed Labour",
//         //             "Fixed Labour Unit",
//         //             "Fixed Machinery",
//         //             "Fixed Machinery Unit"
//         //         ];

//         //         sFileName = "Routing_Template.xlsx";
//         //         sSheetName = "Routing";
//         //     } else {
//         //         sap.m.MessageBox.error(
//         //             "Unknown template type"
//         //         );
//         //         return;
//         //     }

//         //     var oWorksheet = XLSX.utils.aoa_to_sheet([
//         //         aHeaders
//         //     ]);

//         //     var oWorkbook = XLSX.utils.book_new();

//         //     XLSX.utils.book_append_sheet(
//         //         oWorkbook,
//         //         oWorksheet,
//         //         sSheetName
//         //     );

//         //     XLSX.writeFile(oWorkbook, sFileName);
//         // }

//     });
// });
