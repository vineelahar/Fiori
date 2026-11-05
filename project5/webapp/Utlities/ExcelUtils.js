sap.ui.define([
    "sap/m/MessageBox"
], function (MessageBox) {
    "use strict";


    function createExcel(aHeaders, aRows, sSheetName, sFileName) {

        // if (typeof XLSX === "undefined") {
        //     MessageBox.error("Excel library is not loaded");
        //     return;
        // }

        var oWorksheet = XLSX.utils.json_to_sheet(aRows, {
            header: aHeaders
        });

        var oWorkbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            oWorkbook,
            oWorksheet,
            sSheetName
        );

        XLSX.writeFile(oWorkbook, sFileName);
    }

    return {
        createExcel: createExcel,
        downloadBOM: function () {
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
            // "BOM", "BOM_Template.xlsx");

            // var aRows = [
            //     ["MAT001", "1000", "01", 10, "KG", "Alt 1", "BOM 1", "0010", "COMP001", 5, "KG"],
            //     ["MAT002", "1000", "01", 20, "KG", "Alt 2", "BOM 2", "0020", "COMP002", 8, "KG"],
            //     ["MAT003", "2000", "02", 15, "KG", "Alt 3", "BOM 3", "0030", "COMP003", 3, "KG"]
            // ];

            createExcel(aHeaders, [], "BOM", "BOM_Template.xlsx");
                
        },

        downloadRouting: function () {
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
            // //  "Routing", "Routing_Template.xlsx");
            // var aRows = [
            //     ["MAT001", "1000", "Assembly", "1", "1", 0, 100, "0010", "WC001", "PP01", "Cutting", 1, 2, "HR", 3, "HR", 1, "HR", 2, "HR"],
            //     ["MAT002", "1000", "Production", "1", "1", 0, 200, "0020", "WC002", "PP01", "Welding", 1, 3, "HR", 2, "HR", 2, "HR", 1, "HR"],
            //     ["MAT003", "2000", "Finishing", "1", "1", 0, 300, "0030", "WC003", "PP01", "Painting", 1, 1, "HR", 2, "HR", 1, "HR", 3, "HR"]
            // ];

            createExcel(aHeaders, [], "Routing", "Routing_Template.xlsx");
        },

    };
});