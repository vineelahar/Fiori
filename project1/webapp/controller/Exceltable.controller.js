sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel"
], function (Controller ,JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.Exceltable", {

        onDownloadExcel: function () {
            var oModel = this.getView().getModel("ZAK_SO_SRV");

            if (!oModel) {
                sap.m.MessageToast.show("OData model not found");
                return;
            }

            oModel.read("/salesorderSet", {
                success: function (oData) {

                    var aData = oData.results;

                    if (!aData || aData.length === 0) {
                        sap.m.MessageToast.show("No data available");
                        return;
                    }

                    var aExcelData = aData.map(function (oItem) {
                        return {
                            Sales_no: oItem.Sales_no,
                            Sales_Type: oItem.Sales_Type,
                            Date: oItem.Date,
                            Customer: oItem.Customer,
                            Sales_org: oItem.Sales_org
                        };
                    });

                    var oWorksheet =
                        XLSX.utils.json_to_sheet(aExcelData);

                    var oWorkbook = XLSX.utils.book_new();

                    XLSX.utils.book_append_sheet(
                        oWorkbook,
                        oWorksheet,
                        "Sales Orders"
                    );

                    XLSX.writeFile(
                        oWorkbook,
                        "Sales_Orders.xlsx"
                    );
                },

                error: function (oError) {
                    sap.m.MessageBox.error(
                        "Unable to fetch sales orders from the backend."
                    );
                    console.error(oError);
                }
            });
        }
    })
});